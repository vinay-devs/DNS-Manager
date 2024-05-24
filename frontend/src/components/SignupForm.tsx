import { Button } from "./Button";
import { InputBox } from "./InputBox";

export const SignupForm = () => {
  return (
    <div className="flex justify-center flex-grow w-full ">
      <div className=" p-8  ">
        <form className="flex flex-col min-w-96  ">
          <InputBox type="text" placeholder="Enter your name" name="Name" />
          <InputBox type="email" placeholder="Enter your email" name="Email" />
          <InputBox
            type="passsword"
            placeholder="Enter your password"
            name="Password"
          />
          <Button placeholder="Sign Up" />
        </form>
      </div>
    </div>
  );
};
