import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type homeNavProps = {
  values: string[];
};
export const HomeNav = () => {
  const [accessKey, setAccessKey] = useState(true);
  const [dropdown, setDropDown] = useState(false);
  const menuRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = (e: Event) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setDropDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);
  const { profile } = {
    profile: "V",
  };
  const { values }: homeNavProps = {
    values: ["vinaydevs.co"],
  };
  return (
    <div className="flex justify-between mb-9">
      <h1 className="font-bold text-3xl">DNS Management</h1>

      <div className="relative flex gap-9" ref={menuRef}>
        <div>
          <select name="hostedzone">
            {values.map((value) => {
              return <option value={value}>{value}</option>;
            })}
          </select>
        </div>
        <div
          className="relative h-10 w-10 rounded-full bg-gray-800"
          onClick={() => setDropDown(true)}
        >
          <div className=" text-center flex items-center justify-center h-full text-white">
            {profile}
          </div>
          {dropdown ? (
            <div className="z-100 absolute min-w-max right-3 mx-4 my-2 border rounded">
              <div className="bg-gray-400 px-4 py-1 hover:bg-black hover:text-white border-b">
                <Link to="/profile">
                  <h1>Profile</h1>
                </Link>
              </div>
              <div className="bg-gray-400 px-4 py-1 hover:bg-black hover:text-white">
                <h1>Log Out</h1>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
