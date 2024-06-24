import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useMutation } from "react-query";
import signup from "../api/signup";

const Signup = () => {
  const [isEmailMissing, setIsEmailMissing] = useState(false);
  const [isPasswordMissing, setIsPasswordMissing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const mutation = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      signup(email, password)
  );

  function handleClick() {
    if (isEmailMissing || isPasswordMissing) return;
    mutation.mutate({ email, password });
  }

  return (
    <main>
      <article className="min-h-lvh flex justify-center items-center">
        <form
          className="w-72 flex flex-col p-10 drop-shadow-md bg-white rounded-md"
          action="#"
        >
          <Input
            onInput={(e) => {
              const input = e.currentTarget as HTMLInputElement;
              setEmail(input.value);
            }}
            onBlur={(e) => handleInputMissing(setIsEmailMissing, e)}
            type="email"
            label="Email"
            name="email"
            required
            isInvalid={isEmailMissing}
            errorMessage={"Provide the email"}
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
            className="mb-8"
          />
          <Button onClick={handleClick} color="primary">
            Sign up
          </Button>
        </form>
      </article>
    </main>
  );
};

export default Signup;
