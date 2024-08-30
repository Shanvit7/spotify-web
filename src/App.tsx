// TYPES
import { FC } from "react";
// COMPONENTS
import PlayLists from "@/components/music/playlists";
import Player from "@/components/music/player/index";
// ASSETS
import spotifyLogo from "@/assets/spotify-logo.png";
// STORE
import usePlayerStore from "@/store/player";
// UTILS
import { darkenAccent } from "./utils";

const App: FC = () => {
  const { currentTrack: { accent = '#000000'} = {} } = usePlayerStore() ?? {};
  const bodyStyle = {
    background: `linear-gradient(to right, ${accent}, ${darkenAccent(accent,-70)})`,
  };
  return (
    <main className="w-full min-h-dvh gap-4 lg:gap-0 p-6 grid grid-cols-10 relative" style={bodyStyle}>
      <section className="col-span-10 lg:col-span-2">
        <img className="w-22 h-8" src={spotifyLogo} alt="Spotify" />
      </section>
      <section className="col-span-10 md:col-span-5 lg:col-span-3">
        <PlayLists />
      </section>{" "}
      <section className="col-span-10 md:col-span-5 sticky top-0  p-2 md:p-8">
        <Player />
      </section>
    </main>
  );
};

export default App;
