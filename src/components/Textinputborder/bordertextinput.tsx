import React, { FC, useRef } from 'react';
import {
  Text,
  TextInput,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ReturnKeyTypeOptions,
  Image,
  KeyboardTypeOptions,
  ImageProps,
  Platform,
} from 'react-native';
import TextView from '../TextView/textView';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '@constant/dimentions';
import { Colors, Images } from '@constant/index';
import { FormikErrors, FormikTouched } from 'formik';

interface TextInputProps {
  value?: string;
  onChangeText: ( text: string ) => void;
  label?: string | null;
  editable?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  isSecure?: boolean;
  style?: any;
  isRequired?: boolean;
  onSecureTextPress?: () => void;
  error?: FormikErrors<string> | any;
  touched?: FormikTouched<boolean> | any;
  keyboardType?: KeyboardTypeOptions | undefined;
  maxLength?: number;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  isMultiline?: boolean;
  lefticon?: ImageProps;
  placeholder?: string
}

const Bordertextinput: FC<TextInputProps> = ( {
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
} ) => {
  const inputRef = useRef<TextInput>( null );
  const animatedValue = useRef( new Animated.Value( 0 ) );

  const returnAnimatedTitleStyles = {
    transform: [
      {
        translateY: animatedValue.current.interpolate( {
          inputRange: [ 0, 1 ],
          outputRange: [ value ? 3 : 22, 0 ],
          extrapolate: 'clamp',
        } ),
      },
    ],
  };

  const onFocus = () => {
    Animated.timing( animatedValue.current, {
      toValue: 1,
      duration: 150,
      easing: Easing.bezier( 0.4, 0, 0.2, 1 ),
      useNativeDriver: false,
    } ).start();
  };

  const onBlur = () => {
    if ( !value ) {
      Animated.timing( animatedValue.current, {
        toValue: 0,
        duration: 150,
        easing: Easing.bezier( 0.4, 0, 0.2, 1 ),
        useNativeDriver: false,
      } ).start();
    }
  };

  return (
    <View style={ [ style, { paddingBottom: Platform.OS === 'android' ? 10 : 1 } ] }>
      { lefticon && (
        <View style={ styles.lefticon }>
          <Image
            source={ lefticon }
            style={ { tintColor: error && touched ? Colors.ERROR[ 100 ] : Colors.SECONDARY[ 400 ], width: wp(4.5), height: hp(4.5),right: hp(0.5), top: hp(2.3 ), resizeMode: 'contain' } }
          />
        </View>
      ) }
      <TextInput
        style={ [
          styles.input,
          {
            borderBottomWidth: 1,
            borderBottomColor:
            error && touched ? Colors.ERROR[ 100 ] : Colors.SECONDARY[ 200 ],
            width: wp( 80 ),
            height: hp( 5.2 ),
          },
          onSecureTextPress && {
            width: wp( 80 ),
            height: isMultiline ? hp( 20 ) : hp( 5.2 ),
          },
        ] }
        ref={ inputRef }
        value={ value }
        onBlur={ onBlur }
        onFocus={ onFocus }
        placeholder={ placeholder }
        multiline={ isMultiline }
        autoCapitalize="none"
        autoCorrect={ false }
        pointerEvents={ pointerEvents }
        keyboardType={ keyboardType }
        onChangeText={ onChangeText }
        secureTextEntry={ isSecure }
        returnKeyType={ returnKeyType }
        editable={ editable }
        maxLength={ maxLength }
      />
      { onSecureTextPress && (
        <TouchableOpacity style={ styles.secureBtn } onPress={ onSecureTextPress }>
          <Image source={ isSecure ? Images.eyeclose : Images.eyeopen } style={ styles.eyeStyle } />
        </TouchableOpacity>
      ) }
      { error && touched && <TextView style={ styles.error }>{ error }</TextView> }
    </View>
  );
};

export default Bordertextinput;

