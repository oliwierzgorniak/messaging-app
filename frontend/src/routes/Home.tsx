import { useQuery } from "react-query";
import logoSvg from "../assets/logo.svg";
import getChats from "../api/getChats";

const Home = () => {
  const { data, isLoading, isError } = useQuery("chats", getChats);

  return (
    <div>
      <section>
        <img src={logoSvg} alt="logo" />
        <ul>
          {data &&
            data.content.map(({ id, name }: { id: number; name: string }) => (
              <span>
                {id} {name}
              </span>
            ))}
        </ul>
      </section>
      <main>
        <section></section>
      </main>
    </div>
  );
};

export default Home;
