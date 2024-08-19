import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Actionsheet, Box, useDisclose } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import IconSelector from "./IconSelector";
import ColorSelector from "./ColourSelector";

const CURD_Subjects = ({ onAddSubject, isOpen, onClose, subject }: any) => {
  interface Subject {
    id: number;
    title: string;
    teacher: string;
    room: string;
    icon: string;
    color: string;
  }

  interface SubjectFormProps {
    onAddSubject: (subject: Subject) => void;
  }

  const [title, setTitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = () => {
    const newSubject = {
      id: Date.now(),
      title,
      teacher,
      room,
      icon,
      color,
    };

    if (subject) {
      setTitle(subject.title);
      setTeacher(subject.teacher);
      setRoom(subject.room);
      setIcon(subject.icon);
      setColor(subject.color);
    }
    // @ts-ignore
    onAddSubject(newSubject);
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
          <Text className="text-text font-bold text-xl ">Edit</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter subject title"
            className="border border-gray-300 text-gray-100 p-2 mb-2 rounded"
          />
          <TextInput
            value={teacher}
            onChangeText={setTeacher}
            placeholder="Enter teacher name"
            className="border border-gray-300 text-gray-10 p-2 mb-2 rounded"
          />{" "}
          <TextInput
            value={room}
            onChangeText={setRoom}
            placeholder="Enter room number"
            className="border border-gray-300 text-gray-10 p-2 mb-2 rounded"
          />
          <view>
            <IconSelector onSelect={setIcon} />
            <ColorSelector onColorChange={setColor}/>
          </view>
          <Box marginTop={40} className="mt-20">
            <Button
              title={subject ? "Update Subject" : "Add Subject"}
              onPress={handleSubmit}
            />
          </Box>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default CURD_Subjects;
