import {View} from 'react-native';
import React, {FC} from 'react';
import TextView from '../TextView/textView';
import {Colors, Typography} from '@constant/index';

const BreakerText: FC<{text: string}> = ({text}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        overflow: 'hidden',
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
      }}>
      <View
        style={{
          height: 1,
          width: '85%',
          position: 'absolute',
          backgroundColor: 'grey',
          zIndex: -1,
          top: 5,
        }}
      />
      <TextView
        style={{
          opacity: 0.9,
          backgroundColor: Colors.SECONDARY[100],
          paddingHorizontal: 10,
        }}>
        {text}
      </TextView>
      <View
        style={{
          height: 1,
          width: '85%',
          position: 'absolute',
          backgroundColor: 'grey',
          zIndex: -1,
          top: 5,
        }}
      />
    </View>
  );
};

export default BreakerText;
