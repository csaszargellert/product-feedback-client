import { axiosBase } from "./axios";

export const refresh = async function () {
  const response = await axiosBase({
    url: "/refresh-token",
    method: "GET",
  });
  return response.data.jwt;
};
