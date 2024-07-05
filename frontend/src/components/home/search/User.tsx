import { Button } from "@nextui-org/react";
import { IUser } from "../../../types";
import { useMutation, useQueryClient } from "react-query";

import addChat from "../../../api/addChat";

const User = ({ user }: { user: IUser }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => addChat(user.id),
    onSuccess: async (data: {
      result: "success" | "error";
      content: string;
    }) => {
      if (data.result === "success") {
        user.isAdded = true;
        await queryClient.refetchQueries(["chats"]);
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
