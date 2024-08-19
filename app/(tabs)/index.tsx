import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

// App.js

import { NativeWindStyleSheet } from "nativewind";
import GradientHeader from '@/components/GradientBg';
import Schedule from '@/components/TimeTable';
import { daysOfWeek, generateDailySchedule, subjects, weeklySchedule } from '@/constants/Constants';


//@ts-ignore
export default HomeScreen = () => {

  return (
    <View className="flex flex-1 bg-background justify-start">
    <View className="relative max-w-full">
      <GradientHeader />
      {/* <Link href="/home" className=" font-bold text-5xl text-teal-50">Home</Link> */}
      <View className="absolute h-10 flex flex-row align-bottom bottom-4 z-50 mx-5">
        <Text className=" w-1/3 text-text text-3xl font-medium">Tue</Text>
        <View className="flex flex-col w-1/3 bg-black- justify-end">
          <Text className=" text-text text-3xl mx-auto font-semibold underline">
            Now
          </Text>
          <Text className=" text-text text-2xl mx-auto font-medium">Eng</Text>
        </View>
        <View className="flex flex-col w-1/3 bg-black- justify-end">
          <Text className=" text-text text-3xl ml-auto font-semibold underline">
            Next
          </Text>
          <Text className=" text-text text-2xl ml-auto font-semibold">
            Math
          </Text>
        </View>
      </View>
    </View>

    <View className="flex flex-1 items-center">
      {/* <TimelineComponent /> */}
      <Schedule
      mode="view"
        TimeTableGenerateFn={generateDailySchedule(weeklySchedule)}
        weeklyTimeTable={weeklySchedule}
        daysOfWeek={daysOfWeek}
        subjects={subjects}
      />
    </View>
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#3498ff',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});