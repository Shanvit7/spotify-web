import { create } from "zustand";

const usePlayerStore = create((set) => ({        
    tracks: [],
    setTracks: (tracks = []) => set({  tracks }),
    currentTrack: { },
    setCurrentTrack: (currentTrack = {})=> set({ currentTrack }),
    bgColor: '#000000',
    setBgColor:(bgColor: string)=> set({ bgColor})
}));

export default usePlayerStore;
