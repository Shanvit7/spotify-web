// TYPES
import { FC } from "react";
// COMPONENTS
import Tabs from "./components/tabs";
// CONSTANTS
import { TABS } from "./utils/constants";

const App: FC = () => {
  return (
    <main className="grid grid-cols-10">
      <section className="grid-cols-2">
        <h2>Spotify</h2>
      </section>
      <section className="grid-cols-3">
        <nav>
          <Tabs tabs={TABS} />
        </nav>
      </section>{" "}
      <section className="grid-cols-5">
       <div>

       </div>
      </section>
    </main>
  );
};

export default App;
