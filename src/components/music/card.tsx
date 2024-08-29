// HOOKS
import useGetMusicCover from "@/hooks/useGetMusicCover";

const Card = ({ data }) => {
  const { name = "", artist = "", cover = "cover" } = data ?? {};
  const { data: coverImage = "" } = useGetMusicCover(cover) ?? {};
  return (
    <li className="flex items-center space-x-4 py-2 px-4 hover:bg-gray-800 rounded-md cursor-pointer">
      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
        <img
          src={coverImage}
          alt={`${name} album art`}
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
