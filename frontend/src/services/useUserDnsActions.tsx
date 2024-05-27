import { useState } from "react";
import axios from "axios";

const useUserDnsActions = () => {
  const [hostedId, setHostedId] = useState(null);
  const [recordset, setRecordset] = useState([]);

  const getHostedId = async () => {
    try {
      const response = await axios.get("/api/hostedId");
      setHostedId(response.data.hostedId);
    } catch (error) {
      console.error("Error getting hostedId:", error);
    }
  };

  const getRecordset = async () => {
    try {
      const response = await axios.get("/api/recordset");
      setRecordset(response.data.recordset);
    } catch (error) {
      console.error("Error getting recordset:", error);
    }
  };

  const postRecordset = async (recordsetData) => {
    try {
      const response = await axios.post("/api/recordset", recordsetData);
      // Handle the response as needed
    } catch (error) {
      console.error("Error posting recordset:", error);
    }
  };

  return {
    hostedId,
    recordset,
    getHostedId,
    getRecordset,
    postRecordset,
  };
};

export default useUserDnsActions;
