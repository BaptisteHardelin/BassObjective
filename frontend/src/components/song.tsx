import { useMemo } from "react";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import SongCard from "@/components/SongCard";
import { useDragBoard } from "@/components/dnd/DragBoard";
import type { SongData, SongStatus } from "@/types/song";

type SongProps = {
  song: SongData;
  column: SongStatus;
};

const Song = ({ song, column }: SongProps) => {
  const { makeDragGesture, activeId } = useDragBoard();

  const gesture = useMemo(
    () => makeDragGesture(song, column),
    [makeDragGesture, song, column],
  );

  // Dim the original card while its drag overlay is following the finger.
  const isDragging = activeId === song.id;
  const style = useAnimatedStyle(() => ({
    opacity: withTiming(isDragging ? 0.3 : 1, { duration: 120 }),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style}>
        <SongCard song={song} />
      </Animated.View>
    </GestureDetector>
  );
};

export default Song;
