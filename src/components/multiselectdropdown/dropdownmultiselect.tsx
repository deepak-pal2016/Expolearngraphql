import React, {FC, useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '@constant/dimentions';
import {Typography, Colors} from '@constant/index';
import TextView from '../TextView/textView';

//@ts-ignore
interface CustomDropdownProps extends Partial<DropDownPickerProps<any>> {
  label?: string;
  dropDownLable?: string;
  isTypeLabel?: boolean;
  isRequired?: boolean;
  isEnabled?: boolean;
  isDisabled?: boolean;
  multiple?: boolean;
  error?: string;
  onChangeValue?: (value: any) => void;
  placeholder?: string;
  items: {label: string; value: string | number}[];
}

const Dropdownmultiselect: FC<CustomDropdownProps> = ({
  label,
  placeholder,
  dropDownLable,
  isTypeLabel = true,
  isRequired = false,
  onChangeValue,
  isEnabled = true,
  isDisabled = false,
  multiple,
  error,
  items,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any[]>([]); 

  
  useEffect(() => {
    if (items?.length > 0) {
      const allValues = items.map(item => item.value);
      setValue(allValues);
      onChangeValue?.(allValues); 
    }
  }, [items]);

  

  return (
    <View>
      {isTypeLabel ? (
        <View style={styles.labeledWrapper}>
          <TextView style={styles.labelText}>
            {dropDownLable}
            {isRequired && <TextView style={{color: 'red'}}> *</TextView>}
          </TextView>

          <DropDownPicker
            multiple={multiple}
            mode="BADGE"
            placeholder={placeholder}
            placeholderStyle={styles.labelText}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={onChangeValue}
            listMode="MODAL"
            scrollViewProps={{scrollEnabled: true}}
            disabled={!isEnabled || isDisabled}
            style={[
              styles.dropdown,
              multiple && value?.length > 2
                ? {minHeight: 25 + Math.ceil(value.length / 3) * 28}
                : null,
            ]}
            {...props}
          />
        </View>
      ) : (
        <View style={styles.unlabeledWrapper}>
          <DropDownPicker
            multiple={true}
            mode="BADGE"
            placeholder={placeholder}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={onChangeValue}
            disabled={!isEnabled || isDisabled}
            listMode="MODAL"
            {...props}
          />
        </View>
      )}
    </View>
  );
};

export default Dropdownmultiselect;

const styles = StyleSheet.create({
  labeledWrapper: {
    width: wp(79),
    alignSelf: 'center',
    marginTop: hp(2),
  },
  labelText: {
    color: Colors.SECONDARY[200],
    ...Typography.mulishbold3,
    marginBottom: 5,
    padding: hp(0.5),
  },
  dropdown: {
    marginTop: 1,
    color: Colors.SECONDARY[200],
    ...Typography.mulishbold3,
    flexWrap: 'wrap',
  },
  unlabeledWrapper: {
    width: wp(85),
    alignSelf: 'center',
    // backgroundColor: 'orange',
    marginBottom: 10,
  },
});
