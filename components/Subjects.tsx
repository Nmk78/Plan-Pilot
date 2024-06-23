import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { TimeTableCard } from "./TimeTableCard";
import { subjects } from "@/constants/Constants";
import { SubjectCard } from "./Subject";
import { Actionsheet, Box, useDisclose } from "native-base";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

const Subjects = () => {
    const { isOpen, onOpen, onClose } = useDisclose();

    const [items, setItems] = useState<any>([]);
    const currentDayOfWeek = moment().isoWeekday(); // Get current day of the week (1 = Monday, ..., 7 = Sunday)
    const { width, height } = useWindowDimensions(); // Get screen width
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timeStart, setTimeStart] = useState<Date>();
    const [timeEnd, setTimeEnd] = useState<Date>();
    const [id, setId] = useState(null);
    const [actionSheetMode, setActionSheetMode] = useState("start"); // Track current actionSheetMode
    const [showPicker, setShowPicker] = useState(false);

    const resetForm = () => {
        setId(null);
        setTitle("");
        setDescription("");
        // setTime( );
      };
    const showTimepicker = (actionSheetMode: React.SetStateAction<string>) => {
        setActionSheetMode(actionSheetMode);
        setShowPicker(true);
      };

      const onTimeChange = (
        event: any,
        selectedDate: React.SetStateAction<Date | undefined>
      ) => {
        if (selectedDate) {
          if (actionSheetMode === "start") {
            setTimeStart(selectedDate);
          } else {
            setTimeEnd(selectedDate);
          }
        }
        setShowPicker(false);
      };

      const handleAddOrUpdate = () => {
        const newEvent = {
          id: id || Math.random().toString(36).substr(2, 9),
          title,
          description,
          timeStart,
          lineColor: "#12da",
          icon: require("../assets/images/splash.png"),
        };
        if (id) {
          // dispatch({ type: "UPDATE_EVENT", payload: newEvent });
        } else {
          // dispatch({ type: "ADD_EVENT", payload: newEvent });
        }
        resetForm();
      };
  return (
    <>
      <ScrollView
        className="bg-background flex-1"
        contentContainerStyle={styles.contentContainer}
      >
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} item={subject} onOpen={onOpen} />
        ))}
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
            {/* <TextInput
          placeholder="Time"
          placeholderTextColor="#fafafa"
          value={time}
          onChangeText={setTime}
          className="border border-gray-300 p-2 mb-4 rounded"
        // /> */}
            {/* <Text className="text-text font-semibold mb-4">
                selected: {time.toLocaleString()}
              </Text> */}

            <Box className="flex flex-row justify-between mb-6 gap-x-6">
              {/* <Button
                  onPress={showTimepicker}
                  title={timeStart ? timeStart.toLocaleString() : "Started"}
                />
                <Button
                  onPress={showTimepicker}
                  title={timeEnd ? timeEnd.toLocaleString() : "End"}
                /> */}

              {showPicker && (
                <DateTimePicker
                  value={
                    actionSheetMode === "start"
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
              <Button
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
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#background", // Replace with your actual background color
  },
  contentContainer: {
    alignItems: "center",
  },
});
export default Subjects;
