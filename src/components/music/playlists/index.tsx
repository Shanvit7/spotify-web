import { FC, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// COMPONENTS
import Tabs from "@/components/tabs";
import Card from "@/components/music/playlists/card";
import { Error } from "@/components/error";
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
  const {
    data: tracks = [],
    isLoading = true,
    isError = false,
    isRefetchError = false,
    refetch,
    isRefetching,
  } = useGetPlayList({ activeTab, searchTerm: debouncedSearch }) ?? {};
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
  const isEmpty = tracks.length === 0;

  return (
    <>
      <nav className="flex items-center justify-start px-4">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
      </nav>
      <div className="py-2 px-4">
        <Search placeholder="Search Song, Artist" onSearch={handleSearch} />
      </div>
      <div className="py-1 overflow-auto h-4/5 md:py-2 md:h-fit">
        <ul className="max-w-md">
          <AnimatePresence>
            {isLoading ? (
              <SkeletonList key="skeleton" />
            ) : isError || isRefetchError ? (
              <Error refetch={refetch} isRefetching={isRefetching} />
            ) : isEmpty? (
              <p className="text-white text-center">
                {search?.length >=1  ? `No tracks found with "${search}"` : 'No songs found.'}
              </p>
            ) : (
              <motion.div
                key="tracks"
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {tracks?.map((data: { id: number}, index: number) => (
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
