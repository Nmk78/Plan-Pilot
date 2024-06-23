import React, { useEffect, useReducer, useRef, useState } from "react";
import moment, { duration } from "moment";
import Timetable from "react-native-calendar-timetable"; // Replace with the actual import path
import {
  Alert,
  Animated,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Actionsheet, Box, useDisclose } from "native-base";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface ScheduleProps {
  scheduleGenerateFn: (daySchedule: any, dayIndex: number) => any[];
  weeklySchedule: any;
  daysOfWeek: any;
  subjects: any;
  mode: "view" | "view-edit"
}

const Task = ({ style, item, onOpen, mode, id=1 }: any) => {
  // const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <TouchableOpacity
      onPress={(e) => {
        // Alert.alert("Alert")
        // console.log(e)
        if(mode === "view-edit"){
          onOpen();
        }
        return
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

const Schedule: React.FC<ScheduleProps> = ({
  scheduleGenerateFn,
  weeklySchedule,
  mode
}: ScheduleProps) => {
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

  // const [state, dispatch] = useReducer(scheduleReducer, data );
  // const setDate = (event: DateTimePickerEvent, date: Date) => {
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

  const showTimepicker = (actionSheetMode: React.SetStateAction<string>) => {
    setActionSheetMode(actionSheetMode);
    setShowPicker(true);
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

  const handleEdit = (event: any) => {
    setId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setTimeStart(event.time);
  };

  const handleDelete = (eventId: any) => {
    // dispatch({ type: "DELETE_EVENT", payload: eventId });
  };

  const resetForm = () => {
    setId(null);
    setTitle("");
    setDescription("");
    // setTime( );
  };

  const { isOpen, onOpen, onClose } = useDisclose();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Calculate current time in hours and minutes
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Calculate scroll position based on hourHeight and current time
    const scrollPosition = currentHour * 60 + currentMinute;

    // Scroll to the calculated position
    //@ts-ignore
    scrollViewRef.current?.scrollTo({
      y: (scrollPosition * 80) / 60, // Adjust for hourHeight
      // duration(5000ms),
      animated: true,
    });
  }, [new Date().getHours()]);

  useEffect(() => {
    // @ts-ignore
    const dailyEvents = scheduleGenerateFn(
      weeklySchedule[moment().format("dddd") as keyof typeof weeklySchedule],
      currentDayOfWeek - 1
    );
    setItems(dailyEvents);
  }, [currentDayOfWeek]);

  const fromDate = moment()
    .startOf("day")
    .add(currentDayOfWeek - 1, "days")
    .toDate(); // Start of current day
  const toDate = moment()
    .endOf("day")
    .add(currentDayOfWeek - 1, "days")
    .toDate(); // End of current day

  return (
    <ScrollView
      className="flex-1 max-w-full scroll-mx-0 pb-8 transition-all duration-[5000ms]"
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
    >
      <Timetable
        hourHeight={80}
        // columnWidth={240}
        items={items}
        renderItem={(props: any) => (
          <Task
            {...props}
            mode={mode}
            onOpen={() => {
              onOpen();
            }}
          />
        )}
        // fromHour={0} // Start hour for the timetable
        // toHour={18}   // End hour for the timetable
        range={{ from: fromDate, till: toDate }} // Range from Monday to Friday of current week
        is12Hour={true}
        style={{
          container: {
            width: width - 35,
            paddingBottom: 40,
            paddingTop: 40,
            backgroundColor: "#031430"
          },
          nowLine: {
            dot: {
              width: 10,
              height: 10,
              backgroundColor: "#fefefe",
              borderRadius: 5,
              zIndex: 90,
              elevation: 5,
            },
            line: {
              height: 1,
              backgroundColor: "#fefefe",
              zIndex: -100,
              elevation: 5,
            },
          },
          time: {
            color: "#fefefe",
            fontSize: 16,
            fontWeight: 700,
          },
          timeContainer: { backgroundColor: "#031430" },
        }}
      />
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
  );
};

export default Schedule;
