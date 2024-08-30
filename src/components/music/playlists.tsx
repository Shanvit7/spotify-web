import { FC } from "react";
// COMPONENTS
import Tabs from "@/components/tabs";
import Card from "@/components/music/card";
import Search from "@/components/search";
// CONSTANTS
import { TABS } from "@/utils/constants";
// HOOKS
import useGetPlayList from "@/hooks/useGetPlayList";
import usePlayerStore from "@/store/player";
// STORE
import usePlayListsStore from "@/store/playlists";

const PlayLists: FC = () => {
  const { activeTab, setActiveTab, setSearchFor } = usePlayListsStore() ?? {};
  const { setCurrentTrack = () => {}, setTracks } = usePlayerStore() ?? {};
  const { data: tracks = [] } = useGetPlayList() ?? {};
  const handleSearch = (value: string) => setSearchFor(value);
  const handleCardClick = (track) => ()=> {
    setCurrentTrack(track);
    setTracks(tracks);
  };
  return (
    <>
      <nav className="flex justify-start">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
      </nav>
      <div className="py-2">
        <Search placeholder="Search Song, Artist" onSearch={handleSearch} />
      </div>
      <div className="py-4">
        <ul>
          {tracks?.map((data) => (
            <Card key={data?.id} data={data} handleClick={handleCardClick} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default PlayLists;
