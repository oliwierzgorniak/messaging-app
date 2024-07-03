import { SERVER_URL } from "../consts";

export default async function getName() {
  const res = await fetch(`${SERVER_URL}/api/name`, {
    credentials: "include",
  });
  const name: { result: "success" | "error"; content: string } =
    await res.json();
  return name;
}
