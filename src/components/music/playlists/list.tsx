import { FC } from "react";
// COMPONENTS
import Card from "@/components/music/card";

const List: FC = ({ tracks } = []) => {
  return (
    <ul>
      {tracks?.map((data) => (
        <Card key={data?.id} data={data} />
      ))}
    </ul>
  );
};

export default List;
