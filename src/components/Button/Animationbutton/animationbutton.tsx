// components/AnimatedButton.tsx
import React, {FC, ReactNode, useRef} from 'react';
import {Animated, TouchableWithoutFeedback, ViewStyle} from 'react-native';

interface AnimatedButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
  children?: ReactNode;
}

const AnimatedButton: FC<AnimatedButtonProps> = ({
  onPress,
  disabled,
  isLoading,
  style,
  children,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();

    if (onPress && !disabled && !isLoading) {
      onPress();
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || isLoading}>
      <Animated.View
        style={[
          style,
          {
            transform: [{scale: scaleAnim}],
          },
        ]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedButton;
