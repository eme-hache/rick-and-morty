import { Outlet } from "react-router-dom";
import Panel from "../characters/panel.component";
import Modal from "../user/modal.component";
import Aside from "./aside.component";
import Main from "./main.component";

const Layout = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row relative">
      <Modal />
      <Aside>
        <Panel />
      </Aside>
      <Main className="w-full flex-1">
        <Outlet />
      </Main>
    </div>
  );
};

export default Layout;
