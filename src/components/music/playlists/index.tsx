import { useState, FC } from "react";
// COMPONENTS
import Tabs from "@/components/tabs";
import List from "@/components/music/playlists/list";
import Search from "@/components/search";
// CONSTANTS
import { TABS, FOR_YOU_TAB, TOP_TRACKS_TAB } from "@/utils/constants";
// HOOKS
import useGetPlayList from "@/hooks/useGetPlayList";

const PlayLists: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(FOR_YOU_TAB);
  const [searchFor, setSearchFor] = useState<string>("");
  const { data = [] } =
    useGetPlayList({ isTopTracks: activeTab === TOP_TRACKS_TAB, searchFor }) ??
    {};
  const handleSearch = (value: string) => setSearchFor(value);
  return (
    <>
      <nav className="flex justify-start">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
      </nav>
      <div className="py-2">
        <Search placeholder="Search Song, Artist" onSearch={handleSearch} />
      </div>
      <div className="py-4">
        <List tracks={data} />
      </div>
    </>
  );
};

export default PlayLists;
