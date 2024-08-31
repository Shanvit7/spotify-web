// UTILS
import { useQuery, UseQueryResult } from "@tanstack/react-query";
// API SERVICE
import { getPlayList } from "@/services";
// CONSTANTS
import { FOR_YOU_TAB, TOP_TRACKS_TAB } from "@/utils/constants";
// TYPES
export interface PlaylistItem {
  id: number;
  status: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  name: string;
  artist: string;
  accent: string;
  cover: string;
  top_track: boolean;
  url: string;
}

interface UseGetPlayListParams {
  activeTab?: string;
  searchTerm?: string;
}


type UseGetPlayListResult = Omit<UseQueryResult<PlaylistItem[]>, "data"> & {
  data?: PlaylistItem[];
};

const useGetPlayList = ({
  activeTab = FOR_YOU_TAB,
  searchTerm = "",
}: UseGetPlayListParams): UseGetPlayListResult => {
  const isTopTracks = activeTab === TOP_TRACKS_TAB;

  const query = useQuery<PlaylistItem[]>({
    queryKey: ["playlist", searchTerm],
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

export default useGetPlayList;
