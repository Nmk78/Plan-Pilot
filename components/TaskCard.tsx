import { useDisclose } from "native-base";
import { Text, TouchableOpacity } from "react-native";

export const Task = ({ style, item, onOpen, setTask, mode }: any) => {
  
    return (
      <TouchableOpacity
        onPress={(e) => {
          // Alert.alert("Alert")
          if (mode === "view-edit") {
            setTask(item)
            onOpen();
          }
          return;
        }}
        activeOpacity={0.9} // Control opacity when pressed
        style={{
          ...style,
          left: style.left > 61 ? style.left - 70 : style.left - 10,
          backgroundColor: item.color,
          // width: style.width ,
          width: "auto",
          borderRadius: 10,
          elevation: 90,
          zIndex: style.left < 61 ? 99 : 5,
        }}
        className="flex flex-shrink flex-col mr-2 px-5 items-center justify-center"
      >
        <Text className=" mix-blend-color-dodge font-semibold">{item.title}</Text>
        <Text>{item.teacher}</Text>
        <Text>{item.room}</Text>

      </TouchableOpacity>
    );
  };