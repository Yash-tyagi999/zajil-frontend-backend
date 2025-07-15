import Header from "../components/header";
import Sidenav from "../components/sidenav";
import { Outlet } from "react-router-dom";

function HeaderSidenav() {
  return (
    <>
      <Header />
      <Sidenav />
      <Outlet />
    </>
  );
}

export default HeaderSidenav;
