import { useState } from "react";
import Chat from "../components/home/Chat";
import Sidebar from "../components/home/Sidebar";
import { IUserSidebar } from "../types";

const Home = () => {
  const [openedChat, setOpenedChat] = useState<null | IUserSidebar>(null);

  return (
    <div className="flex">
      <Sidebar setOpenedChat={setOpenedChat} />
      {openedChat ? <Chat openedChat={openedChat} /> : null}
    </div>
  );
};

export default Home;
