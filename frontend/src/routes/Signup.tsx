import { Button, Input } from "@nextui-org/react";

const Signup = () => {
  return (
    <main>
      <article>
        <form action="#">
          <Input type="email" label="Email" />
          <Input type="password" label="Password" />
          <Button color="primary">Sign up</Button>
        </form>
      </article>
    </main>
  );
};

export default Signup;
