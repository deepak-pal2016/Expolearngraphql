/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from "react-native";
import { cardShadow, Colors, Typography } from "@constant/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@constant/dimentions";

const searchstyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    recentsearch: {
      paddingHorizontal: wp(4),
      paddingVertical: hp(0.8),
      borderRadius: hp(2),
      backgroundColor: Colors.PRIMARY[400],
      marginRight: wp(2),
      // ...cardShadow,
    },
    trendingschers:{
        color:Colors.SECONDARY[200],
        ...Typography.BodyBold13
    }
  });

export default searchstyles;
