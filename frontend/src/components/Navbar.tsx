import { Button } from "./Button";

export const Navbar = () => {
  return (
    <div className=" flex justify-between p-9">
      <h1 className=" text-lg font-semibold">DNS Manager</h1>
      <Button placeholder={"Sign In"} />
    </div>
  );
};
