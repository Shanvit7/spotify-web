// HOOKS
import useGetMusicCover from "@/hooks/useGetMusicCover";
// STORES
import usePlayerStore from "@/store/player";

const Card = ({ data, handleClick }) => {
  const { currentTrack: { id: currentPlayingId = null } = {}} = usePlayerStore() ?? {};
  const {  id,  name = '', artist = '', cover = '' } = data ?? {};
  const { data: coverImage = '' } = useGetMusicCover(cover) ?? {};
  const isPlaying = id === currentPlayingId;
  return (
    <li
      onClick={handleClick(data)}
      className={`flex items-center space-x-4 py-2 px-4 ${isPlaying && 'bg-white/10'} rounded-md cursor-pointer`}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
        <img
          src={coverImage}
          alt={`${name}'s album cover`}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="flex-grow min-w-0">
        <h5 className="text-white text-sm font-medium truncate">{name}</h5>
        <p className="text-gray-400 text-xs truncate">{artist}</p>
      </div>
    </li>
  );
};

export default Card;
