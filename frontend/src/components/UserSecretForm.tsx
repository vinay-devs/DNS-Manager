import { Button } from "./Button";
import { useState } from "react";
import { CredentialForm } from "../components/CredentialForm";
import { Modal } from "../components/Modal";
export const UserSecretForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccesKey, setAccessKey] = useState<boolean>(false);
  const onClose = () => setIsModalOpen(false);
  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <Button
          placeholder="Update Credential"
          styleClass=""
          onclick={() => setIsModalOpen(true)}
        />
        {isModalOpen ? (
          <Modal isOpen={isModalOpen} onClose={onClose}>
            <CredentialForm onAddAccessKey={setAccessKey} onClose={onClose} />
          </Modal>
        ) : null}
      </div>
    </div>
  );
};
