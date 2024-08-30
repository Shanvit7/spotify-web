// TYPES
import { FC } from "react";
// COMPONENTS
import PlayLists from "@/components/music/playlists";
import Player from "@/components/music/player/index";
// ASSETS
import spotifyLogo from "@/assets/spotify-logo.png";
// STORE
import usePlayerStore from "@/store/player";

const App: FC = () => {
  const { bgColor = '#000000' } = usePlayerStore() ?? {};
  return (
    <main
      className="w-full p-4 grid grid-cols-10"
      style={{ background: bgColor }}
    >
      <section className="col-span-2">
        <img className="w-22 h-8" src={spotifyLogo} alt="Spotify" />
      </section>
      <section className="col-span-3">
        <PlayLists />
      </section>{" "}
      <section className="col-span-5">
        <Player />
      </section>
    </main>
  );
};

export default App;
