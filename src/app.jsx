import React from "react";
import "./app.css";

import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </BrowserRouter>
  );
}

export default App;
