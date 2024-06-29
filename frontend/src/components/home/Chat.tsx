import { useQuery } from "react-query";
import getMessages from "../../api/getMessages";
import { IUser } from "../../types";

const Chat = ({ openedChat }: { openedChat: IUser | null }) => {
  // const { data } = useQuery("messages", () => getMessages(openedChat.id));

  return (
    <main className="w-full">
      <section>
        {openedChat ? (
          <div className="bg-slate-100 py-2 px-3">{openedChat.name}</div>
        ) : null}
      </section>
    </main>
  );
};

export default Chat;
