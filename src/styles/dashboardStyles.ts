import { StyleSheet } from 'react-native';
import { Colors, Typography } from '@constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '@constant/dimentions';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
    },
    contentStyle: {
      flex: 1,
      textAlignVertical: 'top',
      marginTop: hp(2),
    },
    greeings: {
      color: theme?.text,
      ...Typography.H1Bold31,
      letterSpacing: hp(0.2),
    },
    hiimg: {
      width: wp(3),
      height: hp(2),
      resizeMode: 'contain',
      padding: hp(1.5),
      left: hp(1),
      top: 2,
    },
    taskview: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    tasknamestyle: {
      color: Colors.SECONDARY[100],
      ...Typography.BodyBold14,
    },
    taskcontainer: {
      bottom: hp(3),
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: hp(3),
    },
    recenttile: {
      color: Colors.SECONDARY[200],
      ...Typography.H4SemiBold20,
    },
    avatarview: {
      marginLeft: hp(3),
      width: wp(10),
      height: wp(10),
      borderRadius: wp(5),
    },
  });
export default styles;
