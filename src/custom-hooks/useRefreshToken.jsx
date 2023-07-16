import useAuth from "./useAuth";
import axios from "../utils/axios";

function useRefreshToken() {
  const { setAccessToken } = useAuth();

  const refresh = async function () {
    const response = await axios({
      url: "/refresh-token",
      method: "get",
      withCredentials: true,
    });

    console.log(response);
  };

  return refresh;
}

export default useRefreshToken;
