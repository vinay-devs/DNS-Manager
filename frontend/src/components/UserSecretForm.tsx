import { useState } from "react";
import { Button } from "./Button";

export const UserSecretForm = () => {
  const [accessKey, setAccessKey] = useState({
    accessKey: "Ikdfalskdfsadlf",
    secretKey: "lfdskajfoisdafke",
  });
  return (
    <div className="flex flex-col">
      <input
        className="p-2 border bg-white m-2 rounded"
        type="text"
        placeholder={accessKey.accessKey}
        disabled
      />
      <input
        className="p-2 border bg-white m-2 rounded"
        type="text"
        placeholder={accessKey.secretKey}
        disabled
      />
      <div className="flex justify-end">
        <Button placeholder="Update" styleClass="" />
      </div>
    </div>
  );
};
