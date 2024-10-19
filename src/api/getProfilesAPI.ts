import axios from "axios";
import { APIResponse } from "../model";

export default async function getProfilesAPI() {
  let apiResponse: APIResponse = {
    errorMessage: "",
    statusCode: 0,
  };

  const response = await axios
    .get(`/${process.env.REACT_APP_PROFILE_URL}`, {
      baseURL: process.env.REACT_APP_API_URL,
    })
    .then((res) => {
      apiResponse = {
        errorMessage: "",
        statusCode: res.status,
      };
      return res;
    })
    .catch((e) => {
      apiResponse = {
        errorMessage: e?.message,
        statusCode: e?.status,
      };
      return undefined;
    });

  return { response: response?.data, apiResponse };
}
