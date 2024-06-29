import { useQuery } from "react-query";
import logoSvg from "../../assets/logo.svg";
import getChats from "../../api/getChats";
import { IUser } from "../../types";

const Sidebar = ({
  setOpenedChat,
}: {
  setOpenedChat: React.Dispatch<React.SetStateAction<IUser | null>>;
}) => {
  const { data } = useQuery("chats", getChats);

  return (
    <section className="flex flex-col items-center w-min text-nowrap py-4 px-6 border-r-2 border-slate-100 h-lvh">
      <img src={logoSvg} alt="logo" className="w-40 max-w-[unset] mb-10" />
      <ul>
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
    </section>
  );
};

export default Sidebar;
