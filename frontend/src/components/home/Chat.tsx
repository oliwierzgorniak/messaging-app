import { useQuery } from "react-query";
import getMessages from "../../api/getMessages";
import { IUser } from "../../types";
import { Button, Input } from "@nextui-org/react";
import { io } from "socket.io-client";

const Chat = ({ openedChat }: { openedChat: IUser | null }) => {
  // const { data } = useQuery("messages", () => getMessages(openedChat.id));
  const socket = io("http://localhost:3000");
  socket.emit("message", "hi");

  return (
    <>
      {openedChat ? (
        <main className="w-full">
          <section className="h-lvh flex flex-col">
            <div className="border-b-2 py-2 px-3">{openedChat.name}</div>
            <div className="h-full">
              <ul></ul>
            </div>
            <div className="flex gap-2 px-2 py-4 border-t-2">
              <Input type="text" />
              <Button color="primary">Send</Button>
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
};

export default Chat;
