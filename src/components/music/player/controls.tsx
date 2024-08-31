// ICONS 
import {
    FastForward,
    Rewind,
    Play,
    Pause,
    MoreHorizontal,
    Volume2,
} from "react-feather";

export const Previous = ({ handleClick = () => {} }) => {
  return (
    <button
      className="bg-transparent rounded-full p-2"
      onClick={handleClick}
    >
      <Rewind color="gray" fill="gray" size={24} />
    </button>
  );
};

export const Next = ({ handleClick = () => {} }) => {
  return (
    <button
      className="bg-transparent rounded-full p-2"
      onClick={handleClick}
    >
      <FastForward color="gray" fill="gray" size={24} />
    </button>
  );
};

export const PlayPause = ({ isPlaying = false, handleClick=()=>{} }) => {
  return (
    <button
      className="bg-white backdrop-blur-md rounded-full p-2 mx-2"
      onClick={handleClick}
    >
      {isPlaying ? (
        <Pause color="black" fill="black" size={20} />
      ) : (
        <Play color="black" fill="black" size={20} />
      )}
    </button>
  );
};

export const More = () => {
  return (
    <button className="bg-white/10 backdrop-blur-md rounded-full p-2">
      <MoreHorizontal size={20} />
    </button>
  );
};

export const Volume = () => {
  return (
    <button className="bg-white/10 backdrop-blur-md rounded-full p-2">
      <Volume2 fill="white" size={20} />
    </button>
  );
};
