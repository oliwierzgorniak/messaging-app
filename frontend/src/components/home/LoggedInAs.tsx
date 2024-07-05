import { useQuery } from "react-query";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import getName from "../../api/getName";

const LoggedInAs = () => {
  const { data } = useQuery("name", getName);

  return (
    <div className="justify-self-end">
      <span className="text-sm ml-1 mb-2 block max-w-[10rem] text-ellipsis overflow-hidden whitespace-nowrap">
        <span className="text-slate-500">Logged in as:</span>{" "}
        {data && data.content}
      </span>
      <div>
        <Link to={"/login"}>
          <Button variant="bordered" className="mr-2 border-slate-200">
            Login
          </Button>
        </Link>
        <Link to={"/signup"}>
          <Button variant="bordered" className="border-slate-200">
            Signup
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoggedInAs;
