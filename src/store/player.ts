import { create } from "zustand";

const usePlayerStore = create((set) => ({        
    tracks: [],
    setTracks: (tracks = []) => set({  tracks }),
    currentTrack: {},
    setCurrentTrack: (currentTrack = {})=> set({ currentTrack }),
}));

export default usePlayerStore;
