import { Alert, Modal,Button as BTN, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useReducer, useState } from "react";
import { TimelineComponent } from "@/components/Timeline";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Popover,Button, Box, useDisclose, Actionsheet } from "native-base";
import { mode } from "native-base/lib/typescript/theme/tools";
import DateTimePicker  from "@react-native-community/datetimepicker";

const Tables = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeStart, setTimeStart] = useState<Date>();
  const [timeEnd, setTimeEnd] = useState<Date>();
  const [id, setId] = useState(null);
  const [mode, setMode] = useState("start"); // Track current mode
  const [showPicker, setShowPicker] = useState(false);

  const initialFocusRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclose();

  function scheduleReducer(state: any, action: any) {
    switch (action.type) {
      case "ADD_EVENT":
        return [...state, action.payload];
      case "UPDATE_EVENT":
        return state.map((event: { id: any }) =>
          event.id === action.payload.id ? action.payload : event
        );
      case "DELETE_EVENT":
        return state.filter(
          (event: { id: any }) => event.id !== action.payload
        );
      default:
        return state;
    }
  }

  // const [state, dispatch] = useReducer(scheduleReducer, data);
  const onTimeChange = (
    event: any,
    selectedDate: React.SetStateAction<Date | undefined>
  ) => {
    if (selectedDate) {
      if (mode === "start") {
        setTimeStart(selectedDate);
      } else {
        setTimeEnd(selectedDate);
      }
    }
    setShowPicker(false);
  };

  const showTimepicker = (mode: React.SetStateAction<string>) => {
    setMode(mode);
    setShowPicker(true);
  };

  const handleAddOrUpdate = () => {
    const newEvent = {
      id: id || Math.random().toString(36).substr(2, 9),
      title,
      description,
      timeStart,
      lineColor: "#12da",
      // icon: require("./assets/images/splash.png"),
    };
    if (id) {
      // dispatch({ type: "UPDATE_EVENT", payload: newEvent });
    } else {
      // dispatch({ type: "ADD_EVENT", payload: newEvent });
    }
    resetForm();
  };

  const handleEdit = (event: any) => {
    setId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setTimeStart(event.time);
  };

  // const handleDelete = (eventId: any) => {
  //   dispatch({ type: "DELETE_EVENT", payload: eventId });
  // };

  const resetForm = () => {
    setId(null);
    setTitle("");
    setDescription("");
    // setTime( );
  };


  return (
    <SafeAreaView className="bg-background flex flex-1 px-3">
      <Box w="100%" className="flex items-end my-3">
        <Popover
          initialFocusRef={initialFocusRef}
          trigger={(triggerProps) => {
            return (
              <Box className="flex flex-row">
                <Button
                  className=" bg-transparent"
                  onPress={() => {
                    onOpen();
                  }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={40}
                    color="#fafafa"
                    className=""
                  />
                </Button>
                <Button className=" bg-transparent" {...triggerProps}>
                  <Ionicons
                    name="ellipsis-vertical-outline"
                    size={40}
                    color="#fafafa"
                    className="my-2"
                  />
                </Button>
              </Box>
            );
          }}
        >
          <Popover.Content backgroundColor="#031430" width="56">
            <Popover.Arrow bgColor="#031430" />
            <Popover.CloseButton color="#fff" />
            {/* @ts-ignore */}
            <Popover.Header className="bg-background">
              <Text className="text-text font-bold text-xl">Share</Text>
            </Popover.Header>
            <Popover.Body className="bg-background w-full flex flex-row justify-between">
              <Text className="font-semibold text-lg text-text">
                Code - 122-597
              </Text>
              <Ionicons name="copy-outline" size={25} color="#f1f1f1" />{" "}
            </Popover.Body>{" "}
            <Popover.Header className="bg-background my-0">
              <Text className="text-text font-bold text-xl">Share</Text>
            </Popover.Header>
            <Popover.Body className="bg-background w-full flex flex-row justify-between">
              <Text className="font-semibold text-lg text-text">
                Code - 122-597
              </Text>
              <Ionicons name="copy-outline" size={25} color="#f1f1f1" />{" "}
            </Popover.Body>
            <Popover.Footer className="bg-background" justifyContent="flex-end">
              <Button.Group space={2}>
                <Button colorScheme="coolGray" variant="ghost">
                  Cancel
                </Button>
                <Button colorScheme="danger">Delete</Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>
      </Box>

      {/* <View className="flex items-end my-3 mx-2">
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons
            size={32}
            color="#e7eafd"
            name="ellipsis-vertical-outline"
          />
        </Pressable>
      </View> */}
      <View>
        <Text className=" text-3xl font-medium text-text overflow-ellipsis mb-2 ">
          Dummy Time Table
        </Text>
      </View>
      <TimelineComponent />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content backgroundColor="#031430">
            <Box
              className="gap-y-3 pb-5 focus:pb-80"
              w="100%"
              px={4}
              justifyContent="center"
            >
              <Text className="text-text font-bold text-xl ">Edit</Text>
              <TextInput
                placeholder="Title"
                value={title}
                placeholderTextColor="#fafafa"
                onChangeText={setTitle}
                className="border border-gray-300 p-2 mb-2 rounded"
              />
              <TextInput
                placeholder="Description"
                value={description}
                placeholderTextColor="#fafafa"
                onChangeText={setDescription}
                className="border border-gray-300 p-2 mb-2 rounded"
              />
              <Box className="flex flex-row justify-between mb-6 gap-x-6">
                {showPicker && (
                  <DateTimePicker
                    value={
                      mode === "start"
                        ? timeStart || new Date()
                        : timeEnd || new Date()
                    }
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={onTimeChange}
                  />
                )}
                <TouchableOpacity
                  className="bg-blue-500 p-2 rounded flex-1"
                  onPress={() => showTimepicker("start")}
                >
                  <Text className="text-white text-center">
                    {timeStart
                      ? "Started: " + timeStart.toLocaleTimeString()
                      : "Start Time"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-blue-500 p-2 rounded flex-1"
                  onPress={() => showTimepicker("end")}
                >
                  <Text className="text-white text-center">
                    {timeEnd
                      ? "Ended: " + timeEnd.toLocaleTimeString()
                      : "End Time"}
                  </Text>
                </TouchableOpacity>
              </Box>
              <Box marginTop={40} className="mt-20">
                <BTN
                  // marginVertical: true/,
                  title={id ? "Update Event" : "Add Event"}
                  onPress={handleAddOrUpdate}
                  // className='bg-blue-500 text-white p-2 rounded mb-4'
                />
              </Box>
            </Box>
          </Actionsheet.Content>
          {/* </KeyboardAvoidingView> */}
        </Actionsheet>
    </SafeAreaView>
  );
};

export default Tables;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
