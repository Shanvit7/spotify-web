import { create } from "zustand";
import { FOR_YOU_TAB } from "@/utils/constants";

const usePlayListsStore = create((set) => ({
  activeTab: FOR_YOU_TAB,
  searchFor: '',
  setActiveTab: (tab: object) => set({ activeTab: tab }),
  setSearchFor: (searchFor: string) => set({ searchFor }),
}));

export default usePlayListsStore;
