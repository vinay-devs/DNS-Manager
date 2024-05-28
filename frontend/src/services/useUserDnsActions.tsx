import { Route53Record } from "@vinaydevs/common-dnsmanager";
import axios from "axios";
import { toast } from "react-toastify";
const useUserDnsActions = () => {
  const URL = "http://localhost:5001";
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  const getHostedId = async () => {
    try {
      const response = await axios.get(URL + "/api/v1/dns/list-hosted-zone");
      return response.data.HostedZones;
      // setHostedId(response.data.hostedId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
        return false;
      } else {
        toast.error("Internal server error");
      }
    }
  };

  const getRecordset = async (hostedId: string) => {
    try {
      const response = await axios.get(
        URL + `/api/v1/dns/list-resource-record/${hostedId}`
      );
      return response.data;
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const postRecordset = async (
    recordsetData: Route53Record,
    hostedZoneId: string,
    operation: string
  ) => {
    try {
      const response = await axios.post(URL + "/api/v1/dns/record-set", {
        recordSet: recordsetData,
        hostedZoneId,
        operation,
      });
      console.log(response);
      toast.success(response.data.message);
      // Handle the response as needed
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return {
    getHostedId,
    getRecordset,
    postRecordset,
  };
};

export default useUserDnsActions;
