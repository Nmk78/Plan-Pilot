import { Text, View, useWindowDimensions } from "react-native";
import React from "react";
import GradientHeader from "@/components/GradientBg";
import Schedule from "@/components/TimeTable";
import {
  daysOfWeek,
  generateDailySchedule,
  subjects,
  weeklySchedule,
} from "@/constants/Constants";

const Home = () => {
  const { width } = useWindowDimensions(); // Get screen width

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

      <View className="flex flex-1 mt-3 px-3">
        {/* <TimelineComponent /> */}
        <Schedule
        mode="view"
          scheduleGenerateFn={generateDailySchedule(weeklySchedule)}
          weeklySchedule={weeklySchedule}
          daysOfWeek={daysOfWeek}
          subjects={subjects}
        />
      </View>
    </View>
  );
};

export default Home;

// const styles = StyleSheet.create({
//     container :{
//         display: 'flex',
//         flex: 1,
//         alignItems:'center',
//         justifyContent:'center'
//     }
// })schedule: any, width: numberschedule: any, width?: number
