import React, { useEffect, useReducer, useRef, useState } from "react";
import moment, { duration } from "moment";
import Timetable from "react-native-calendar-timetable"; // Replace with the actual import path
import {
  Button,
  Modal,
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
import IconSelector from "./IconSelector";
import { Task } from "./TaskCard";
import CURD_Tasks from "./CURD_Tasks";

interface TimeTableProps {
  TimeTableGenerateFn: (dayTimeTable: any, dayIndex: number) => any[];
  weeklyTimeTable: any;
  daysOfWeek: any;
  subjects: any;
  mode: "view" | "view-edit";
}

const TimeTable: React.FC<TimeTableProps> = ({
  TimeTableGenerateFn,
  weeklyTimeTable,
  mode,
}: TimeTableProps) => {
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
  const [icon, setIcon] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [task, setTask] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

useEffect(() => {
  if (hasMounted) {
    onOpen();
  } else {
    setHasMounted(true);
  }
}, [task]);

  function TimeTableReducer(state: any, action: any) {
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

  //TODO: Here is dispatch function
  // const [state, dispatch] = useReducer(TimeTableReducer, data );
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
    const dailyEvents = TimeTableGenerateFn(
      weeklyTimeTable[moment().format("dddd") as keyof typeof weeklyTimeTable],
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
            setTask={setTask}
            onOpen={() => {
              onOpen()
            }}
          />
        )}
        range={{ from: fromDate, till: toDate }} // Range from Monday to Friday of current week
        is12Hour={true}
        style={{
          container: {
            width: width - 35,
            paddingBottom: 40,
            paddingTop: 40,
            backgroundColor: "#031430",
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
      <CURD_Tasks isOpen={isOpen} task={task} onClose={onClose} />
    </ScrollView>
  );
};

export default TimeTable;
