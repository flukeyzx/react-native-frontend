import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Home = () => {
  return (
    <View>
      <View className="flex-row justify-between items-center px-8 py-3">
        <Text className="text-2xl font-bold">Logo...</Text>
        <TouchableOpacity
          underlayColor="lightgray"
          style={{ borderRadius: 50, padding: 12 }}
        >
          <Icon name="bell" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      <View className="h-52 mx-4 flex-row justify-between p-4 bg-purple-400 rounded-2xl">
        <Text>Your total expense</Text>
        <View>
          <Text>Logo</Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
