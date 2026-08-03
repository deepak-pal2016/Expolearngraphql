import { StyleSheet } from 'react-native';
import { Colors, Fonts, Typography } from '../../constant';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../constant/dimentions';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: hp(2),
    paddingVertical: hp(1.8),
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.SECONDARY[100],
  },
  disabledButtonContainer: {
    borderRadius: hp(5),
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: Colors.SECONDARY[200],
    borderColor: Colors.SECONDARY[200],
  },

  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.SECONDARY[100],
    ...Typography.BodyMedium14,
  },
  disabledBtnText: {
    color: Colors.PRIMARY[300],
    ...Typography.BodyBold14,
  },

  indicatorStyle: {
    width: '100%',
    justifyContent: 'center',
  },

  touchableOpacityStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconStyle: {
    width: wp(8),
    height: hp(2.5),
    bottom: 1,
    resizeMode: 'contain',
  },
});

export default styles;
