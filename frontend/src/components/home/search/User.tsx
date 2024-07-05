import { Button } from "@nextui-org/react";
import { useMutation } from "react-query";
import { useContext } from "react";
import { IServerAddChatsResponse, IUser } from "../../../types";
import addChat from "../../../api/addChat";
import ChatsContext from "../../../context/ChatsContext";

const User = ({ user }: { user: IUser }) => {
  const { setChats, chats } = useContext(ChatsContext);

  const mutation = useMutation({
    mutationFn: () => addChat(user.id),
    onSuccess: async (data: IServerAddChatsResponse) => {
      if (data.result === "success") {
        user.isAdded = true;
        setChats([...chats, { id: user.id, name: user.name }]);
      }
    },
  });

  return (
    <li className="flex justify-between py-2 items-center gap-8">
      <span className="text-sm max-w-28 text-ellipsis overflow-hidden whitespace-nowrap">
        {user.name}
      </span>
      <Button
        size="sm"
        className={user.isAdded ? " bg-gray-400" : ""}
        disabled={user.isAdded}
        onClick={() => {
          if (!user.isAdded) mutation.mutate();
        }}
      >
        {user.isAdded ? "Added" : "Add"}
      </Button>
    </li>
  );
};

export default User;
