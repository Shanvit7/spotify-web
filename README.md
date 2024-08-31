# Spotify Web - Clone Music Player App

A responsive music player application built with React, Vite, and TypeScript. The application features a sleek and interactive interface, utilizing Zustand for state management, Framer Motion for animations, Tailwind CSS for styling, and TanStack Query for efficient data fetching.

### Features

- **Search**: Search for songs within the playlist.
- **Music Control**: Play, pause, skip to next or previous song.
- **Tab Change**: Switch between different tabs (e.g., For You, Top Tracks).
- **Music Seeker**: Control music playback position using a seeker.
- **Responsive Design**: Adapts to different screen sizes, with the player as the main interface on smaller screens.


### Tech Stack

- **React**: Front-end library for building the user interface.
- **Vite**: Development server and build tool.
- **TypeScript**:  Static type checking for JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: Library for animations and transitions.
- **Zustand**: State management for the music player.
- **Tanstack Query**: Data fetching and synchronization.
- **react-h5-audio-player**: Component for audio playback.


### Project Structure

- **`/src`**
  - **`/assets`**:  Contains logo and other static assets
  - **`/components`**: Reusable and UI-specific components
  - **`/hooks`**: Custom React hooks
   - **`useGetPlaylist.ts`**: Hook for fetching playlist data
   - **`useGetMusicCover.ts`**: Hook for fetching cover images
  - **`/services`**: API services & its configurations
   - **`/config.ts`**: onfiguration settings
   - **`/index.ts`**: API functions for data fetching
  - **`/utils`**: Utility functions & constants
  - **`/App.tsx`**: Main layout component

## License
This project is licensed under the terms of the [MIT License](./LICENSE). See the LICENSE file for details.

## Contact
For any questions or feedback, please reach out to shanvit7@gmail.com.






