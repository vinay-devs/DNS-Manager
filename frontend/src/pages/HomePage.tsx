import { useState } from "react";
import { DNSTable } from "../components/DNSTable";
import { HomeNav } from "../components/HomeNav";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { CredentialForm } from "../components/CredentialForm";
import AddRecordForm from "../components/AddRecordForm";

export const HomePage = () => {
  const [isAccesKey, setAccessKey] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
  const onClose = () => setIsModalOpen(false);
  const onAddRecordClose = () => setIsAddRecordModalOpen(false);
  return (
    <div className="p-6 flex flex-col h-screen ">
      <HomeNav />
      {isAccesKey ? (
        <div>
          <Button
            placeholder="Add Record"
            styleClass=" "
            onclick={() => setIsAddRecordModalOpen(true)}
          />
          <DNSTable />
          {isAddRecordModalOpen ? (
            <Modal isOpen={isAddRecordModalOpen} onClose={onAddRecordClose}>
              <AddRecordForm />
            </Modal>
          ) : null}
        </div>
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <Button
            placeholder="Add Access Key"
            styleClass=" "
            onclick={() => setIsModalOpen(true)}
          />
          {isModalOpen ? (
            <Modal isOpen={isModalOpen} onClose={onClose}>
              <CredentialForm setAccessKey={setAccessKey} onClose={onClose} />
            </Modal>
          ) : null}
        </div>
      )}
    </div>
  );
};
