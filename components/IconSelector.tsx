import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface IconSelectorProps {
  onSelect: (icon: string) => void;
}

import { FontAwesome, MaterialIcons, Ionicons, Entypo, Feather } from '@expo/vector-icons';

const icons = [
  // FontAwesome Icons
  { name: "book", iconSet: FontAwesome },
  { name: "calendar", iconSet: FontAwesome },
  { name: "pencil", iconSet: FontAwesome },
  { name: "laptop", iconSet: FontAwesome },
  { name: "bell", iconSet: FontAwesome },
  { name: "globe", iconSet: FontAwesome },
  { name: "graduation-cap", iconSet: FontAwesome },
  { name: "headphones", iconSet: FontAwesome },
  { name: "microphone", iconSet: FontAwesome },
  { name: "microchip", iconSet: FontAwesome },
  { name: "camera", iconSet: FontAwesome },
  { name: "code", iconSet: FontAwesome },
  { name: "folder", iconSet: FontAwesome },
  { name: "music", iconSet: FontAwesome },
  { name: "clipboard", iconSet: FontAwesome },
  { name: "address-book", iconSet: FontAwesome },
  { name: "anchor", iconSet: FontAwesome },
  { name: "apple", iconSet: FontAwesome },
  { name: "bullseye", iconSet: FontAwesome },
  { name: "question", iconSet: FontAwesome },

  // MaterialIcons Icons
  { name: "school", iconSet: MaterialIcons },
  { name: "adb", iconSet: MaterialIcons },
  { name: "architecture", iconSet: MaterialIcons },
  { name: "book", iconSet: MaterialIcons },
  { name: "calculate", iconSet: MaterialIcons },
  { name: "functions", iconSet: MaterialIcons },
  { name: "science", iconSet: MaterialIcons },
  { name: "local-library", iconSet: MaterialIcons },
  { name: "palette", iconSet: MaterialIcons },
  { name: "assignment", iconSet: MaterialIcons },
  { name: "computer", iconSet: MaterialIcons },
  { name: "engineering", iconSet: MaterialIcons },
  { name: "language", iconSet: MaterialIcons },
  { name: "menu-book", iconSet: MaterialIcons },
  { name: "mic", iconSet: MaterialIcons },
  { name: "movie", iconSet: MaterialIcons },
  { name: "nature-people", iconSet: MaterialIcons },
  { name: "star", iconSet: MaterialIcons },
  { name: 'school', iconSet: MaterialIcons },
  { name: 'book', iconSet: MaterialIcons },
  { name: 'science', iconSet: MaterialIcons },
  
  // Communication
  { name: 'chat', iconSet: MaterialIcons },
  { name: 'email', iconSet: MaterialIcons },
  { name: 'call', iconSet: MaterialIcons },
  { name: 'forum', iconSet: MaterialIcons },
  
  // Devices & Technology
  { name: 'computer', iconSet: MaterialIcons },
  { name: 'headset', iconSet: MaterialIcons },
  { name: 'watch', iconSet: MaterialIcons },
  
  // Productivity
  { name: 'assignment', iconSet: MaterialIcons },
  { name: 'event', iconSet: MaterialIcons },
  { name: 'task', iconSet: MaterialIcons },
  { name: 'checklist', iconSet: MaterialIcons },

  // Creative & Arts
  { name: 'brush', iconSet: MaterialIcons },
  { name: 'palette', iconSet: MaterialIcons },
  { name: 'mic', iconSet: MaterialIcons },
  { name: 'videocam', iconSet: MaterialIcons },

  // Health & Fitness
  { name: 'pool', iconSet: MaterialIcons },

  // Transportation
  { name: 'flight', iconSet: MaterialIcons },
  { name: 'train', iconSet: MaterialIcons },

  // Miscellaneous
  { name: 'build', iconSet: MaterialIcons },
  { name: 'pets', iconSet: MaterialIcons },
  { name: 'favorite', iconSet: MaterialIcons },

  // Ionicons Icons
  { name: "briefcase", iconSet: Ionicons },
  { name: "book", iconSet: Ionicons },
  { name: "calendar", iconSet: Ionicons },
  { name: "checkmark-circle", iconSet: Ionicons },
  { name: "clipboard", iconSet: Ionicons },
  { name: "color-palette", iconSet: Ionicons },
  { name: "document", iconSet: Ionicons },
  { name: "folder", iconSet: Ionicons },
  { name: "globe", iconSet: Ionicons },
  { name: "laptop", iconSet: Ionicons },
  { name: "mic", iconSet: Ionicons },
  { name: "school", iconSet: Ionicons },
  { name: "terminal", iconSet: Ionicons },

  // Entypo Icons
  { name: "book", iconSet: Entypo },
  { name: "graduation-cap", iconSet: Entypo },
  { name: "lab-flask", iconSet: Entypo },
  { name: "music", iconSet: Entypo },
  { name: "pencil", iconSet: Entypo },
  { name: "open-book", iconSet: Entypo },
  { name: "briefcase", iconSet: Entypo },
  { name: "text-document", iconSet: Entypo },
  { name: "tools", iconSet: Entypo },
  { name: "tv", iconSet: Entypo },

  // Feather Icons
  { name: "clock", iconSet: Feather },
  { name: "book", iconSet: Feather },
  { name: "calendar", iconSet: Feather },
  { name: "clipboard", iconSet: Feather },
  { name: "folder", iconSet: Feather },
  { name: "globe", iconSet: Feather },
  { name: "headphones", iconSet: Feather },
  { name: "layers", iconSet: Feather },
  { name: "layout", iconSet: Feather },
  { name: "map", iconSet: Feather },
  { name: "mic", iconSet: Feather },
  { name: "scissors", iconSet: Feather },
  { name: "tool", iconSet: Feather },
  { name: "book-open", iconSet: Feather },
  { name: "bell", iconSet: Feather },
];



const IconSelector: React.FC<IconSelectorProps> = ({ onSelect }) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleIconPress = (iconName: string) => {
    setSelectedIcon(iconName);
    onSelect(iconName);
  };

  return (
    <View className="w-full bg-[#031430] h-96 ">
      <Text className="text-lg text-gray-100 font-semibold text-center my-4">
        Select an Icon
      </Text>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {icons.map(({ name, iconSet: IconSet }, index) => (
          <TouchableOpacity
            key={index}
            className="w-12 h-12 m-2 rounded-full flex items-center justify-center"
            // selectedIcon === name ? 'bg-blue-500' : 'bg-gray-300'
            onPress={() => handleIconPress(name)}
          >
            <IconSet
              // @ts-ignore
              name={name}
              size={24}
              color={selectedIcon === name ? "green" : "white"}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default IconSelector;
