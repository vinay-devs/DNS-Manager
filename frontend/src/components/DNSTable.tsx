import { Button } from "./Button";

export const DNSTable = () => {
  const { domainName, recordType, value, TTL } = {
    domainName: "example.com",
    recordType: "A",
    value: "198.9",
    TTL: 300,
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

            <th className="text-left font-light">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="border-b ">
            <td className="p-4">{domainName} </td>
            <td>{recordType}</td>
            <td>{value}</td>
            <td>{TTL}</td>
            <td className="">
              <Button
                placeholder="Edit"
                styleClass=" border border-gray-500 mr-1 hover:bg-gray-400 hover:text-black"
                onclick={() => {
                  console.log("Edit");
                }}
              />
              <Button
                placeholder="Delete"
                styleClass=" text-red-700 border border-gray-500 hover:bg-red-200 hover:text-black"
                onclick={() => {
                  console.log("Delete");
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
