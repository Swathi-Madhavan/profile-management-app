import { Dispatch, SetStateAction, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getLocalStorageData } from "../utils/localStorageManager";
import { APIResponse, ProfileInformation } from "../model";
import { useFormContext } from "react-hook-form";
import { getProfileIdAPI } from "../api/getProfilesAPI";
import { ProfileManagementContext } from "../App";

interface FetchProfileHookProps {
  handleUpdatedForm: (apiResponse: APIResponse) => void;
  setOpenProfileNotfoundDialog: Dispatch<SetStateAction<boolean>>;
}

export default function useFetchProfile({
  handleUpdatedForm,
  setOpenProfileNotfoundDialog,
}: Readonly<FetchProfileHookProps>) {
  let [searchParams] = useSearchParams();
  const selectedProfileId = useMemo(
    () => searchParams.get("profileId") ?? "",
    [searchParams]
  );
  const { reset } = useFormContext<ProfileInformation>();

  const { setProfileMgContext } = useContext(ProfileManagementContext);

  useMemo(async () => {
    if (selectedProfileId) {
      const localData: Array<ProfileInformation> =
        JSON.parse(getLocalStorageData("profilesData") ?? "[]") ??
        ([] as Array<ProfileInformation>);

      const matchedIndex = localData?.findIndex(
        (row) => row?.id === selectedProfileId
      );

      if (matchedIndex >= 0) {
        const matchProfileData = { ...localData[matchedIndex] };
        reset(matchProfileData);
        if (setProfileMgContext) {
          setProfileMgContext({
            profileId: matchProfileData?.id,
            userName: matchProfileData?.name,
            searchParamsProfileId: selectedProfileId,
          });
        }
        handleUpdatedForm({
          errorMessage: "",
          statusCode: 200,
        });
        setTimeout(() => {
          handleUpdatedForm({
            errorMessage: "",
            statusCode: 0,
          });
        }, 1000);
      } else {
        const { apiResponse, response } = await getProfileIdAPI(
          selectedProfileId
        );

        if (setProfileMgContext && apiResponse?.statusCode === 200) {
          setProfileMgContext({
            profileId: response?.id,
            userName: response?.name,
            searchParamsProfileId: selectedProfileId,
          });
          reset(response);
        } else {
          setOpenProfileNotfoundDialog(true);
        }
        handleUpdatedForm({
          errorMessage: apiResponse?.errorMessage ?? "",
          statusCode: apiResponse?.statusCode,
        });
        setTimeout(() => {
          handleUpdatedForm({
            errorMessage: "",
            statusCode: 0,
          });
        }, 5000);
      }
    }
  }, [
    handleUpdatedForm,
    reset,
    selectedProfileId,
    setOpenProfileNotfoundDialog,
    setProfileMgContext,
  ]);

  return useMemo(() => ({ selectedProfileId }), [selectedProfileId]);
}
