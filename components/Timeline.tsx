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
  const data = [
    {
      // time:parseTimeStringToDate("9:00"),
      time: "8:00",
      // endTime: "9:00",
      title: "Archery Training",
      description:
        "The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course.",
      lineColor: "#12da",
      // icon: require('../img/archery.png'),
    },
    {
      time: "10:45",
      title: "Play Badminton",
      description:
        "Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.",
      icon: require("../assets/flags/thai.svg"),
    },
    { time: "12:00", title: "Lunch" },
    {
      time: "14:00",
      title: "Watch Soccer",
      description:
        "Team sport played between two teams of eleven players with a spherical ball.",
      lineColor: "#f00",
      icon: (
        <Image
          source={require("@/assets/flags/thai.svg")}
          style={{
            width: 90,
            height: 90,
            borderRadius: 30,
          }}
          resizeMode="cover"
        />
      ),
    },
    {
      time: "16:30",
      title: "Go to Fitness center",
      description: "Look out for the Best Gym & Fitness Centers around me :)",
      icon: require("../assets/images/partial-react-logo.png"),
    },
    {
      time: "14:00",
      title: "Watch Soccer",
      description:
        "Team sport played between two teams of eleven players with a spherical ball.",
      lineColor: "#f00",
      icon: (
        <Image
          source={require("@/assets/flags/thai.svg")}
          style={{
            width: 90,
            height: 90,
            borderRadius: 30,
          }}
          resizeMode="cover"
        />
      ),
    },
    {
      time: "16:30",
      title: "Go to Fitness center",
      description: "Look out for the Best Gym & Fitness Centers around me :)",
      icon: require("../assets/images/partial-react-logo.png"),
    },
    {
      time: "14:00",
      title: "Watch Soccer",
      description:
        "Team sport played between two teams of eleven players with a spherical ball.",
      lineColor: "#f00",
      icon: (
        <Image
          source={require("@/assets/flags/thai.svg")}
          style={{
            width: 90,
            height: 90,
            borderRadius: 30,
          }}
          resizeMode="cover"
        />
      ),
    },
    {
      time: "16:30",
      title: "Go to Fitness center",
      description: "Look out for the Best Gym & Fitness Centers around me :)",
      icon: require("../assets/images/partial-react-logo.png"),
    },
    {
      time: "14:00",
      title: "Watch Soccer",
      description:
        "Team sport played between two teams of eleven players with a spherical ball.",
      lineColor: "#f00",
      icon: (
        <Image
          source={require("@/assets/flags/thai.svg")}
          style={{
            width: 90,
            height: 90,
            borderRadius: 30,
          }}
          resizeMode="cover"
        />
      ),
    },
    {
      time: "16:30",
      title: "Go to Fitness center",
      description: "Look out for the Best Gym & Fitness Centers around me :)",
      icon: require("../assets/images/partial-react-logo.png"),
    },
  ];

  return (
    <>
      <GestureHandlerRootView className="mb-0" style={{ flex: 1, alignItems:"center", backgroundColor:"#031430"}}>
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