import axios from "axios";
import { APIResponse, ProfileInformation } from "../model";
import { syncProfileInfoInLocalStorage } from "../utils/localStorageManager";

export default async function createProfileAPI(
  payload: ProfileInformation,
  profileId?: string
) {
  let apiResponse: APIResponse = {
    errorMessage: "",
    statusCode: 0,
  };

  const response = !profileId
    ? await axios
        .post(`/${process.env.REACT_APP_PROFILE_URL}`, payload, {
          method: "POST",
          baseURL: process.env.REACT_APP_API_URL,
        })
        .then((res) => {
          apiResponse = {
            errorMessage: "",
            statusCode: res.status,
          };
          syncProfileInfoInLocalStorage(res?.data, false);
          return res;
        })
        .catch((e) => {
          apiResponse = {
            errorMessage: e?.message,
            statusCode: e?.status,
          };
          return undefined;
        })
    : await axios
        .put(`/${process.env.REACT_APP_PROFILE_URL}/${payload?.id}`, payload, {
          method: "PUT",
          baseURL: process.env.REACT_APP_API_URL,
        })
        .then((res) => {
          apiResponse = {
            errorMessage: "",
            statusCode: res.status,
          };
          syncProfileInfoInLocalStorage(res?.data, true);
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
