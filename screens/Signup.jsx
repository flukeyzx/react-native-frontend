import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { Link } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Toast from "react-native-toast-message";
import { setToken } from "../utils/authenticationToken";

const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: async ({ name, email, password }) => {
      try {
        const response = await axios.post("/auth/signup", {
          name,
          email,
          password,
        });

        const data = await response.data;

        if (!data.success) {
          throw new Error(data.message || "Something went wrong.");
        }

        return data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Error while sending signup request."
        );
      }
    },
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: "Account registered successfully.",
        text1Style: { fontSize: 16 },
      });
      await setToken(token);
      navigation.navigate("Home");
    },
  });

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-4xl font-bold text-purple-400">Sign up</Text>
      <View className="w-96 px-6 py-4 gap-4">
        <TextInput
          label="Name"
          mode="outlined"
          placeholder="e.g John doe"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Email"
          mode="outlined"
          placeholder="johndoe@email.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Password"
          mode="outlined"
          placeholder="create your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!isPasswordShown}
          right={
            <TextInput.Icon
              icon={isPasswordShown ? "eye-off" : "eye"}
              onPress={() => setIsPasswordShown((prev) => !prev)}
            />
          }
        />
        <View className="pl-1">
          <Link to={"/Signin"}>
            <Text className="font-bold text-purple-600 underline">
              Already have an account? Signin
            </Text>
          </Link>
        </View>
        {isError && (
          <View>
            <Text className="text-red-500 text-center">
              {error?.message || "Something went wrong."}
            </Text>
          </View>
        )}
        <Button
          onPress={() => mutate({ name, email, password })}
          disabled={isPending}
          className="bg-purple-400 py-1 rounded-lg active:bg-purple-300"
        >
          <Text className="text-white text-lg font-bold">
            {isPending ? "Signingup..." : "Signup"}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Signup;
