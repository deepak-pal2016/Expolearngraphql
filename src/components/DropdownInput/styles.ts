/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "@constant/dimentions";
import { cardShadow, Colors, Typography } from "@constant/index";


const styles = (theme:any) => StyleSheet.create({
  wrapper: {
    width: '80%',
    alignSelf: 'center',
    marginTop: hp(2),
    overflow: 'visible',
  },
  labelText: {
    color:theme?.text,
    ...Typography.BodyRegular12,
    marginBottom: 4,
  },
  placeholderText: {
    color: Colors.SECONDARY[200],
    ...Typography.BodyMedium13,
  },
  dropdown: {
    borderColor: Colors.PRIMARY[100],
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: wp(3),   // ✅ REQUIRED
    minHeight: hp(6.5),
    // ...cardShadow
  },
  errorText: {
    color: Colors.ERROR[100],
    ...Typography.BodyRegular12,
    marginTop: 4,
    left: hp(.4),
  },
});


export default styles