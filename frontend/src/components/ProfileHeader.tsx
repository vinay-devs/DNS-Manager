export const ProfileHeader = () => {
  return (
    <div className="flex gap-3">
      <div className=" w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center">
        <h1 className="text-gray-800 ">V</h1>
      </div>

      <div>
        <h1 className="flex flex-col text-xl">
          Vinay Dev S{" "}
          <span className="  text-gray-600 text-xs">vinaydevs@gmail.com</span>
        </h1>
      </div>
    </div>
  );
};
