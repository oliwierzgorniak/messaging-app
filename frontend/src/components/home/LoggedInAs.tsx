import { useQuery } from "react-query";
import getName from "../../api/getName";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const LoggedInAs = () => {
  const { data } = useQuery("name", getName);

  return (
    <div className="justify-self-end">
      <span className="text-sm ml-1 mb-2 block max-w-[10rem] text-ellipsis overflow-hidden whitespace-nowrap">
        Logged in as {data && data.content}
      </span>
      <div>
        <Link to={"/login"}>
          <Button variant="ghost" className="mr-2 border-slate-200">
            Login
          </Button>
        </Link>
        <Link to={"/signup"}>
          <Button variant="ghost" className="border-slate-200">
            Signup
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoggedInAs;
