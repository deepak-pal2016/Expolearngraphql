import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ViewStyle,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '@constant/dimentions';
import {Colors, Typography, Icon} from '@constant/index';
import TextView from '@components/TextView/textView';

interface CommonDatePickerProps {
  label?: string;
  value?: Date | null;
  onDateChange?: (date: Date) => void;
  mode?: 'date' | 'time';
  totalwidths?: ViewStyle;
  borderStyle?: ViewStyle;
  totalheights?: ViewStyle;
  disabled?: boolean;
  error?: string;
}

const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
  label,
  value = null,
  onDateChange,
  mode = 'date',
  totalwidths,
  borderStyle,
  totalheights,
  disabled,
  error,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      setSelectedDate(date);
      if (onDateChange) onDateChange(date);
    }
    setShowPicker(false);
  };

  const formattedDate = selectedDate ? selectedDate.toLocaleDateString() : '';

  return (
    <View style={[styles.container, totalwidths]}>
      {label && <Text style={[styles.label, totalheights]}>{label}</Text>}

      <TouchableOpacity
        onPress={() => {
          if (!disabled) setShowPicker(true);
        }}
        style={[
          styles.dateBox,
          borderStyle,
          disabled && {opacity: 0.5},
          error && {borderColor: Colors.ERROR[100]},
        ]}
        activeOpacity={disabled ? 1 : 0.8}>
        <TextView style={[{color: Colors.SECONDARY[200], ...Typography.mulishbold2}]}>
          {formattedDate || ''}
        </TextView>
        <Icon
          name="calendar"
          size={20}
          family="Ionicons"
          color={Colors.PRIMARY[100]}
        />
      </TouchableOpacity>

      {showPicker && !disabled && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CommonDatePicker;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: wp(90),
    backgroundColor: 'white',
  },
  label: {
    color: Colors.SECONDARY[100],
    ...Typography.mulishbold3,
    marginBottom: 5,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: Colors.SECONDARY[200],
    borderRadius: 8,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: Colors.ERROR[100],
    ...Typography.mulishbold2,
    marginTop: 4,
    marginLeft: wp(2),
  },
});
