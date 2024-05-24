import { Button } from "./Button";

export const DNSTable = () => {
  const { domainName, recordType, value, TTL, status } = {
    domainName: "example.com",
    recordType: "A",
    value: "198.9",
    TTL: 300,
    status: "Inactive",
  };
  return (
    <div className="">
      <table className=" min-w-max w-full table-auto ">
        <thead className=" ">
          <tr className=" bg-slate-200 text-gray-500 ">
            <th className="text-left p-3 font-light ">Domain Name</th>
            <th className="text-left font-light">Record Type</th>
            <th className="text-left font-light">Value</th>
            <th className="text-left font-light">TTL</th>
            <th className="text-left font-light">Status</th>
            <th className="text-left font-light">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="border-b ">
            <td className="p-4">{domainName} </td>
            <td>{recordType}</td>
            <td>{value}</td>
            <td>{TTL}</td>
            <td>
              <span
                className={`${
                  status == "active"
                    ? "text-green-800 bg-green-100"
                    : status == "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }  rounded-full  p-1 px-2 text-sm`}
              >
                {status}
              </span>
            </td>
            <td className="">
              <Button
                placeholder="Edit"
                styleClass="bg-white text-black border border-gray-500 mr-1 hover:bg-gray-200"
              />
              <Button
                placeholder="Delete"
                styleClass="bg-white text-red-700 border border-gray-500 hover:bg-red-200"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
