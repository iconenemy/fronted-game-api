import React from "react";
import { Outlet } from "react-router-dom";

import { Container } from "@mui/system";

import '../index.css'
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth={'xl'} sx={{marginTop: 7, display: 'flex', justifyContent: 'center'}}>
          <Outlet />
      </Container>
    </>
  );
};

export default Layout;
