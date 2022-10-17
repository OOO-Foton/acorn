import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (storage_Key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storage_Key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (storage_Key) => {
  try {
    const value = await AsyncStorage.getItem(storage_Key);
    if (value !== null) {
      return value.split(`"`)[1];
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log(e);
  }
};

export { storeData, getData, removeItemValue };
