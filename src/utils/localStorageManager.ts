export function updateLocalStorageData(key: string, data: string) {
  localStorage.setItem(key, data);
}

export function getLocalStorageData(key: string) {
  return localStorage.getItem(key);
}
