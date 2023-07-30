import { Text, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

type IconButtonType = {
  icon: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number;
};

const IconButton = ({ icon, text }: IconButtonType) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <EvilIcons name={icon} size={22} color={"gray"} />
      <Text style={{ fontSize: 12, color: "gray" }}>{text}</Text>
    </View>
  );
};

export default IconButton;
