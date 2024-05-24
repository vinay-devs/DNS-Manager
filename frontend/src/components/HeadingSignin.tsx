export const HeadingSignin = () => {
  return (
    <div className="mb-8">
      <h1 className="text-center text-3xl font-semibold">
        Sign In to your Account
      </h1>
      <p className="text-center">
        or{" "}
        <a className=" text-violet-700 text-md" href="/signup">
          register for a new account
        </a>{" "}
      </p>
    </div>
  );
};
