import useUserDnsActions from "../services/useUserDnsActions";
import { Button } from "./Button";
import { useState, useEffect } from "react";
import { Modal } from "./Modal";

import EditRecordForm, { NewRecordSchema } from "./EditRecordForm";
import { Route53RecordsWithIdProps } from "../pages/HomePage";
import { Route53Record } from "@vinaydevs/common-dnsmanager";
type DNSTableProps = {
  recordSet: Route53RecordsWithIdProps;
  hostedZoneId: string;
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
  hostedName: string;
};
export const DNSTable = ({
  recordSet,
  hostedZoneId,
  setFetch,
  hostedName,
}: DNSTableProps) => {
  const [loader, setLoader] = useState(false);
  const [isEditRecordModalOpen, setIsEditRecordModalOpen] = useState(false);
  const [filterRecordSet, setFilterRecordSet] =
    useState<Route53RecordsWithIdProps>([]);
  const [filterValue, setFilterValue] = useState("");
  const [editRecord, setEditRecord] = useState<NewRecordSchema>();
  const userDNSActions = useUserDnsActions();
  const onEditRecordClose = () => setIsEditRecordModalOpen(false);
  const deleteRecord = async (id: string) => {
    const filteredRecord = recordSet.filter((record) => {
      return record.id == id;
    });
    const removeIdFromRecord = filteredRecord.map((record) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = record;
      return rest;
    });
    setLoader(true);
    await userDNSActions.postRecordset(
      removeIdFromRecord[0],
      hostedZoneId,
      "delete"
    );
    setFetch((prev) => !prev);
    setLoader(false);
  };

  const edit = (id: string) => {
    const filteredRecord = recordSet.filter((record) => {
      return record.id == id;
    });
    const removeIdFromRecord: Route53Record[] = filteredRecord.map((record) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = record;
      return {
        ...rest,
      };
    });
    let multiLine = removeIdFromRecord[0]?.ResourceRecords?.map((record) => {
      return record.Value;
    }).join("\n");

    if (!multiLine) {
      multiLine = " ";
    }
    setEditRecord({
      Name: removeIdFromRecord[0].Name.split(`.${hostedName}`)[0],
      Type: removeIdFromRecord[0].Type,
      Multiline: multiLine,
    });
    setIsEditRecordModalOpen(true);
  };

  useEffect(() => {
    setFilterRecordSet(recordSet);
  }, [recordSet]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;

    setFilterValue(filterValue);
    const filteredRecord = recordSet.filter((record) => {
      return record.Name.includes(filterValue);
    });

    setFilterRecordSet(filteredRecord);
  };
  if (loader) {
    return <div>Loading</div>;
  }
  return (
    <div className="">
      <input
        type="text"
        className=" border rounded px-2 py-1 w-1/4 mt-4 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search By Domain Name"
        onChange={handleFilter}
        value={filterValue}
      />
      {isEditRecordModalOpen ? (
        <Modal isOpen={isEditRecordModalOpen} onClose={onEditRecordClose}>
          <EditRecordForm
            hostZoneName={hostedName}
            hostedZoneId={hostedZoneId}
            defaultValues={editRecord ?? { Name: "", Type: "A", Multiline: "" }}
            setFetch={setFetch}
          />
        </Modal>
      ) : null}
      <table className=" min-w-max w-full  table-fixed overflow-scroll">
        <thead className=" ">
          <tr className=" bg-slate-200 text-gray-500 ">
            <th className="text-left p-3 font-light ">Domain Name</th>
            <th className="text-left font-light">Record Type</th>
            <th className="text-left font-light">Value</th>
            <th className="text-left font-light">TTL</th>

            <th className="text-left font-light">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {filterRecordSet?.map((record) => {
            return (
              <tr className="border-b " key={record.id}>
                <td className="p-4">{record.Name} </td>
                <td>{record.Type}</td>
                <td>
                  {record?.ResourceRecords?.map((val) => (
                    <span>
                      <span className="p-3">{val.Value}</span>
                      <br />
                    </span>
                  ))}
                </td>
                <td>{record.TTL}</td>
                <td className="">
                  <Button
                    placeholder="Edit"
                    styleClass=" border border-gray-500 mr-1 hover:bg-gray-400 hover:text-black"
                    onclick={() => {
                      edit(record.id);
                    }}
                  />
                  <Button
                    placeholder="Delete"
                    styleClass=" text-red-700 border border-gray-500 hover:bg-red-200 hover:text-black"
                    onclick={() => {
                      deleteRecord(record.id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
