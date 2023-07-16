import { useState, useCallback } from "react";
import axiosDef from "../utils/axios";

function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async function (url, method, dataToBeSent) {
    setLoading(true);
    try {
      const resData = await axiosDef({
        method,
        url,
        data: dataToBeSent,
      });
      console.log(resData);
      setError(null);
      setData(resData.data.data);
    } catch (error) {
      console.error(error);
      setError(error.response.data.data);
      return error.response.data.data;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchData, loading, error, data };
}

export default useFetch;
