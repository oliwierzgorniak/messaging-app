import { useQuery } from "react-query";
import getMessages from "../../api/getMessages";
import { IUser } from "../../types";
import { Button, Input } from "@nextui-org/react";
import socket from "../../socket";
import { useState } from "react";

function sendMessage(message: string, recipient: number) {
  socket.emit("message", {
    content: message,
    recipient: recipient,
  });
}

const Chat = ({ openedChat }: { openedChat: IUser | null }) => {
  // const { data } = useQuery("messages", () => getMessages(openedChat.id));
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  socket.on("message", (message: { sender: number; content: string }) => {
    setMessages([...messages, message.content]);
  });

  return (
    <>
      {openedChat ? (
        <main className="w-full">
          <section className="h-lvh flex flex-col">
            <div className="border-b-2 py-2 px-3">{openedChat.name}</div>
            <div className="h-full">
              <ul>
                {messages.map((message, i) => (
                  <li key={`message-${i}`}>{message}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 px-2 py-4 border-t-2">
              <Input
                type="text"
                onInput={(e) => {
                  const $input = e.target as HTMLInputElement;
                  setInputValue($input.value);
                }}
              />
              <Button
                color="primary"
                onClick={() => sendMessage(inputValue, openedChat.id)}
              >
                Send
              </Button>
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
};

export default Chat;
