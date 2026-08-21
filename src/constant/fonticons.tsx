import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Octicons from '@expo/vector-icons/Octicons';
//import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
//import Zocial from '@expo/vector-icons/Zocial';

interface IconProps {
  family: string;
  name: string;
  color?: string;
  size?: number;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({
  family,
  name,
  color = "#000",
  size = 20,
  ...props
}) => {
  let Family;

  switch (family) {
    case "AntDesign":
      Family = AntDesign;
      break;
    case "Entypo":
      Family = Entypo;
      break;
    case "EvilIcons":
      Family = EvilIcons;
      break;
    case "Feather":
      Family = Feather;
      break;
    case "FontAwesome":
      Family = FontAwesome;
      break;
    case "FontAwesome5":
      Family = FontAwesome5;
      break;
    case "FontAwesome6":
      Family = FontAwesome6;
      break;
    case "Fontisto":
      Family = Fontisto;
      break;
    case "Foundation":
      Family = Foundation;
      break;
    case "Ionicons":
      Family = Ionicons;
      break;
    case "MaterialCommunityIcons":
      Family = MaterialCommunityIcons;
      break;
    default:
      Family = Ionicons;
  }

  return (
    <Family
      name={name || "help-outline"}
      color={color}
      size={size}
      {...props}
    />
  );
};

export default Icon;
