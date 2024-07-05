import { Button } from "@nextui-org/react";
import { IUser } from "../../../types";
import { useMutation } from "react-query";
import addChat from "../../../api/addChat";

const User = ({ user }: { user: IUser }) => {
  const mutation = useMutation({
    mutationFn: () => addChat(user.id),
    onSuccess: () => {
      user.isAdded = true;
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
        onClick={() => mutation.mutate()}
      >
        {user.isAdded ? "Added" : "Add"}
      </Button>
    </li>
  );
};

export default User;
