import { HeadingSignup } from "../components/HeadingSignup";
import { SignupForm } from "../components/SignupForm";

export const Signup = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col">
        <HeadingSignup />
        <SignupForm />
      </div>
    </div>
  );
};
