import { useState } from "react";
import { redirect } from "react-router-dom";

const Home = () => {
  redirect("/signup");

  return <h1>Home</h1>;
};

export default Home;
