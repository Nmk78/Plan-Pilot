
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons, Entypo, Feather } from '@expo/vector-icons';

// Define the icon sets mapping
const iconSets: { [key: string]: React.ComponentType<any> } = {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Entypo,
  Feather
};

// Update the icons array to use iconSets
const icons = [
  { name: 'book', iconSet: 'FontAwesome' },
  { name: 'calendar', iconSet: 'FontAwesome' },
  { name: 'pencil', iconSet: 'FontAwesome' },
  { name: 'laptop', iconSet: 'FontAwesome' },
  { name: 'bell', iconSet: 'FontAwesome' },
  { name: 'globe', iconSet: 'FontAwesome' },
  { name: 'graduation-cap', iconSet: 'FontAwesome' },
  { name: 'headphones', iconSet: 'FontAwesome' },
  { name: 'microphone', iconSet: 'FontAwesome' },
  { name: 'microchip', iconSet: 'FontAwesome' },
  { name: 'camera', iconSet: 'FontAwesome' },
  { name: 'code', iconSet: 'FontAwesome' },
  { name: 'folder', iconSet: 'FontAwesome' },
  { name: 'music', iconSet: 'FontAwesome' },
  { name: 'clipboard', iconSet: 'FontAwesome' },
  { name: 'address-book', iconSet: 'FontAwesome' },
  { name: 'anchor', iconSet: 'FontAwesome' },
  { name: 'apple', iconSet: 'FontAwesome' },
  { name: 'bullseye', iconSet: 'FontAwesome' },
  { name: 'question', iconSet: 'FontAwesome' },

  { name: 'school', iconSet: 'MaterialIcons' },
  { name: 'adb', iconSet: 'MaterialIcons' },
  { name: 'architecture', iconSet: 'MaterialIcons' },
  { name: 'calculate', iconSet: 'MaterialIcons' },
  { name: 'functions', iconSet: 'MaterialIcons' },
  { name: 'science', iconSet: 'MaterialIcons' },
  { name: 'local-library', iconSet: 'MaterialIcons' },
  { name: 'palette', iconSet: 'MaterialIcons' },
  { name: 'assignment', iconSet: 'MaterialIcons' },
  { name: 'computer', iconSet: 'MaterialIcons' },
  { name: 'engineering', iconSet: 'MaterialIcons' },
  { name: 'language', iconSet: 'MaterialIcons' },
  { name: 'menu-book', iconSet: 'MaterialIcons' },
  { name: 'mic', iconSet: 'MaterialIcons' },
  { name: 'movie', iconSet: 'MaterialIcons' },
  { name: 'nature-people', iconSet: 'MaterialIcons' },
  { name: 'star', iconSet: 'MaterialIcons' },

  { name: 'chat', iconSet: 'MaterialIcons' },
  { name: 'email', iconSet: 'MaterialIcons' },
  { name: 'call', iconSet: 'MaterialIcons' },
  { name: 'forum', iconSet: 'MaterialIcons' },

  { name: 'headset', iconSet: 'MaterialIcons' },
  { name: 'watch', iconSet: 'MaterialIcons' },

  { name: 'event', iconSet: 'MaterialIcons' },
  { name: 'task', iconSet: 'MaterialIcons' },
  { name: 'checklist', iconSet: 'MaterialIcons' },

  { name: 'brush', iconSet: 'MaterialIcons' },
  { name: 'videocam', iconSet: 'MaterialIcons' },

  { name: 'pool', iconSet: 'MaterialIcons' },

  { name: 'flight', iconSet: 'MaterialIcons' },
  { name: 'train', iconSet: 'MaterialIcons' },

  { name: 'build', iconSet: 'MaterialIcons' },
  { name: 'pets', iconSet: 'MaterialIcons' },
  { name: 'favorite', iconSet: 'MaterialIcons' },

  { name: 'briefcase', iconSet: 'Ionicons' },
  { name: 'checkmark-circle', iconSet: 'Ionicons' },
  { name: 'color-palette', iconSet: 'Ionicons' },
  { name: 'document', iconSet: 'Ionicons' },
  { name: 'terminal', iconSet: 'Ionicons' },

  { name: 'graduation-cap', iconSet: 'Entypo' },
  { name: 'lab-flask', iconSet: 'Entypo' },
  { name: 'open-book', iconSet: 'Entypo' },
  { name: 'text-document', iconSet: 'Entypo' },
  { name: 'tools', iconSet: 'Entypo' },
  { name: 'tv', iconSet: 'Entypo' },

  { name: 'clock', iconSet: 'Feather' },
  { name: 'book-open', iconSet: 'Feather' },
  { name: 'layers', iconSet: 'Feather' },
  { name: 'layout', iconSet: 'Feather' },
  { name: 'map', iconSet: 'Feather' },
  { name: 'scissors', iconSet: 'Feather' },
  { name: 'tool', iconSet: 'Feather' },
  { name: 'bell', iconSet: 'Feather' },
];

const IconSelector: React.FC = ({ onSelect }:any) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleIconPress = (iconName: string) => {
    setSelectedIcon(iconName);
    onSelect(iconName);
  };

  return (
    <View className="w-full mx-auto bg-[#031430] h-96">
      <Text className="text-lg text-gray-100 font-semibold text-center my-2">
        Select an Icon
      </Text>
      <ScrollView
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
      >
        {icons.map(({ name, iconSet }, index) => {
          const IconComponent = iconSets[iconSet as keyof typeof iconSets];
          return (
            <TouchableOpacity
              key={index}
              className="w-12 h-9 m-2 rounded-full flex items-center justify-center"
              onPress={() => handleIconPress(name)}
            >
              <IconComponent
                //@ts-ignore
                name={name}
                size={24}
                color={selectedIcon === name ? 'green' : 'white'}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default IconSelector;
