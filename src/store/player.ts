// UTILS
import { create } from "zustand";
// TYPES
export interface PlayerState {
    tracks: object[];
    setTracks: (tracks: object[]) => void;
    currentTrack: object;
    setCurrentTrack: (currentTrack: object) => void;
}

// Store manages the current track playlist (zustand optimizes the render)
const usePlayerStore = create<PlayerState>((set) => ({
    tracks: [],
    setTracks: (tracks = []) => set({ tracks }),
    currentTrack: {},
    setCurrentTrack: (currentTrack = {}) => set({ currentTrack }),
}));

export default usePlayerStore;
