import { HeadingSignin } from "../components/HeadingSignin";
import { SigninForm } from "../components/SigninForm";

export const Signin = () => {
  return (
    <div className=" bg-slate-100 h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <HeadingSignin />
        <SigninForm />
      </div>
    </div>
  );
};
