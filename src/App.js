import "./App.css";
import Grid from "./Product/Grid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bar from './Bar'
const App = () => {
  return (
    <div>
      <Router>
        <Bar/>
        <Routes>
          <Route exact path="/" element={<Grid />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
