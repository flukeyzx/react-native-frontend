import { View, Text } from "react-native";
import useAuth from "../context/auth.context";

const Home = () => {
  const { user } = useAuth();
  return (
    <View>
      <Text className="bg-red-500">Hello {user.name}</Text>
    </View>
  );
};

export default Home;
