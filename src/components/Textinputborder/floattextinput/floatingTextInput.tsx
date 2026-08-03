/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useRef } from 'react';
import {
  Text,
  TextInput,
  View,
  Animated,
  ViewStyle,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ReturnKeyTypeOptions,
  Image,
  KeyboardTypeOptions,
  Appearance,
  ImageProps,
} from 'react-native';
import  TextView from '../../TextView/textView';
import createstyles from '../floattextinput/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '@constant/dimentions';
import { Colors, Images, Typography } from '@constant/index';
import { FormikErrors, FormikTouched } from 'formik';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/themeContext';
import  {LightTheme} from '../../theme/theme';
import {DarkTheme} from '../../theme/theme';

const colorscheme = Appearance.getColorScheme();

interface TextInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  label?: String | null;
  editable?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  isSecure?: boolean;
  style?: ViewStyle;
  isRequired?: boolean;
  onSecureTextPress?: () => void;
  error?: FormikErrors<string> | any;
  touched?: FormikTouched<boolean> | any;
  keyboardType?: KeyboardTypeOptions | undefined;
  maxLength?: number;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  isMultiline?: boolean;
  lefticon?: ImageProps;
  placeholder?: string;
}

const FloatingTextInput: FC<TextInputProps> = ({
  label,
  value,
  style,
  onChangeText,
  editable,
  returnKeyType,
  isSecure,
  isRequired,
  onSecureTextPress,
  error,
  touched,
  keyboardType,
  maxLength,
  pointerEvents,
  isMultiline,
  placeholder,
  lefticon,
}) => {
  const inputRef = useRef<TextInput>(null);
  const animatedValue = useRef(new Animated.Value(0));
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'light' ? LightTheme : DarkTheme;

  const styles = createstyles(currentTheme);
  const returnAnimatedTitleStyles = {
    transform: [
      {
        translateY: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [value ? 3 : 22, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const onFocus = () => {
    Animated.timing(animatedValue?.current, {
      toValue: 1,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    if (!value) {
      Animated.timing(animatedValue?.current, {
        toValue: 0,
        duration: 150,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={[style, { marginTop: hp(2) }]}>
      <TextView style={styles.floatlable}>
        {label}
        {isRequired && <TextView style={{ color: 'red' }}> *</TextView>}
      </TextView>
      <View
        style={[
          styles.container,
          style,
          {
            borderColor:
              error && touched && Colors.ERROR[100] ,
            ...Typography.BodyRegular12,
            height: isMultiline ? hp(11) : hp(6.2),
            borderWidth: hp(0.04),
          },
        ]}
      >
        {/* <TouchableWithoutFeedback onPress={() => inputRef?.current?.focus()}>
          <Animated.View
            style={[styles.labelContainer, returnAnimatedTitleStyles]}>
            <Text
              style={[
                styles.label,
                {
                  color:
                    error && touched ? Colors.ERROR[100] : Colors.PRIMARY[300],
                },
              ]}>
              {label}
              <Text style={{color: 'red'}}>{isRequired && '*'}</Text>
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback> */}
        {lefticon && (
          <View style={styles.lefticon}>
            <Image
              source={lefticon}
              style={{
                tintColor: Colors.SECONDARY[200],
                width: wp(5),
                height: hp(2.2),
              }}
              resizeMode="contain"
            />
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            {textAlignVertical:'top'},
            onSecureTextPress && {
              width: wp(80),
              height: isMultiline ? hp(20) : hp(5),
              paddingHorizontal: hp(5),

            },
            {
              ...(editable === false && {
                backgroundColor: Colors.PRIMARYRGB[100],
                height: hp(5.9),
              }),
            },
          ]}
          ref={inputRef}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          multiline={isMultiline}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={
            colorscheme === 'dark'
              ? Colors.FLOATINGINPUT[100]
              : Colors.FLOATINGINPUT[200]
          }
          placeholder={placeholder}
          pointerEvents={pointerEvents}
          keyboardType={keyboardType}
          onChangeText={(text: string) => onChangeText(text)}
          secureTextEntry={isSecure}
          returnKeyType={returnKeyType}
          editable={editable}
          maxLength={maxLength}
        />

        {onSecureTextPress && (
          <TouchableOpacity
            style={styles.secureBtn}
            onPress={() => onSecureTextPress()}
          >
            <Image
              source={isSecure ? Images.ic_eyeclose : Images.ic_eyeopen}
              style={styles.eyeStyle}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && touched && <TextView style={styles.error}>{error}</TextView>}
    </View>
  );
};

export default FloatingTextInput;
