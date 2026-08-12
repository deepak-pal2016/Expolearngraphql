/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from "react-native";
import { cardShadow, Colors, Typography } from "@constant/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@constant/dimentions";

const loginstyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    logostyles: {
      width: wp(120),
      height: wp(70),
      resizeMode: "contain",
      alignSelf: "center",
      top: hp(4),
    },
    apptitle: {
      color: theme.text,
      ...Typography.H4SemiBold20,
      textAlign: "center",
    },
    hiimg: {
      width: wp(2),
      height: hp(1),
      resizeMode: "contain",
      padding: hp(1.5),
      left: hp(1),
      top: 2,
    },
    panel: {
      // flex: 1,
      alignSelf: "center",
      marginTop: hp(3),
    },
    inputWrapper: {
      bottom: hp(1),
      justifyContent: "space-evenly",
    },
    buttonview: { marginTop: hp(3), width: wp(89), alignSelf: "center" },
    singuptitle: {
      color: Colors.PRIMARY[100],
      left: hp(1),
      ...Typography.BodyBold14,
    },
    accounttext: {
      color: theme?.text,
      ...Typography.H1Bold29,
    },
    policytext: {
      color: Colors.SECONDARY[200],
      ...Typography.H1Bold28,
      left: 5,
    },
    termstext: {
      color: Colors.PRIMARY[100],
      ...Typography.H1Bold28,
    },
    alreadyaccount: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: hp(2),
    },
  });

export default loginstyles;
