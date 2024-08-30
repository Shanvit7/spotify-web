import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getPlayList } from "@/services";
import usePlayListsStore from "@/store/playlists";
import { FOR_YOU_TAB,TOP_TRACKS_TAB } from "@/utils/constants";


const useGetPlayList = () => {
  const {searchFor = "", activeTab = FOR_YOU_TAB } = usePlayListsStore() ?? {};
  const isTopTracks = activeTab === TOP_TRACKS_TAB;
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchFor);

  // Debounce the search term using setTimeout
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchFor);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchFor]);

  const query = useQuery({
    queryKey: ["playlist", debouncedSearchTerm],
    queryFn: getPlayList,
  });

  // Filtering based on top_tracks and searchTerm
  const filteredData = query.data?.filter(
    ({ top_track = false, name = "", artist = "" }) => {
      const matchesTopTrack = isTopTracks ? !!top_track : true;
      const matchesSearch =
        name.toLowerCase().includes(searchFor.toLowerCase()) ||
        artist.toLowerCase().includes(searchFor.toLowerCase());
      return matchesTopTrack && matchesSearch;
    }
  );

  return { ...query, data: filteredData };
};

export default useGetPlayList;
