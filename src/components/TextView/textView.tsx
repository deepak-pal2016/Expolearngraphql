import React from "react";
import { Text, TextStyle, StyleProp } from "react-native";
import { FC } from "react";
import { Typography } from "../../constant";
interface TextProps {
  style?: StyleProp<TextStyle>,
  children?: React.ReactNode | any,
  onPress?: () => void,
  numberOfLines?: number,
  ellipsizeMode?: any
}

const TextView: FC<TextProps> = ({
  style,
  children,
  onPress,
  numberOfLines,
  ellipsizeMode
}) => {

  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[Typography.BodyRegular12, style] as any}
      allowFontScaling={false}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};


export default TextView;
