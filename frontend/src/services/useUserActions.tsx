import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useUserActions = () => {
  const [user, setUser] = useState(null);
  const URL = "http://localhost:5001";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    toast.error("Please login to continue");
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/api/v1/user/signup`, {
        name,
        email,
        password,
      });
      navigate("/signin");
      toast.success(response.data.message);
      setUser(response.data.user);
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
      setUser(response.data.user);
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
    user,
    signup,
    signin,
    addCredentials,
  };
};

export default useUserActions;
