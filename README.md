# BassObjective 🎸

**BassObjective** is a mobile application designed to track bass guitar practice. It allows you to organize your practice sessions, visualize your progress, and manage your song repertoire.

## 🎯 Key Features

*   **Kanban Board:** Organize songs using three status columns: *Todo*, *Doing*, and *Done*.
*   **Intuitive Search:** A global search engine to filter songs by title or artist, regardless of their status.
*   **Repertoire Management:** Add new songs by inputting essential information.
*   **Drag & Drop:** Smooth drag-and-drop interface to update song progress between statuses.

## 📝 Data Model

Each song is defined by the following attributes:

*   **Title**
*   **Artist/Band**
*   **Status** (`todo` by default, `doing`, `done`)
*   **Completion Date** (`completed_date`): To track when a song was mastered.

## 🛠 Tech Stack

*   **Mobile:** React Native (Expo)
*   **Backend:** NestJS
*   **Database:** SQLite
*   **Infrastructure:** Docker / Docker Compose (Self-hosted on NAS)

---

## 💡 Design Notes & Considerations

### Mono-repo Strategy
The project follows a **Mono-repo** structure. This approach is chosen to facilitate sharing TypeScript types between the front-end and back-end. The Docker configuration is optimized to manage both services (`/backend` and `/mobile`) independently while remaining deployable via a single `docker-compose.yml` file.
