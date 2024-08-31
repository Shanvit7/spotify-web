import { FC, useCallback, useEffect, useState } from "react";
// COMPONENTS
import Tabs from "@/components/tabs";
import Card from "@/components/music/card";
import Search from "@/components/search";
// CONSTANTS
import { FOR_YOU_TAB, TABS } from "@/utils/constants";
// HOOKS
import useGetPlayList from "@/hooks/useGetPlayList";
import usePlayerStore from "@/store/player";

const PlayLists: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(FOR_YOU_TAB);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const { setCurrentTrack = () => {}, setTracks } = usePlayerStore() ?? {};
  const { data: tracks = [] } =
    useGetPlayList({ activeTab, searchTerm: debouncedSearch }) ?? {};
  const handleCardClick = useCallback(
    (track: object) => () => {
      setCurrentTrack(track);
      setTracks(tracks);
    },
    [tracks, setTracks, setCurrentTrack]
  );

  // Debounce the search term using setTimeout
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearch = (value: string) => setSearch(value);

  return (
    <>
      <nav className="flex justify-start">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
      </nav>
      <div className="py-2">
        <Search placeholder="Search Song, Artist" onSearch={handleSearch} />
      </div>
      <div className="py-1 overflow-y-auto md:py-4 h-4/5 md:h-3/4">
        <ul className="max-w-md">
          {tracks?.map((data) => (
            <Card key={data?.id} data={data} handleClick={handleCardClick} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default PlayLists;
