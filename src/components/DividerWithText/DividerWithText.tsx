import TextView from '@components/TextView/textView';
import { Typography, Colors } from '@constant/index';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  title: string;
}

const DividerWithText: FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <TextView style={styles.text}>{title}</TextView>
      <View style={styles.line} />
    </View>
  );
};

export default DividerWithText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
    paddingHorizontal:40
  },

  line: {
    width: '30%',
    height: 1,
    backgroundColor: Colors.FLOATINGINPUT[100],
  },

  text: {
    marginHorizontal: 10,
    color: Colors.SECONDARY[500],
    ...Typography.BodyBold14,
  },
});
