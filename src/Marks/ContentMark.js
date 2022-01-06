import React, { useEffect, useState } from "react";
import InsertMark from "./Components/InsertMark";
import GridMark from "./Components/GridMark";

const ContentMark = () => {
  const [id, SetId] = useState(0);
  const [change, setChange] = useState(false);

  console.log(change);
  return (
    <>
      <InsertMark change={change} setChange={setChange} Id={id} />
      <GridMark change={change} SetId={SetId} />
    </>
  );
};

export default ContentMark;
