import {
  Button,
  Text,
  Box,
  Actionsheet,
  useDisclose,
} from "native-base";
import React, { useEffect, useState } from "react";
import PopupModal from "./PopupModal";
import { getFirestore, doc, setDoc, query, collection, where, getDocs } from "firebase/firestore";
import Toast from "./Toast";
import { TextInput } from "react-native";

const db = getFirestore();

const onAddSubject = async (userId: string, setErr: any, newSubject: any) => {
  console.log("🚀 ~ onAddSubject: Adding");
  setErr("");
  try {
    console.log("🚀 ~ onAddSubject: Trying to add");

    const subjectRef = doc(db, `users/${userId}/userSubjects`, newSubject.title); // Use title as the document ID

    // Check if the subject already exists
    const subjectQuery = query(collection(db, `users/${userId}/userSubjects`), where('title', '==', newSubject.title));
    const querySnapshot = await getDocs(subjectQuery);

    if (querySnapshot.empty) {
      // Subject does not exist, add it to Firestore
      await setDoc(subjectRef, newSubject);
      console.log('Subject added:', newSubject);
    } else {
      setErr("Subject already exists");
      console.log('Subject already exists:', newSubject.title);
    }
  } catch (error) {
    console.error('Error adding subject:', error);
    setErr("Error adding subject");
  }
};

const onEditSubject = async (userId: string, setErr: any, subject: any) => {
  console.log("🚀 ~ onEditSubject: Editing");
  setErr("");
  try {
    console.log("🚀 ~ onEditSubject: Trying to edit");

    const subjectRef = doc(db, `users/${userId}/userSubjects`, subject.title); // Use title as the document ID

    // Check if the subject exists
    const subjectQuery = query(collection(db, `users/${userId}/userSubjects`), where('title', '==', subject.title));
    const querySnapshot = await getDocs(subjectQuery);

    if (!querySnapshot.empty) {
      // Subject exists, update it in Firestore
      await setDoc(subjectRef, subject, { merge: true }); // Use merge to update existing fields and keep others intact
      console.log('Subject updated:', subject);
    } else {
      // Subject does not exist, add it to Firestore
      await setDoc(subjectRef, subject);
      console.log('Subject added:', subject);
    }
  } catch (error) {
    console.error('Error editing subject:', error);
    setErr("Error updating subject");
  }
};

const CURD_Subjects = ({
  isOpen,
  onClose,
  subject,
  userId, // Added userId as a prop
}: any) => {
  console.log("🚀 ~ userId:", userId)
  const [title, setTitle] = useState(subject ? subject.title : "");
  const [teacher, setTeacher] = useState(subject ? subject.teacher : "");
  const [room, setRoom] = useState(subject ? subject.room : "");
  const [icon, setIcon] = useState(subject ? subject.icon : "");
  const [color, setColor] = useState(subject ? subject.color : "");
  const [isModalVisible, setModalVisible] = useState(false);
  const [err, setErr] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (err) {
      console.log("Setting timer");
      const timer = setTimeout(() => {
        setErr("");
        console.log("Cleared");
      }, 3000);

      // Cleanup function to clear the timer if the component unmounts or `err` changes
      return () => {
        clearTimeout(timer);
        console.log("Clearing timer");
      };
    }
  }, [err]);

  const handleSubmit = async () => {
    const newSubject = {
      id: Date.now(),
      title,
      teacher,
      room,
      icon,
      color,
    };
    console.log("🚀 ~ handleSubmit ~ newSubject:", newSubject);

    if (subject) {
      await onEditSubject(userId, setErr, newSubject); // Pass userId and setErr
    } else {
      await onAddSubject(userId, setErr, newSubject); // Pass userId and setErr
    }

    // Clear form fields after submission
    setTitle("");
    setTeacher("");
    setRoom("");
    setIcon("");
    setColor("");
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content backgroundColor="#031430">
        <Box
          className="gap-y-3 pb-5 focus:pb-80"
          w="100%"
          px={4}
          justifyContent="center"
        >
          <Text className="text-text font-bold text-xl ">
            {subject ? "Edit Subject" : "Add Subject"}
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter subject title"
            placeholderTextColor="#eaeaea"
            className="border border-gray-300 text-gray-100 p-2 mb-2 rounded"
          />
          <TextInput
            value={teacher}
            onChangeText={setTeacher}
            placeholder="Enter teacher name"
            placeholderTextColor="#eaeaea"
            className="border border-gray-300 text-gray-100 p-2 -mb-2 rounded"
          />
          <TextInput
            value={room}
            onChangeText={setRoom}
            placeholder="Enter room"
            placeholderTextColor="#eaeaea"
            className="border border-gray-300 text-gray-100 p-2 mb-2 rounded"
          />
          <Box marginTop={40} className="mt-20 mb-10">
            <Button onPress={toggleModal}>
              Select Icon and Color
            </Button>
            <PopupModal
              isVisible={isModalVisible}
              setIcon={setIcon}
              color={color}
              setColor={setColor}
              className="bg-[#031430]"
              onClose={toggleModal}
            />
            {err && (
              <Text className="text-red-500 text-center my-3">{err}</Text>
            )}
          </Box>
          <Box marginTop={40} className="mt-20 mb-10">
            <Button onPress={handleSubmit}>
              {subject ? "Update Subject" : "Add Subject"}
            </Button>
          </Box>
        </Box>
        <Toast message={err} visible={!!err} />
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default CURD_Subjects;
