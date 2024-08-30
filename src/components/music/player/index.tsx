// UTILS
import { useRef, useState, useEffect } from "react";
// STYLES
import "react-h5-audio-player/lib/styles.css";
// HOOKS
import useGetMusicCover from "@/hooks/useGetMusicCover";
// STORES
import usePlayerStore from "@/store/player";
// HOOKS
import useGetPlayList from "@/hooks/useGetPlayList";
// COMPONENTS
import { More, Next, Previous, PlayPause, Volume } from "./controls";
import AudioPlayer from "react-h5-audio-player";

const Player = () => {
  const { data: intialTracks = [] } = useGetPlayList({}) ?? {};
  const {
    tracks = [],
    currentTrack = {},
    setCurrentTrack = () => {},
    setTracks = () => {},
  } = usePlayerStore() ?? {};
  const {
    id: currentId = null,
    name = "",
    artist = "",
    cover = "",
  } = currentTrack ?? {};
  const { data: coverImage = "" } = useGetMusicCover(cover) ?? {};
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const currentIndex = tracks?.findIndex(({ id }) => id === currentId);

  useEffect(() => {
    if (tracks.length === 0 && intialTracks.length > 0) {
      setTracks([...intialTracks]);
      setCurrentTrack(intialTracks[0]);
    }
  }, [intialTracks, setTracks, tracks.length, setCurrentTrack]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.audio.current.addEventListener("play", () =>
        setIsPlaying(true)
      );
      playerRef.current.audio.current.addEventListener("pause", () =>
        setIsPlaying(false)
      );
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.audio.current.removeEventListener("play", () =>
          setIsPlaying(true)
        );
        playerRef.current.audio.current.removeEventListener("pause", () =>
          setIsPlaying(false)
        );
      }
    };
  }, []);

  const handleClickPrevious = () => {
    const index = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[index]);
  };

  const handleClickNext = () => {
    const index = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[index]);
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.audio.current.pause();
      } else {
        playerRef.current.audio.current.play();
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent overflow-hidden flex flex-col items-center space-x-4 md:space-x-0">
      <div className="p-2 grid grid-cols-3 gap-4 items-center md:gap-0 md:grid-cols-1 md:p-4 md:w-full">
        <img
          src={coverImage}
          alt={`${name}'s album cover`}
          className="w-full md:h-64 rounded-lg mb-4 h-20"
        />
        <div className="min-w-40">
          <h2 className="text-xl font-bold text-white">
            {name}
          </h2>
          <p className="text-gray-400 mb-4">{artist}</p>
        </div>
      </div>
      <div className="w-full flex-grow md:flex-grow-0">
        <AudioPlayer
          ref={playerRef}
          src={currentTrack?.url}
          onEnded={handleClickNext}
          showSkipControls={false}
          showJumpControls={false}
          customProgressBarSection={["PROGRESS_BAR"]}
          customControlsSection={[
            <div
              key="more"
              className="flex flex-1 flex-shrink-0 basis-auto"
            >
              <More />
            </div>,
            <div
              key="controls"
              className="flex justify-center items-center flex-1 flex-shrink-0 basis-auto"
            >
              <div className="flex items-center gap-2">
                <Previous handleClick={handleClickPrevious} />
                <PlayPause handleClick={togglePlay} isPlaying={isPlaying} />
                <Next handleClick={handleClickNext} />
              </div>
            </div>,
            <div
              key="volume"
              className="flex flex-1 justify-end flex-shrink-0 flex-basis-auto"
            >
              <Volume />
            </div>,
          ]}
          autoPlayAfterSrcChange={true}
          layout="stacked"
          className="bg-transparent text-white"
        />
      </div>
    </div>
  );
};

export default Player;
