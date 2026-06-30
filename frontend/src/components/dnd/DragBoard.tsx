import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Gesture, type PanGesture } from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  type AnimatedRef,
  type SharedValue,
} from "react-native-reanimated";
import SongCard from "@/components/SongCard";
import type { SongData, SongStatus } from "@/types/song";

const CARD_WIDTH = Dimensions.get("window").width * 0.9 - 32;
const LONG_PRESS_MS = 200;
const EDGE = 90; // distance from top/bottom (px) where auto-scroll kicks in
const MAX_STEP = 18; // max px scrolled per frame, at the very edge of the screen

type ColumnRef = AnimatedRef<Animated.View>;

type DragContextValue = {
  overColumn: SharedValue<SongStatus | null>;
  activeId: string | null;
  columnRefs: Record<SongStatus, ColumnRef>;
  makeDragGesture: (song: SongData, from: SongStatus) => PanGesture;
};

const DragContext = createContext<DragContextValue | null>(null);

export function useDragBoard(): DragContextValue {
  const ctx = useContext(DragContext);
  if (!ctx) throw new Error("useDragBoard must be used within <DragBoard>");
  return ctx;
}

type DragBoardProps = {
  children: ReactNode;
  onDropSong: (songId: string, from: SongStatus, to: SongStatus) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const DragBoard = ({
  children,
  onDropSong,
  contentContainerStyle,
}: DragBoardProps) => {
  const rootRef = useRef<View>(null);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  // One animated ref per column; we measure these live on the UI thread to
  // figure out which column the finger is over (no coordinate bookkeeping).
  const todoRef = useAnimatedRef<Animated.View>();
  const doingRef = useAnimatedRef<Animated.View>();
  const doneRef = useAnimatedRef<Animated.View>();

  // Scroll/viewport geometry, used only for the auto-scroll edge zones.
  const scrollY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const viewportHeight = useSharedValue(0);
  const rootTop = useSharedValue(0); // screen Y of the board's top edge
  const rootLeft = useSharedValue(0); // screen X of the board's left edge

  const overColumn = useSharedValue<SongStatus | null>(null);

  // Current drag, driven on the UI thread.
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const dragActive = useSharedValue(0);
  const [activeSong, setActiveSong] = useState<SongData | null>(null);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
    contentHeight.value = e.contentSize.height;
    viewportHeight.value = e.layoutMeasurement.height;
  });

  const onContentSizeChange = useCallback(
    (_w: number, h: number) => {
      // Known even before the first scroll, so the bottom edge zone works immediately.
      contentHeight.value = h;
    },
    [contentHeight],
  );

  const onRootLayout = useCallback(() => {
    rootRef.current?.measureInWindow((x, y, _w, h) => {
      rootLeft.value = x;
      rootTop.value = y;
      viewportHeight.value = h;
    });
  }, [rootLeft, rootTop, viewportHeight]);

  // Runs every frame while a drag is in progress: auto-scrolls when the finger
  // sits in a top/bottom edge zone, then resolves the column under the finger by
  // measuring each column's live on-screen rect. Ticking every frame (not only
  // on finger movement) means holding still at the bottom keeps scrolling.
  useFrameCallback(() => {
    if (!dragActive.value) return;

    const y = dragY.value;
    const maxScroll = Math.max(0, contentHeight.value - viewportHeight.value);
    const topEdge = rootTop.value + EDGE;
    const bottomEdge = rootTop.value + viewportHeight.value - EDGE;

    let next = scrollY.value;
    if (y < topEdge && scrollY.value > 0) {
      const intensity = Math.min(1, (topEdge - y) / EDGE);
      next = Math.max(0, scrollY.value - intensity * MAX_STEP);
    } else if (y > bottomEdge && scrollY.value < maxScroll) {
      const intensity = Math.min(1, (y - bottomEdge) / EDGE);
      next = Math.min(maxScroll, scrollY.value + intensity * MAX_STEP);
    }
    if (next !== scrollY.value) {
      scrollTo(scrollRef, 0, next, false);
    }

    // Hit-test against each column's live screen rect (accounts for scroll).
    const t = measure(todoRef);
    const d = measure(doingRef);
    const n = measure(doneRef);
    let hover: SongStatus | null = null;
    if (t && y >= t.pageY && y <= t.pageY + t.height) hover = "TODO";
    else if (d && y >= d.pageY && y <= d.pageY + d.height) hover = "DOING";
    else if (n && y >= n.pageY && y <= n.pageY + n.height) hover = "DONE";
    overColumn.value = hover;
  });

  const finishDrag = useCallback(
    (song: SongData, from: SongStatus, to: SongStatus | null) => {
      if (to && to !== from) onDropSong(song.id, from, to);
      setActiveSong(null);
    },
    [onDropSong],
  );

  const makeDragGesture = useCallback(
    (song: SongData, from: SongStatus): PanGesture =>
      Gesture.Pan()
        .activateAfterLongPress(LONG_PRESS_MS)
        .onStart((e) => {
          dragActive.value = 1;
          dragX.value = e.absoluteX;
          dragY.value = e.absoluteY;
          overColumn.value = from;
          runOnJS(setActiveSong)(song);
        })
        .onUpdate((e) => {
          // The frame callback handles scrolling + hover; just track the finger.
          dragX.value = e.absoluteX;
          dragY.value = e.absoluteY;
        })
        .onEnd(() => {
          // overColumn is kept current by the frame callback.
          runOnJS(finishDrag)(song, from, overColumn.value);
        })
        .onFinalize(() => {
          dragActive.value = 0;
          overColumn.value = null;
        }),
    [dragActive, dragX, dragY, overColumn, finishDrag],
  );

  const ctx = useMemo<DragContextValue>(
    () => ({
      overColumn,
      activeId: activeSong?.id ?? null,
      columnRefs: { TODO: todoRef, DOING: doingRef, DONE: doneRef },
      makeDragGesture,
    }),
    [overColumn, activeSong, todoRef, doingRef, doneRef, makeDragGesture],
  );

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: dragActive.value,
    transform: [
      { translateX: dragX.value - rootLeft.value - CARD_WIDTH / 2 },
      { translateY: dragY.value - rootTop.value - 24 },
    ],
  }));

  return (
    <DragContext.Provider value={ctx}>
      <View ref={rootRef} style={styles.root} onLayout={onRootLayout}>
        <Animated.ScrollView
          ref={scrollRef}
          onScroll={onScroll}
          onContentSizeChange={onContentSizeChange}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
        >
          {children}
        </Animated.ScrollView>

        <Animated.View
          pointerEvents="none"
          style={[styles.overlay, overlayStyle]}
        >
          {activeSong && <SongCard song={activeSong} />}
        </Animated.View>
      </View>
    </DragContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: CARD_WIDTH,
    zIndex: 1000,
    elevation: 1000,
  },
});

export default DragBoard;
