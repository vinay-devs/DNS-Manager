import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useUserActions = () => {
  const URL = "https://dns-manager-1-lerl.onrender.com";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      toast.error("Please login to continue");
    }
  }, [token]);

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/api/v1/user/signup`, {
        name,
        email,
        password,
      });
      navigate("/signin");
      toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/api/v1/user/signin`, {
        email,
        password,
      });

      toast.success(response?.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  const addCredentials = async (accessKey: string, secretKey: string) => {
    try {
      const response = await axios.post(`${URL}/api/v1/user/credentials`, {
        accessKey,
        secretKey,
      });
      toast.success(response.data.message);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }

      return false;
    }
  };

  return {
    signup,
    signin,
    addCredentials,
  };
};

export default useUserActions;
