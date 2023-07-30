import { Link, useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

const user = {
  id: "u1",
  username: "VadimNotJustDev",
  name: "Vadim",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png",
};
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTweetApi } from "../lib/api/tweets";

export default function NewTweet() {
  const [text, setText] = useState("");
  const router = useRouter();
  const { createTweet } = useTweetApi();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {
      queryClient.setQueriesData(["tweets"], (existingTweets) => [
        data,
        ...existingTweets,
      ]);
    },
  });

  const onTweetPress = async () => {
    try {
      await mutateAsync({ content: text });
      setText("");
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Link href={"../"} style={{ fontSize: 24 }}>
          Cancel
        </Link>
        {isLoading && <ActivityIndicator />}
        <Pressable onPress={onTweetPress} style={styles.button}>
          <Text style={styles.buttonText}>Tweet</Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <Image source={{ uri: user.image }} style={styles.image} />
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="What's happening?"
          multiline
          numberOfLines={5}
          style={{ flex: 1 }}
        />
      </View>
      {isError && <Text>{`${error}`}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1C98F0",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 10,
  },
});
