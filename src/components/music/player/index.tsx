// UTILS
import { useRef, useState, useEffect } from "react";
import ColorThief from "colorthief";
// STYLES
import "react-h5-audio-player/lib/styles.css";
// HOOKS
import useGetMusicCover from "@/hooks/useGetMusicCover";
// STORES
import usePlayerStore from "@/store/player";
// COMPONENTS
import { More, Next, Previous, PlayPause, Volume } from "./controls";
import AudioPlayer from "react-h5-audio-player";

const Player = () => {
  const {
    tracks = [],
    currentTrack = {},
    setCurrentTrack = () => {},
    setBgColor = () => {},
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
    if (coverImage) {
      const img = new Image();
      img.src = coverImage;
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img) ?? [0, 0, 0];
        setBgColor(
          `linear-gradient(90deg, rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)`
        );
      };
    }
  }, [coverImage, setBgColor]);

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
    const index  = (currentIndex - 1 + tracks.length) % tracks.length;
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
    <div className="w-full max-w-md mx-auto bg-transparent overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-1">{name}</h2>
        <p className="text-gray-400 mb-4">{artist}</p>
        <img
          src={coverImage}
          alt={`${name}'s album cover`}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      </div>
      <AudioPlayer
        ref={playerRef}
        src={currentTrack?.url}
        onEnded={handleClickNext}
        showSkipControls={false}
        showJumpControls={false}
        customProgressBarSection={["PROGRESS_BAR"]}
        customControlsSection={[
          <div key="more" className="flex-1 flex-shrink-0 basis-auto">
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
  );
};

export default Player;
