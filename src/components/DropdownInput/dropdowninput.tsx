/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useContext, useState } from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '@constant/dimentions';
import { Typography, Colors, cardShadow } from '@constant/index';
import  TextView  from '../TextView/textView';
import { ThemeContext } from '../../context/themeContext';
import createStyles from './styles'
import {  DarkTheme } from '../theme/theme';
import {LightTheme} from '../theme/theme';
// @ts-ignore
interface CustomDropdownProps extends Partial<DropDownPickerProps<any>> {
  label?: string;
  dropDownLable?: string;
  isTypeLabel?: boolean;
  isRequired?: boolean;
  isEnabled?: boolean;
  isDisabled?: boolean;
  error?: string;
  onChangeValue?: (value: any) => void;
  placeholder: string;
  items: { label: string; value: string }[];
  totalwidth?: ViewStyle | ViewStyle[];
  value?: any;
  setValue?: (value: any) => void;
}

const CustomDropdown: FC<CustomDropdownProps> = ({
  dropDownLable,
  placeholder,
  isTypeLabel = true,
  isRequired = false,
  onChangeValue,
  isEnabled = true,
  isDisabled = false,
  error,
  totalwidth,
  value,
  setValue,
  ...props
}) => {
  const [open, setOpen] = useState(false);
    const { theme } = useContext(ThemeContext);
    const currentTheme = theme === 'light' ? LightTheme : DarkTheme;
      const styles = createStyles(currentTheme);


  const handleSetValue = (callback: any) => {
    const newVal = typeof callback === 'function' ? callback(value) : callback;
    if (setValue) setValue(newVal);
    if (onChangeValue) onChangeValue(newVal);
  };

  return (
    <View style={[styles.wrapper, totalwidth]}>
      {isTypeLabel && (
        <TextView style={styles.labelText}>
          {dropDownLable}
          {isRequired && <TextView style={{ color: 'red' }}> *</TextView>}
        </TextView>
      )}

      <DropDownPicker
        placeholder={placeholder}
        placeholderStyle={styles.placeholderText}
        open={open}
        setOpen={setOpen}
        value={value}
        //@ts-ignore
        setValue={handleSetValue}
        listMode={Platform.OS === 'android' ? 'MODAL' : 'SCROLLVIEW'}
        scrollViewProps={{ scrollEnabled: true }}
        disabled={!isEnabled || isDisabled}
        style={[styles.dropdown, error && { borderColor: Colors.ERROR[100] }]}
        {...props}
      />
      {error && (
        <TextView style={styles.errorText}>{error}</TextView>
      )}
    </View>
  );
};

export default CustomDropdown;

