import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserDnsActions from "../services/useUserDnsActions";

type homeNavProps = {
  setAccessKey: React.Dispatch<React.SetStateAction<boolean>>;
  setHostedId: React.Dispatch<React.SetStateAction<string>>;
  setHostedName: React.Dispatch<React.SetStateAction<string>>;
};
type ResourceState = {
  Id: string;
  Name: string;
  ResourceRecordSetCount: number;
  CallerReference: string;
  Config: {
    Comment: string;
    privateZone: boolean;
  };
};
export const HomeNav = ({
  setAccessKey,
  setHostedId,
  setHostedName,
}: homeNavProps) => {
  const [dropdown, setDropDown] = useState(false);
  const [zoneValues, setZoneValues] = useState<ResourceState[]>([]);
  const [hostedZoneId, setHostedZoneId] = useState<string>("");
  const menuRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  let user: { name: string; email: string } | null = null;
  const userData = localStorage.getItem("user");
  if (userData) {
    user = JSON.parse(userData) as { name: string; email: string };
  } else {
    navigate("/signin");
  }

  const handleClickOutside = (e: Event) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setDropDown(false);
    }
  };
  const userDNSActions = useUserDnsActions();
  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setHostedZoneId(e.target.value);
    const data: { Name: string } | undefined = zoneValues.find(
      (value: { Id: string }) => value.Id === e.target.value
    );
    if (data) {
      setHostedName(data.Name);
    }
    setHostedId(e.target.value);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  useEffect(() => {
    const getHostedId = async () => {
      const response = await userDNSActions.getHostedId();
      console.log(response);
      if (response) {
        setAccessKey(true);
        setZoneValues(response);
        setHostedZoneId(response[0].Id);
        setHostedId(response[0].Id);
        setHostedName(response[0].Name);
      } else {
        setAccessKey(false);
      }
    };
    getHostedId();
  }, []);

  const { profile } = {
    profile: user?.name[0].toUpperCase(),
  };

  return (
    <div className="flex justify-between mb-9">
      <h1 className="font-bold text-3xl">DNS Management</h1>

      <div className="relative flex gap-9" ref={menuRef}>
        <div>
          <select
            name="hostedzone"
            defaultValue={hostedZoneId}
            onChange={handleOnChange}
          >
            {zoneValues.map((value) => {
              return <option value={value.Id}>{value.Name}</option>;
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
              <div
                className="bg-gray-400 px-4 py-1 hover:bg-black hover:text-white"
                onClick={() => {
                  return localStorage.clear();
                }}
              >
                <h1>Log Out</h1>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
