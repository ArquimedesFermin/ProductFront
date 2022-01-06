import React,{useEffect,useState} from "react";
import InsertModel from "./Components/InsertModel";
import GridModel from "./Components/GridModel";
const ContentModel = () => {

  const [id,SetId] =useState(0);

  return (
    <>
      


      <InsertModel Id={id} />
      <GridModel SetId={SetId} />
    </>
  );
};

export default ContentModel;
