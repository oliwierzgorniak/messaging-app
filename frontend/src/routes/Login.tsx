import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useMutation } from "react-query";
import login from "../api/login";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isEmailMissing, setIsEmailMissing] = useState(false);
  const [isPasswordMissing, setIsPasswordMissing] = useState(false);
  const [name, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<null | string>(null);
  const navigate = useNavigate();

  function handleInputMissing(
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    e: React.FormEvent
  ) {
    if (!e) return;
    const input = e.currentTarget as HTMLInputElement;
    if (input.value.length == 0) {
      setter(true);
    } else {
      setter(false);
    }
  }

  const mutation = useMutation({
    mutationFn: ({ name, password }: { name: string; password: string }) =>
      login(name, password),
    onSuccess: (data: { result: "success" | "error"; content: string }) => {
      if (data.result === "success") {
        navigate("/");
      } else {
        setMessage(data.content);
      }
    },
  });

  function handleClick() {
    if (name === "" || password === "") {
      setMessage("Please provide an name and a password");
      return;
    }

    mutation.mutate({ name, password });
  }

  return (
    <main>
      <article className="min-h-lvh flex justify-center items-center">
        <form
          className="w-72 flex flex-col p-10 drop-shadow-md bg-white rounded-lg"
          action="#"
        >
          <Input
            onInput={(e) => {
              const input = e.currentTarget as HTMLInputElement;
              setEmail(input.value);
            }}
            onBlur={(e) => handleInputMissing(setIsEmailMissing, e)}
            type="name"
            label="Email"
            name="name"
            required
            isInvalid={isEmailMissing}
            errorMessage={"Provide the name"}
            className="mb-6"
          />
          <Input
            onInput={(e) => {
              const input = e.currentTarget as HTMLInputElement;
              setPassword(input.value);
            }}
            onBlur={(e) => handleInputMissing(setIsPasswordMissing, e)}
            type="password"
            label="Password"
            name="password"
            required
            isInvalid={isPasswordMissing}
            errorMessage={"Provide the password"}
          />
          {message ? (
            <span className="text-[0.8rem]  mt-5 mb-3  p-3 bg-slate-200 rounded-lg">
              {message}
            </span>
          ) : null}
          <Button onClick={handleClick} color="primary" className="mt-6">
            Login
          </Button>
          <Link
            to="/signup"
            className="mt-3 text-slate-600 underline self-center text-sm"
          >
            sign up
          </Link>
        </form>
      </article>
    </main>
  );
};

export default Login;
