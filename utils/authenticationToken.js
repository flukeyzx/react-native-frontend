import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp > currentTime) {
        return token;
      } else {
        await removeToken();
        return null;
      }
    }
  } catch (error) {
    console.error(`Error in getToken function. ${error.message}`);
  }
};

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error(`Error in setToken function. ${error.message}`);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error(`Error in removeToken function. ${error.message}`);
  }
};
