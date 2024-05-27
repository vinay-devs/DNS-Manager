import { Link } from "react-router-dom";

export const HeadingSignin = () => {
  return (
    <div className="mb-8">
      <h1 className="text-center text-3xl font-semibold">
        Sign In to your Account
      </h1>
      <p className="text-center">
        or{" "}
        <Link className=" text-violet-700 text-md" to="/signup">
          register for a new account
        </Link>{" "}
      </p>
    </div>
  );
};
