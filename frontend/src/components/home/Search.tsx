import { Input } from "@nextui-org/react";
import { useQuery } from "react-query";
import getUsers from "../../api/getUsers";
import User from "./search/User";
import closeSvg from "../../assets/close.svg";

const Search = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  let inputValue = "";
  const { data, refetch } = useQuery("users", () => getUsers(inputValue));

  return (
    <div className="absolute top-0 left-0 h-lvh w-full grid place-items-center z-10">
      <section className="p-6 border-2 rounded-lg w-[20rem] bg-white relative">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute right-2 top-2 p-1"
        >
          <img src={closeSvg} alt="close icon" />
        </button>
        <Input
          onInput={(e) => {
            const $input = e.currentTarget as HTMLInputElement;
            inputValue = $input.value;
            refetch();
          }}
          className="mt-5 mb-4"
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
