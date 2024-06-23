import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TimeTableCard } from "./TimeTableCard";

const TimeTables = () => {
  let timeTables = [
    {
      id: 12,
      title: "Bachlor",
      desc: "=true&transform.engine=hermes&transform.",
    },
    { id: 121, title: "MSC", desc: "transform.engine=hertrumes&transform." },
    { id: 6122, title: "MSC", desc: "transform.engine=hertrumes&transform." },
    { id: 712, title: "MSC", desc: "transform.engine=hertrumes&transform." },
    { id: 3812, title: "MSC", desc: "transform.engine=hertrumes&transform." },
    { id: 452, title: "MSC", desc: "transform.engine=hertrumes&transform." },
    { id: 412, title: "MSC", desc: "transform.engine=hertrumes&transform." },
  ];
  return (
    <>
      <ScrollView
        className="bg-background flex-1"
        contentContainerStyle={styles.contentContainer}
      >
        {timeTables.map((timetable) => (
          <TimeTableCard key={timetable.id} active={timetable.id == 121} timeTable={timetable} />
        ))}
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
export default TimeTables;
