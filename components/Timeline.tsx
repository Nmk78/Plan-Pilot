import React, { useReducer, useState } from "react";
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { Actionsheet, Box, Input, Text, useDisclose } from "native-base";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Schedule from "./TimeTable";
import {
  daysOfWeek,
  generateDailySchedule,
  subjects,
  weeklySchedule,
} from "@/constants/Constants";
export const TimelineComponent = () => {


  const parseTimeStringToDate = (timeString: any) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0); // Set hours, minutes, and reset seconds and milliseconds
    return now;
  };

  return (
    <>
      <GestureHandlerRootView className="mb-0 h-auto flex flex-1 items-center bg-background" >
        <Schedule
          scheduleGenerateFn={generateDailySchedule(weeklySchedule)}
          weeklySchedule={weeklySchedule}
          daysOfWeek={daysOfWeek}
          subjects={subjects}
          mode="view-edit"
        />
      </GestureHandlerRootView>
    </>
  );
};