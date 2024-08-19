import { Button, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Actionsheet, Box, useDisclose } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
const CURD_Tasks = ({isOpen, onClose, task}:any) => {
    
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");
    const [timeStart, setTimeStart] = useState<Date>();
    const [timeEnd, setTimeEnd] = useState<Date>();
    const [id, setId] = useState(null);
    const [actionSheetMode, setActionSheetMode] = useState("start"); // Track current actionSheetMode
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
      if (task) {
        console.log("Filling Form...");
        console.log("Title", task.title);
        setId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setTimeStart(task.timeStart);
        setTimeEnd(task.timeEnd);
        setIcon(task.icon || "science");
      }
    }, [task]);
    

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
          className="border border-gray-300 text-gray-100 p-2 mb-2 rounded"
        />
        <TextInput
          placeholder="Description"
          value={description}
          placeholderTextColor="#fafafa"
          onChangeText={setDescription}
          className="border border-gray-300 text-gray-10 p-2 mb-2 rounded"
        />

        <Box className="flex flex-row justify-between mb-6 gap-x-6">

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
            title={id ? "Update Event" : "Add Event"}
            onPress={handleAddOrUpdate}
          />
        </Box>
      </Box>
    </Actionsheet.Content>
  </Actionsheet>
  )
}

export default CURD_Tasks

const styles = StyleSheet.create({})