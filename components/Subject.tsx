import { getAccentColor, getComplementaryColor } from "@/constants/Constants";
import { Text, TouchableOpacity, View } from "react-native";

export const SubjectCard = ({ item, onOpen, id = 1 }: any) => {
  // const { isOpen, onOpen, onClose } = useDisclose();
  let accent = getAccentColor(item.color);
  let complementColor = getComplementaryColor(item.color);
  console.log("🚀 ~ SubjectCard ~ accent:", accent);
  return (
    <TouchableOpacity
      onPress={(e) => {
        onOpen();
        return;
      }}
      activeOpacity={0.9} // Control opacity when pressed
      style={{
        backgroundColor: item.color,
        // width: "85%",
        height: 120,
        marginVertical: 3,
        borderRadius: 10,
        elevation: 90,
      }}
      className="w-[85%] flex flex-row mr-2 px-5 justify-start items-center"
    >
      {/* //@ts-ignore */}
      <View
        style={{
          backgroundColor: accent,
        }}
        className=" w-2/6 h-5/6 flex items-center justify-center rounded-lg"
      >
        <Text className=" text-6xl font-semibold">{item.icon}</Text>
      </View>
      <View className="w-3/5 ml-3">
        <Text style={{
            color: complementColor
        }} className=" font-bold text-2xl">{item.title}</Text>
        <Text className="font-semibold text-xl">{item.teacher}</Text>
        <Text>{item.room}</Text>
      </View>
    </TouchableOpacity>
  );
};