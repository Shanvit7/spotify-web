// TYPES
import { FC } from "react";
// COMPONENTS
import PlayLists from "@/components/music/playlists";

const App: FC = () => {
  return (
    <main className="grid grid-cols-10">
      <section className="col-span-2">
        <h2>Spotify</h2>
      </section>
      <section className="col-span-3">
        <PlayLists />
      </section>{" "}
      <section className="col-span-5">
       <div>

       </div>
      </section>
    </main>
  );
};

export default App;
