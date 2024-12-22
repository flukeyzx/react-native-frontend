import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalState } from "./context/auth.context";

import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GlobalState>
      <SafeAreaView className="flex-1 bg-purple-500">
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Home"}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GlobalState>
  );
};

export default App;
