import { Ionicons } from "@expo/vector-icons";
import { Box, Button, Popover } from "native-base";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export const TimeTableCard = ({ timeTable, active }: any) => {
  const initialFocusRef = React.useRef(null);
  let width: string = active ? "100%" : " 90%";
  return (
    <View
      //   onPress={(e) => {
      //     Alert.alert("Alert");
      //     console.log(e);

      //     return;
      //   }}
      //   activeOpacity={0.9} // Control opacity when pressed
      style={{
        //   backgroundColor: item.color,
        borderRadius: 10,
        elevation: 90,
        //   zIndex: style.left < 61 ? 99 : 5,
      }}
      //@ts-ignore
      className={`${
        active ? "w-[93%] h-36 border-[1px] border-green-500" : "w-[90%] h-32"
      }  flex items-center justify-center flex-row bg-primary px-5 py-4 my-2`}
    >
      <View className=" w-10/12">
        <Text className=" mix-blend-color-dodge text-text text-2xl font-bold">
          {timeTable.title}
        </Text>
        <Text className="font-medium text-text text-lg">{timeTable.desc}</Text>
      </View>
      <Popover
        initialFocusRef={initialFocusRef}
        trigger={(triggerProps) => {
          return (
            <Box className="flex flex-row">
              <Button className=" bg-transparent" {...triggerProps}>
                <Ionicons
                  name="ellipsis-vertical-outline"
                  size={30}
                  color="#fafafa"
                />
              </Button>
            </Box>
          );
        }}
      >
        <Popover.Content backgroundColor="#031430" width="32" marginRight={5}>
          <Popover.Arrow bgColor="#031430" />
          <Popover.CloseButton color="#fff" />
          {/* @ts-ignore */}
          <Popover.Header className="bg-background my-0">
            <Text className="text-text font-bold text-xl">Active</Text>
          </Popover.Header>
          <Popover.Body className="bg-background w-full flex flex-col justify-between">
            <Button colorScheme="green" variant="solid">
              Active
            </Button>{" "}
            <Button colorScheme="lightBlue" variant="solid">
              Edit
            </Button>
          </Popover.Body>
        </Popover.Content>
      </Popover>
    </View>
  );
};
