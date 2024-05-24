import { ProfileHeader } from "../components/ProfileHeader";
import { UserSecretForm } from "../components/UserSecretForm";

export const ProfilePage = () => {
  return (
    <div className="h-screen bg-slate-100 flex justify-center w-full items-center ">
      <div className=" border-2 border-black flex flex-col gap-3 p-8 rounded">
        <ProfileHeader />
        <UserSecretForm />
      </div>
    </div>
  );
};
