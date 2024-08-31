import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { getAccentColor, getComplementaryColor } from "@/constants/Constants";

interface SubjectCardProps {
  item: {
    title: string;
    teacher: string;
    room: string;
    icon: string; // Icon name should match your defined icon sets
    color: string;
  };
  onOpen: () => void;
}

const iconSets: { [key: string]: React.ComponentType<any> } = {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Entypo,
  Feather
};


export const SubjectCard: React.FC<SubjectCardProps> = ({ item, onOpen }) => {
  console.log("🚀 ~ item:", item)
  const { title, teacher, room, icon, color } = item;

  const iconSetKey = iconSets[icon] ? icon : 'FontAwesome'; // Default to 'FontAwesome' if not found
  const IconComponent = iconSets[iconSetKey]; // Get the corresponding icon component

  let accent = getAccentColor(color);
  let complementColor = getComplementaryColor(color);

  return (
    <TouchableOpacity
      onPress={onOpen}
      activeOpacity={0.9}
      style={{
        backgroundColor: color,
        height: 120,
        marginVertical: 3,
        borderRadius: 10,
        elevation: 4, // Adjust elevation for shadow
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          backgroundColor: accent,
          width: '33%',
          height: '80%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
      >
        {IconComponent ? (
          <IconComponent name={icon} size={70} color={complementColor} />
        ) : (
          <Text>Icon not found</Text>
        )}
      </View>
      <View style={{ width: '67%', marginLeft: 12 }}>
        <Text style={{ color: complementColor, fontWeight: 'bold', fontSize: 20 }}>
          {title}
        </Text>
        <Text style={{ fontWeight: '600', fontSize: 18 }}>{teacher}</Text>
        <Text>{room}</Text>
      </View>
    </TouchableOpacity>
  );
};
