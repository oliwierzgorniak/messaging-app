import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import fetchMessages from "./chat/fetchMessages";
import { IMessage, IUserSidebar } from "../../types";
import Message from "./Message";

const Chat = ({ openedChat }: { openedChat: IUserSidebar }) => {
  function sendMessage() {
    setMessages([...messages, { content: inputValue, isSender: true }]);
    socket.emit("message", {
      content: inputValue,
      recipient: openedChat.id,
    });
    setInputValue("");
  }

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const bottomDivRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    bottomDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchMessages(openedChat, setMessages);
  }, [openedChat]);

  socket.on("message", (message: { sender: number; content: string }) => {
    setMessages([
      ...messages,
      { content: message.content, isSender: message.sender !== openedChat.id },
    ]);
  });

  return (
    <main className="w-full">
      <section className="h-lvh flex flex-col">
        <div className="border-b-2 py-3 px-4 font-medium text-md">
          {openedChat.name}
        </div>
        <div className="h-full overflow-y-scroll">
          <ul className="flex flex-col py-2">
            {messages.map((message, i) => (
              <Message
                key={`message-${i}`}
                content={message.content}
                isSender={message.isSender}
              />
            ))}
          </ul>
          <div ref={bottomDivRef}></div>
        </div>
        <div className="flex gap-2 px-2 py-4 border-t-2">
          <Input
            type="text"
            value={inputValue}
            onInput={(e) => {
              const $input = e.target as HTMLInputElement;
              setInputValue($input.value);
            }}
          />
          <Button color="primary" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Chat;
