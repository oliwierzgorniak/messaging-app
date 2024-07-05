import { SERVER_URL } from "../consts";
import { IUser } from "../types";

export default async function getUsers(string: string) {
  const res = await fetch(`${SERVER_URL}/api/users?string=${string}`, {
    credentials: "include",
  });
  const usersRes: {
    result: "success" | "error";
    content: string | IUser[];
  } = await res.json();
  return usersRes;
}
