import React, { useEffect, useState } from "react";
import InsertColor from "./Components/InsertColor";
import GridColor from "./Components/GridColor";

const ContentMark = () => {
  const [id, SetId] = useState(0);
  const [change, setChange] = useState(false);

  return (
    <>
      <InsertColor change={change} setChange={setChange} Id={id} />
      <GridColor change={change} SetId={SetId} />
    </>
  );
};

export default ContentMark;
