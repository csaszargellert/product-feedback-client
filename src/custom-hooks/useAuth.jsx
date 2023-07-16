import { userContext } from "../context/userContext";
import { useContext } from "react";

const useAuth = function () {
  return useContext(userContext);
};

export default useAuth;
