import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bar from "./Bar";
import SideBar from "./SideBar";

import Grid from "./Product/Grid";
import Register from "./Product/Register";
import ContentModel from "./Model/ContentModel";

const App = () => {
  const [state, setState] = useState();

  return (
    <div>
      <Router>
        <Bar setState={setState} />
        <SideBar open={state} />
        <Routes>
          <Route exact path="/" element={<Grid />} />
          <Route exact path="/RegistrarProducto/" element={<Register />} />
          <Route
            exact
            path="/RegistrarProducto/:IdProducto"
            element={<Register />}
          />
          <Route exact path="/Model" element={<ContentModel />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
