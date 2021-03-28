import AsyncStorage from '@react-native-async-storage/async-storage';
export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (e) {
    console.log(e);
  }
};

export const setAccessToken = async (value) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    console.log(e);
  }
};

export const getStorageObjectData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const setStorageObjectData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};
