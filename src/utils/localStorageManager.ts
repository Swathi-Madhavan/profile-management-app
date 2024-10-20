import { ProfileInformation } from "../model";

export function updateLocalStorageData(key: string, data: string) {
  localStorage.setItem(key, data);
}

export function getLocalStorageData(key: string) {
  return localStorage.getItem(key);
}

export function syncProfileInfoInLocalStorage(
  profileData: ProfileInformation,
  isUpdate?: boolean
) {
  const localData: Array<ProfileInformation> =
    JSON.parse(getLocalStorageData("profilesData") ?? "[]") ??
    ([] as Array<ProfileInformation>);

  if (isUpdate) {
    const matchedIndex = localData?.findIndex(
      (row) => row.id === profileData?.id
    );
    if (matchedIndex >= 0) {
      localData.splice(matchedIndex, 0, profileData);
    } else {
      localData.push(profileData);
    }
  } else {
    localData.push(profileData);
  }
  updateLocalStorageData("profilesData", JSON.stringify(localData ?? []));
}
