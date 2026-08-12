import { StyleSheet } from 'react-native';
import Fonts from './fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '@constant/dimentions';



const Typography = StyleSheet.create({
  /* ----------------- HEADINGS ----------------- */

   H1Bold32: {
    fontFamily: Fonts.InterBold,
    fontSize: wp(5.5),
    lineHeight: 40,
  },

  H1Bold31: {
    fontFamily: Fonts.InterBold,
    fontSize: wp(4.5),
    lineHeight: 30,
  },

  H1Bold30: {
    fontFamily: Fonts.InterBold,
    fontSize: wp(3),
    lineHeight: 30,
  },

  H1Bold29: {
    fontFamily: Fonts.InterBold,
    fontSize: wp(2.5),
    lineHeight: 25,
  },

  H1Bold28: {
    fontFamily: Fonts.InterBold,
    fontSize: wp(2),
    lineHeight: 23,
  },

  H2SemiBold28: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: wp(7),
    lineHeight: 36,
  },

  H3SemiBold24: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: wp(6),
    lineHeight: 32,
  },

  H4SemiBold20: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: wp(5),
    lineHeight: 28,
  },

  H5Medium18: {
    fontFamily: Fonts.InterMedium,
    fontSize: wp(4.5),
    lineHeight: 26,
  },

  H6Medium16: {
    fontFamily: Fonts.InterMedium,
    fontSize: wp(4),
    lineHeight: 24,
  },

  /* ----------------- BODY TEXT ----------------- */

  BodyRegular16: {
    fontFamily: Fonts.InterRegular,
    fontSize: wp(6),
    lineHeight: 24,
  },

  BodyRegular15: {
    fontFamily: Fonts.InterRegular,
    fontSize: wp(4.3),
    lineHeight: 22,
  },

  BodyRegular14: {
    fontFamily: Fonts.InterRegular,
    fontSize: wp(5),
    lineHeight: 22,
  },

  BodyRegular13: {
    fontFamily: Fonts.InterRegular,
    fontSize: wp(3.5),
    lineHeight: 20,
  },

  BodyRegular12: {
    fontFamily: Fonts.InterRegular,
    fontSize: wp(3),
    lineHeight: 20,
  },

  BodyMedium14: {
    fontFamily: Fonts.InterMedium,
    fontSize: wp(3.8),
    lineHeight: 22,
  },

  BodyMedium13: {
    fontFamily: Fonts.InterMedium,
    fontSize: wp(2.1),
    lineHeight: 20,
  },

  BodyBold15: {
    fontFamily: Fonts.InterBold,
    fontSize: wp(4),
    lineHeight: 22,
  },

  BodyBold14: {
    fontFamily: Fonts.InterBold,
    fontSize: wp(3.8),
    lineHeight: 22,
  },

    BodyBold13: {
    fontFamily: Fonts.InterBold,
    fontSize: wp(3),
    lineHeight: 22,
  },


  /* ----------------- SMALL TEXT ----------------- */

  Caption12: {
    fontFamily: Fonts.InterRegular,
    fontSize: wp(3),
    lineHeight: 18,
  },

  Caption11: {
    fontFamily: Fonts.InterRegular,
    fontSize: wp(2.5),
    lineHeight: 16,
  },

  Footnote10: {
    fontFamily: Fonts.InterRegular,
    fontSize: wp(2.5),
    lineHeight: 14,
  },

  /* ----------------- BUTTON TEXT ----------------- */

  ButtonText16: {
    fontFamily: Fonts.InterRegular,
    fontSize: wp(2.1),
    lineHeight: 24,
  },
});

export default Typography;
