import React, { useEffect, useState } from "react";
import InsertProductType from "./Components/InsertProductType";
import GridProductType from "./Components/GridProductType";

const ContentMark = () => {
  const [id, SetId] = useState(0);
  const [change, setChange] = useState(false);

  return (
    <>
      <InsertProductType change={change} setChange={setChange} Id={id} />
      <GridProductType change={change} SetId={SetId} />
    </>
  );
};

export default ContentMark;
