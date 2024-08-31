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
// FRAMER MOTION
import { motion } from "framer-motion";
import { Skeleton, SkeletonPlay } from "./skeleton";
import { ImageCoverError } from "@/components/error";

const Player = () => {
  const {
    data: intialTracks = [],
    isLoading: isTracksLoading = true,
    isError: isTracksError = false,
  } = useGetPlayList({}) ?? {};
  const {
    tracks = [],
    currentTrack = {},
    setCurrentTrack = () => {},
    setTracks = () => {},
  } = usePlayerStore() ?? {};
  const isEmpty = [intialTracks?.length, tracks?.length].includes(0);
  const {
    id: currentId = null,
    name = "",
    artist = "",
    cover = "",
  } = currentTrack ?? {};
  const {
    data: coverImage = "",
    isLoading: isCoverLoading = true,
    isError: isCoverError = false,
  } = useGetMusicCover(cover) ?? {};
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const currentIndex = tracks?.findIndex(({ id }) => id === currentId);

  useEffect(() => {
    if (tracks.length === 0 && intialTracks.length > 0) {
      setTracks([...intialTracks]);
      setCurrentTrack(intialTracks[0]);
    }
  }, [intialTracks, setTracks, tracks.length, setCurrentTrack]);

  useEffect(() => {
    const audioElement = playerRef.current?.audio.current;

    if (audioElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleWaiting = () => setIsBuffering(true);
      const handleCanPlay = () => setIsBuffering(false);

      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("waiting", handleWaiting);
      audioElement.addEventListener("canplay", handleCanPlay);

      // Cleanup function
      return () => {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("waiting", handleWaiting);
        audioElement.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [playerRef.current?.audio.current]); // Dependency array includes the audio element

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
      const audioElement = playerRef.current?.audio.current;
      if (audioElement) {
        if (isPlaying) {
          audioElement.pause();
        } else {
          audioElement.play();
        }
      }
    }
  };

  if (isTracksError || isEmpty) {
    return <></>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-transparent overflow-hidden flex flex-col items-center space-x-4 md:space-x-0">
      <div className="p-2 grid grid-cols-3 gap-4 items-center md:gap-0 md:grid-cols-1 md:p-4 md:w-full">
        {isTracksLoading || isCoverLoading ? (
          <Skeleton className="w-full md:h-64 rounded-lg mb-4 h-20" />
        ) : isCoverError ? (
          <ImageCoverError />
        ) : (
          <motion.img
            src={coverImage}
            alt={`${name}'s album cover`}
            className="w-full md:h-64 rounded-lg mb-4 h-20 md:order-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <div className="min-w-40">
          {isTracksLoading ? (
            <>
              <Skeleton className="text-xl font-bold text-white h-6 w-32 mb-2" />
              <Skeleton className="text-gray-400 mb-4 h-4 w-24" />
            </>
          ) : (
            <>
              <motion.h2
                className="text-xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {name}
              </motion.h2>
              <motion.p
                className="text-gray-400 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {artist}
              </motion.p>
            </>
          )}
        </div>
      </div>
      <motion.div
        className="w-full flex-grow md:flex-grow-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <AudioPlayer
          ref={playerRef}
          src={currentTrack?.url}
          onEnded={handleClickNext}
          showSkipControls={false}
          showJumpControls={false}
          customProgressBarSection={["PROGRESS_BAR"]}
          customControlsSection={[
            <div key="more" className="flex flex-1 flex-shrink-0 basis-auto">
              <More />
            </div>,
            <div
              key="controls"
              className="flex justify-center items-center flex-1 flex-shrink-0 basis-auto"
            >
              <div className="flex items-center gap-2">
                <Previous handleClick={handleClickPrevious} />
                {isBuffering ? (
                  <SkeletonPlay />
                ) : (
                  <PlayPause handleClick={togglePlay} isPlaying={isPlaying} />
                )}
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
      </motion.div>
    </div>
  );
};

export default Player;
