import { useState } from "react";
import Chat from "../components/home/Chat";
import Sidebar from "../components/home/Sidebar";
import { IUser } from "../types";

const Home = () => {
  const [openedChat, setOpenedChat] = useState<null | IUser>(null);

  return (
    <div className="flex">
      <Sidebar setOpenedChat={setOpenedChat} />
      {openedChat ? <Chat openedChat={openedChat} /> : null}
    </div>
  );
};

export default Home;
