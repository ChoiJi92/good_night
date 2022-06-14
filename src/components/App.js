import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Signup from "./Signup";
import Login from "./Login";
import Write from "./Write";
import Detail from "./Detail";
import Header from "./Header";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadContentDB } from "../redux/modules/contentSlice";

function App() {
  const dispatch = useDispatch();
  const [isloaded, setIsloaded] = useState(false);

  useEffect(() => {
    async function load() {
      await dispatch(loadContentDB());
      console.log("load");
      setIsloaded(true);
    }
    load();
  }, []);
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={isloaded && <Main />}></Route>
        <Route path="/write/" element={<Write />}></Route>
        <Route path="/write/:id" element={isloaded && <Write />}></Route>
        <Route path="/detail/:id" element={isloaded && <Detail />}></Route>
      </Routes>
    </div>
  );
}

export default App;