import { createContext, useState } from "react";
import { IUserSidebar } from "../types";

const ChatsContext = createContext({
  chats: [],
  setChats: () => {},
} as { chats: IUserSidebar[]; setChats: React.Dispatch<React.SetStateAction<IUserSidebar[]>> });

export const ChatsProvider = ({ children }: { children: JSX.Element }) => {
  const [chats, setChats] = useState<IUserSidebar[]>([]);

  return (
    <ChatsContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsContext;
