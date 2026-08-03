import React, { FC } from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './floattextstyles';
import { Colors, Icon } from '@constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../constant/dimentions';
import TextView from '../TextView/breaktext';

interface FloatingTextProps {
  value?: any;
  label?: String | null;
  iconType?: any;
  iconName?: any;
  multiline?: boolean;
}

const FloatingText: FC<FloatingTextProps> = ( {
  label,
  value,
  multiline,
  iconType,
  iconName,
} ) => {
  return (
    <View>
      <View
        style={ [
          styles.container,
          {
            width: multiline ? wp( 83 ) : wp( 38 ),
          },
        ] }>
        <View>
          <TextView style={ styles.label }>{ label }</TextView>
        </View>
        <View style={ styles.textView }>
          <TextView style={ styles.textValue }>{ value }</TextView>
          <View style={ styles.infoIcon }>
            <Icon
              family={ iconType }
              name={ iconName }
              color={ Colors.SECONDARY[400] }
              size={ 15 }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FloatingText;
