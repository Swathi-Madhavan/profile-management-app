import React from "react";
import CustomAppBar from "./components/CustomAppBar";
import { Outlet } from "react-router-dom";
import Layout from "./styles/Layout";

function App() {
  return (
    <div>
      <CustomAppBar />
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;
