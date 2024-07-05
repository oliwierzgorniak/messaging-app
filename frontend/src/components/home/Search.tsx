import { Input } from "@nextui-org/react";
import { useQuery } from "react-query";
import getUsers from "../../api/getUsers";
import { useState } from "react";
import User from "./search/User";

const Search = () => {
  let inputValue = "";
  // const [inputValue, setInputValue] = useState("");
  const { data, refetch } = useQuery("users", () => getUsers(inputValue));

  return (
    <div className="absolute top-0 left-0 h-lvh w-full grid place-items-center">
      <section className="p-6 border-2 rounded-lg w-[20rem] bg-white">
        <Input
          onInput={(e) => {
            const $input = e.currentTarget as HTMLInputElement;
            // setInputValue($input.value);
            inputValue = $input.value;
            refetch();
          }}
          className="mb-4"
        />

        <ul className="max-h-[9.75rem] overflow-y-scroll px-4">
          {data?.result === "success" &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data?.content.map((user, i) => (
              <User key={`user-${i}`} user={user} />
            ))}
        </ul>
      </section>
    </div>
  );
};

export default Search;
