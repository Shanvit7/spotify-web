import { useQuery } from "@tanstack/react-query";
import { getPlayList } from "@/services";
import { FOR_YOU_TAB,TOP_TRACKS_TAB } from "@/utils/constants";


const useGetPlayList = ({ activeTab = FOR_YOU_TAB , searchTerm = ''}) => {
  const isTopTracks = activeTab === TOP_TRACKS_TAB;

  const query = useQuery({
    queryKey: ["playlist",searchTerm],
    queryFn: getPlayList,
  });

  // Filtering based on top_tracks and searchTerm
  const filteredData = query.data?.filter(
    ({ top_track = false, name = "", artist = "" }) => {
      const matchesTopTrack = isTopTracks ? !!top_track : true;
      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTopTrack && matchesSearch;
    }
  );

  return { ...query, data: filteredData };
};

export default  useGetPlayList;
