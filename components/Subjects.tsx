import { ScrollView, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { subjects } from "@/constants/Constants";
import { SubjectCard } from "./SubjectCard";
import { useDisclose } from "native-base";

import CURD_Tasks from "./CURD_Tasks";
import CURD_Subjects from "./CURD_Subjects";

const Subjects = ({mode}:any) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [task, setTask] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  const openActionSheet = (subject: any) => {
    setTask(subject);
  };

  useEffect(() => {
    if (hasMounted) {
      onOpen();
    } else {
      setHasMounted(true);
    }
  }, [task]);

  return (
    <>
      <ScrollView
        className="bg-background flex-1"
        contentContainerStyle={styles.contentContainer}
      >
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            item={subject}
            onOpen={() => openActionSheet(subject)}
          />
        ))}
        <CURD_Tasks isOpen={isOpen} task={task} onClose={onClose} />
        {mode === "subject" && <CURD_Subjects isOpen={isOpen} subject={task} onClose={onClose} />}
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
