import { ScrollView, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
// import { subjects } from "@/constants/Constants";
import { SubjectCard } from "./SubjectCard";
import { useDisclose } from "native-base";

import CURD_Tasks from "./CURD_Tasks";
import CURD_Subjects from "./CURD_Subjects";
import { getAuth } from "firebase/auth";

import { getFirestore, collection, query, getDocs } from "firebase/firestore";




const Subjects = ({ mode, onEditSubject, err }: any) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [task, setTask] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  
    const fetchUserSubjects = async (userId: string) => {
      const db = getFirestore();
      const userSubjectsRef = collection(db, `users/${userId}/userSubjects`);
      const q = query(userSubjectsRef);
      
      try {
        const querySnapshot = await getDocs(q);
        const fetchedSubjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        //@ts-ignore
        setSubjects(fetchedSubjects);
        console.log("🚀 ~ fetchUserSubjects ~ subjects:", subjects)
        
    
        return fetchedSubjects;
      } catch (error) {
        console.error("Error fetching subjects:", error);
        return [];
      }
    };

    // @ts-ignore
    fetchUserSubjects(userId)
  }, [userId]);

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
        {/* @ts-ignore */}
        {subjects?.map((subject: { id: any; }) => (
          <SubjectCard
            key={subject.id}
            // @ts-ignore
            item={subject}
            onOpen={() => openActionSheet(subject)}
          />
        ))}
        {/* <CURD_Tasks isOpen={isOpen} task={task} onClose={onClose} /> */}
        {mode === "subject" && (
          <CURD_Subjects
            userId={userId}
            isOpen={isOpen}
            onEditSubject={onEditSubject}
            err={err}
            subject={task}
            onClose={onClose}
          />
        )}
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
