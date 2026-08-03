import React, {FC} from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  TextStyle,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import {Colors} from '@constant/index';
import TextView from '../TextView/textView';
import { LinearGradient } from 'expo-linear-gradient';
import _ from 'lodash';
import AnimatedButton from './Animationbutton/animationbutton';

interface ButtonProps {
  onPress?: () => void;
  isLoading?: boolean;
  indicatorColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  title?: string | null;
  titleStyle?: TextStyle;
  buttonColor?: string;
  icon?: any;
  showIcon?: any;
  gradientColors?: string[];
  lefticon?:any
}

const Button: FC<ButtonProps> = ({
  onPress,
  isLoading,
  indicatorColor,
  disabled,
  style,
  title,
  titleStyle,
  buttonColor,
  icon,
  showIcon,
  gradientColors,
  lefticon
}) => {
  const {
    buttonContainer,
    buttonView,
    indicatorStyle,
    touchableOpacityStyle,
    disabledButtonContainer,
    buttonText,
    disabledBtnText,
    iconStyle
  } = styles;

  const renderContent = () => (
    <View style={touchableOpacityStyle}>
      {isLoading ? (
        <View style={buttonView}>
          <View style={indicatorStyle}>
            <ActivityIndicator color={indicatorColor} />
          </View>
        </View>
      ) : (
        <View style={buttonView}>
          {lefticon && <Image source={icon} style={iconStyle} />}
          <TextView
            style={[buttonText, titleStyle, disabled && disabledBtnText]}>
            {title}
          </TextView>
          {showIcon && <Image source={icon} style={iconStyle} />}
        </View>
      )}
    </View>
  );

  const renderBackground = () => {
    if (buttonColor) {
      return (
        <View
          style={[
            disabled ? disabledButtonContainer : buttonContainer,
            {backgroundColor: buttonColor},
          ]}>
          {renderContent()}
        </View>
      );
    }

    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.1, y: 2.8}}
        colors={
          gradientColors
            ? gradientColors
            : [Colors.LINEAR[100], Colors.LINEAR[200], Colors.LINEAR[300]]
        }
        style={[disabled ? disabledButtonContainer : buttonContainer]}>
        {renderContent()}
      </LinearGradient>
    );
  };

  return (
    <AnimatedButton
      //@ts-ignore
      onPress={_.debounce(onPress, 300)}
      isLoading={isLoading}
      disabled={disabled}
      style={style}>
      {renderBackground()}
    </AnimatedButton>
  );
};

export default Button;
