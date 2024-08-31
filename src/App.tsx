import { FC, useEffect } from "react";
import { motion, useAnimation, AnimationControls } from "framer-motion";
// COMPONENTS
import PlayLists from "@/components/music/playlists/index";
import Player from "@/components/music/player/index";
// ASSETS
import spotifyLogo from "@/assets/spotify-logo.png";
// STORE
import usePlayerStore from "@/store/player";
// UTILS
import { darkenAccent } from "./utils";
// TYPES
interface Track {
  accent?: string;
}

interface PlayerStore {
  currentTrack: Track;
}

// Component
const App: FC = () => {
  const {
    currentTrack: { accent = "#000000" },
  } = (usePlayerStore() as PlayerStore) ?? {};
  const controls: AnimationControls = useAnimation();

  useEffect(() => {
    // Trigger the animation when the accent color changes
    controls.start({
      background: `linear-gradient(to right, ${accent}, ${darkenAccent(
        accent,
        -70
      )})`,
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  }, [accent, controls]);

  return (
    <motion.main
      animate={controls}
      className="w-full overflow-auto min-h-dvh md:max-h-dvh md:overflow-hidden gap-4 lg:gap-0 p-6 grid grid-cols-10 relative"
    >
      <section className="col-span-10 lg:col-span-2">
        <img className="w-22 h-8" src={spotifyLogo} alt="Spotify" />
      </section>
      <section className="col-span-10 md:col-span-5 lg:col-span-3">
        <PlayLists />
      </section>
      <section className="col-span-10 md:col-span-5 sticky top-0 p-0 md:p-8">
        <Player />
      </section>
    </motion.main>
  );
};

export default App;
