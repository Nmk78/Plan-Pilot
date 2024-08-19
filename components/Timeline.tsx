import React, { useReducer, useState } from "react";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import {
  daysOfWeek,
  generateDailySchedule,
  subjects,
  weeklySchedule,
} from "@/constants/Constants";
import TimeTable from "./TimeTable";
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
        <TimeTable
          TimeTableGenerateFn={generateDailySchedule(weeklySchedule)}
          weeklyTimeTable={weeklySchedule}
          daysOfWeek={daysOfWeek}
          subjects={subjects}
          mode="view-edit"
        />
      </GestureHandlerRootView>
    </>
  );
};