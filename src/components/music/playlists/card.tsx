// COMPONENTS
import { SkeletonCoverImage } from "./skeleton";
import { motion } from "framer-motion";
// HOOKS
import useGetMusicCover from "@/hooks/useGetMusicCover";
// STORES
import usePlayerStore,{ type PlayerState } from "@/store/player";
// TYPES
import type { PlaylistItem } from "@/hooks/useGetPlayList";


const Card = ({ data = {}, handleClick = (data: object)=>()=> {} }) => {
  const { currentTrack: { id: currentPlayingId = null } = {} } =
    usePlayerStore() as PlayerState;
  const { id, name = "", artist = "", cover = "" } = data  as PlaylistItem?? {};
  const { data: coverImage = "", isLoading = true } =
    useGetMusicCover(cover) ?? {};
  const isPlaying = id === currentPlayingId;
  return (
    <li
      onClick={handleClick(data)}
      className={`flex items-center space-x-4 py-2 px-4 ${
        isPlaying && "bg-white/10"
      } rounded-md cursor-pointer`}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full relative overflow-hidden">
        {isLoading ? (
          <SkeletonCoverImage />
        ) : (
          <motion.img
            src={coverImage}
            alt={`${name}'s album cover`}
            className="w-full h-full object-cover rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <h5 className="text-white text-sm font-medium truncate">{name}</h5>
        <p className="text-gray-400 text-xs truncate">{artist}</p>
      </div>
    </li>
  );
};

export default Card;
