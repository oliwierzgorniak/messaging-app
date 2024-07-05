import getMessages from "../../../api/getMessages";
import { IMessageRes, IUserSidebar, SetMessageType } from "../../../types";

export default async function fetchMessages(
  openedChat: IUserSidebar,
  setMessages: SetMessageType
) {
  const res: { result: string; content: string | IMessageRes[] } =
    await getMessages(openedChat.id);

  if (res.result === "success") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const messages = res.content.map(
      ({ content, sender }: { content: string; sender: number }) => {
        const isSender = openedChat.id !== sender;
        return { content, isSender };
      }
    );
    setMessages(messages);
  }
}
