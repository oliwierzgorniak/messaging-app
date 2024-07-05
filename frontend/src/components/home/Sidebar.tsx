import { useQuery } from "react-query";
import logoSvg from "../../assets/logo.svg";
import getChats from "../../api/getChats";
import { IUser } from "../../types";
import LoggedInAs from "./LoggedInAs";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import Search from "./Search";

const Sidebar = ({
  setOpenedChat,
}: {
  setOpenedChat: React.Dispatch<React.SetStateAction<IUser | null>>;
}) => {
  const { data } = useQuery("chats", getChats);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="grid grid-rows-[auto_auto_1fr_auto] justify-items-center w-min text-nowrap py-4 px-6 border-r-2 border-slate-100 h-lvh">
      <img src={logoSvg} alt="logo" className="w-40 max-w-[unset] mb-10" />
      <Button
        className="border-slate-100 mb-3"
        variant="bordered"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Add chat
      </Button>
      {isModalOpen ? <Search /> : null}
      <ul className="self-start">
        {data &&
          data.content.map(({ id, name }: { id: number; name: string }) => (
            <li key={id}>
              <button
                onClick={() => setOpenedChat({ id, name })}
                className="w-32 bg-slate-100 rounded-lg p-2"
              >
                {name}
              </button>
            </li>
          ))}
      </ul>
      <LoggedInAs />
    </section>
  );
};

export default Sidebar;
