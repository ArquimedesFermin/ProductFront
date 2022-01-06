import React, { useEffect, useState } from "react";
import InsertModel from "./Components/InsertModel";
import GridModel from "./Components/GridModel";
const ContentModel = () => {
  const [id, SetId] = useState(0);
  const [change, setChange] = useState(false);

  console.log(change);
  return (
    <>
      <InsertModel change={change} setChange={setChange} Id={id} />
      <GridModel change={change} SetId={SetId} />
    </>
  );
};

export default ContentModel;
