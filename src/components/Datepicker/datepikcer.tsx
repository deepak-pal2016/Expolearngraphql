import React, { FC, useState } from "react";
import {
  View,
  ViewStyle,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextView from "../TextView/textView";
import { Colors, Images, Typography } from "@/constant";

interface DatePickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  width?: ViewStyle["width"];
  error?: string;
}

const DatePickerComponent: FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  width = "100%",
  error,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);

    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={{ width }}>
      {label && <TextView style={styles.label}>{label}</TextView>}

      <Pressable
        style={[
          styles.inputContainer,
          error && styles.errorBorder,
        ]}
        onPress={() => setShowPicker(true)}
      >
        <Image
          source={Images.ic_calendar}
          style={styles.calendarIcon}
        />

        <TextView style={styles.dateText}>
          {value.toLocaleDateString("en-GB")}
        </TextView>
      </Pressable>

      {error && (
        <TextView style={styles.errorText}>
          {error}
        </TextView>
      )}

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 25,
    bottom: 2,
  },

  inputContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.SECONDARY[300],
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.SECONDARY[100],
  },

  errorBorder: {
    borderColor: Colors.ERROR[100],
  },

  dateText: {
    color: Colors.SECONDARY[400],
    ...Typography.BodyBold13,
  },

  calendarIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },

  errorText: {
    color: Colors.ERROR[100],
    marginTop: 4,
    fontSize: 12,
  },
});

export default DatePickerComponent;