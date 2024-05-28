import { Button } from "./Button";
import LandingImage from "../assets/LandingImage.png";
import { useNavigate } from "react-router-dom";
export const Quotes = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center  mt-4   items-center">
      <h1 className="text-center text-3xl md:text-5xl font-bold">
        Manage Your DNS <br /> with Ease
      </h1>
      <p className=" mt-5 text-sm md:text-xl text-center text-gray-400">
        Our powerful DNS management platform helps you take control of your{" "}
        <br />
        domain's online presence.
      </p>
      <div className="mt-3">
        <Button
          placeholder="Sign Up"
          styleClass=""
          onclick={() => navigate("/signup")}
        />
      </div>
      <div>
        <img src={LandingImage} />
      </div>
    </div>
  );
};
