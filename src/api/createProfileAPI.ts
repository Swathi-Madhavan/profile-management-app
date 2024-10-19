import axios from "axios";
import { APIResponse, ProfileInformation } from "../model";

export default async function createProfileAPI(payload: ProfileInformation) {
  let apiResponse: APIResponse = {
    errorMessage: "",
    statusCode: 0,
  };

  const response = await axios
    .post(
      `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_PROFILE_URL}`,
      payload
    )
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
