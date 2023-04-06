import * as SecureStore from 'expo-secure-store';

export async function handleSaveToSecureStore<T>(key: string, storedData: T) {
  try {
    await SecureStore.setItemAsync(key, await JSON.stringify(storedData));
    return true;
  } catch (e) {
    return false;
  }
}

export async function handleRestoreDataFromSecureStore<T>(key: string) {
  try {
    const data = await SecureStore.getItemAsync(key);
    if (!data) return false;
    return await JSON.parse(data);
  } catch (e) {
    return false;
  }
}
