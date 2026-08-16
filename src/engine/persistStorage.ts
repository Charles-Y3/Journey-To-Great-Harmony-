/** Asks the browser not to auto-evict this origin's storage under disk pressure. No-ops harmlessly where unsupported (e.g. Safari). */
export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage?.persist) return false;
  try {
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}
