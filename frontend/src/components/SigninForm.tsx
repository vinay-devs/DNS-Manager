import { Button } from "./Button";
import { InputBox } from "./InputBox";

export const SigninForm = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="">
        <form className="flex flex-col min-w-96">
          <InputBox placeholder="Email Address" name="" type="email" />
          <InputBox placeholder="Password" name="" type="password" />
          <Button placeholder="Sign In" />
        </form>
      </div>
    </div>
  );
};
