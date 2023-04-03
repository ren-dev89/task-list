import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Admin from "../pages/Admin";
import Error from "../pages/Error";

import Private from "./Private";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <Private>
              <Admin />
            </Private>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
