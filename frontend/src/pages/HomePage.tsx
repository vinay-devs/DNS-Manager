import { useState } from "react";
import { DNSTable } from "../components/DNSTable";
import { HomeNav } from "../components/HomeNav";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useEffect } from "react";
import { CredentialForm } from "../components/CredentialForm";
import AddRecordForm from "../components/AddRecordForm";
import useUserDnsActions from "../services/useUserDnsActions";
import { Route53Record } from "@vinaydevs/common-dnsmanager";

type Route53RecordWithIdProps = Route53Record & {
  id: string;
};

export type Route53RecordsWithIdProps = Route53RecordWithIdProps[];

export const HomePage = () => {
  const [isAccesKey, setAccessKey] = useState<boolean>(false);
  const [fetch, setFetch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hostedId, setHostedId] = useState("");
  const [hostedName, setHostedName] = useState("");
  const [recordSet, setRecordSet] = useState([{}] as Route53RecordsWithIdProps);
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);

  const onClose = () => setIsModalOpen(false);
  const onAddRecordClose = () => setIsAddRecordModalOpen(false);

  const extractedHostedId = hostedId.substring(hostedId.lastIndexOf("/") + 1);

  const userDnsActions = useUserDnsActions();
  useEffect(() => {
    const getRecordset = async () => {
      const res: Route53RecordsWithIdProps = await userDnsActions.getRecordset(
        extractedHostedId
      );
      setRecordSet(res);
    };
    getRecordset();
  }, [isAccesKey, isAddRecordModalOpen, fetch]);

  return (
    <div className="p-6 flex flex-col h-screen ">
      <HomeNav
        setAccessKey={setAccessKey}
        setHostedId={setHostedId}
        setHostedName={setHostedName}
      />
      {isAccesKey ? (
        <div>
          <Button
            placeholder="Add Record"
            styleClass=" "
            onclick={() => setIsAddRecordModalOpen(true)}
          />
          <DNSTable
            recordSet={recordSet}
            hostedZoneId={extractedHostedId}
            setFetch={setFetch}
            hostedName={hostedName}
          />
          {isAddRecordModalOpen ? (
            <Modal isOpen={isAddRecordModalOpen} onClose={onAddRecordClose}>
              <AddRecordForm
                hostZoneName={hostedName}
                hostedZoneId={extractedHostedId}
              />
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
              <CredentialForm onAddAccessKey={setAccessKey} onClose={onClose} />
            </Modal>
          ) : null}
        </div>
      )}
    </div>
  );
};
