import { Navigate } from "react-router-dom";

export const ProfileHeader = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const { name, email } = JSON.parse(user);
    return (
      <div className="flex gap-3">
        <div className=" w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center">
          <h1 className="text-gray-800 ">{name[0].toUpperCase()}</h1>
        </div>

        <div>
          <h1 className="flex flex-col text-xl">
            {name}
            <span className="  text-gray-600 text-xs">{email}</span>
          </h1>
        </div>
      </div>
    );
  } else {
    <Navigate to="/login" />;
  }
};
