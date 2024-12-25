import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log(
          "error caught from our very own axios interceptor-->",
          error.response
        );
        if (error.response.status === 401 || error.response.status === 403) {
          // logout
          handleLogout();
          // navigate to login
          navigate("/login");
        }
      }
    );
  }, [handleLogout, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
