import { useState } from "react";
import { DNSTable } from "../components/DNSTable";
import { HomeNav } from "../components/HomeNav";
import { Button } from "../components/Button";
import { AccessKeyModal } from "../components/AccessKeyModal";

export const HomePage = () => {
  const [isAccesKey, setAccessKey] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => setIsModalOpen(false);
  return (
    <div className="p-6 flex flex-col h-screen ">
      <HomeNav />
      {isAccesKey ? (
        <DNSTable />
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <Button
            placeholder="Add Access Key"
            styleClass=" "
            onclick={() => setIsModalOpen(true)}
          />
          {isModalOpen ? (
            <AccessKeyModal isOpen={isModalOpen} onClose={onClose} />
          ) : null}
        </div>
      )}
    </div>
  );
};
