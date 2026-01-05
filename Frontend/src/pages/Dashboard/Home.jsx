import React from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import { useUserAuth } from "../../hooks/useUserAuth";

const Home = () => {
  useUserAuth()
  return (
    <Dashboardlayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">Home</div>
    </Dashboardlayout>
  );
};

export default Home;
