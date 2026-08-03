import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../constant/dimentions';

import {Colors, Typography} from '../../constant';

const styles = StyleSheet.create({
  container: {
    marginLeft: hp(1),
    marginTop: hp(1),
    borderRadius: 5,
    marginRight: hp(1),
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
    borderBottomColor: Colors.SECONDARY[200],
    borderBottomWidth: 0.4,
    paddingBottom: 5,
    justifyContent: 'space-between',
  },
  textValue: {
    color: Colors.SECONDARY[200],
    marginTop: hp(0.1),
    maxWidth: wp(75),
    ...Typography.mulishbold2,
  },
  labelContainer: {
    paddingHorizontal: hp(1),
  },
  label: {
    color: Colors.SECONDARY[400],
    ...Typography.mulishbold2,
  },
  infoIcon: {
    right: 0,
    top: 1,
  },
});

export default styles;
