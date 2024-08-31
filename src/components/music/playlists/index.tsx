import { FC, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// COMPONENTS
import Tabs from "@/components/tabs";
import Card from "@/components/music/playlists/card";
import { SkeletonList } from "@/components/music/playlists/skeleton";
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
  const { data: tracks = [], isLoading = true } =
    useGetPlayList({ activeTab, searchTerm: debouncedSearch }) ?? {};
  const { setCurrentTrack = () => {}, setTracks } = usePlayerStore() ?? {};
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
          <AnimatePresence>
            {isLoading ? (
              <SkeletonList key="skeleton" />
            ) : (
              <motion.div
                key="tracks"
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {tracks?.map((data, index) => (
                  <Card
                    key={data?.id ?? index}
                    data={data}
                    handleClick={handleCardClick}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </>
  );
};

export default PlayLists;




