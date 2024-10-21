import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import Toast from "react-native-toast-message";
import { CommonActions } from "@react-navigation/native";

import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import { getToken, removeToken } from "./utils/authenticationToken";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

axios.defaults.baseURL = "http://192.168.100.14:3000/api";
axios.defaults.withCredentials = true;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  const checkAuthentication = async () => {
    try {
      const token = await getToken();

      if (token) {
        const response = await axios.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          await removeToken();
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error verifying token", error);
      setIsAuthenticated(false);
      await removeToken();
    } finally {
      setIsLoadingToken(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const logoutHandler = async (navigation) => {
    try {
      await removeToken();
      setIsAuthenticated(false);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Signin" }],
        })
      );
    } catch (error) {
      console.error(`${error.message}`);
    }
  };

  if (isLoadingToken) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1 bg-purple-500">
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? "Home" : "Signin"}
          >
            <Stack.Screen
              name="Home"
              options={{
                headerShown: false,
              }}
            >
              {({ navigation }) => (
                <Home logoutUser={() => logoutHandler(navigation)} />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      <Toast />
    </QueryClientProvider>
  );
};

export default App;
