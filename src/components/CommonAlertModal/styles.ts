import { StyleSheet } from "react-native";
import {cardShadow, Colors,Typography} from "../../constant";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../constant/dimentions";

const styles = StyleSheet.create({

  modalViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: wp(95),
    // backgroundColor: Colors.PRIMARY[100],
    borderRadius: 20,
    alignItems: 'center',
    padding: hp(2),
  },
  modalTitleText: {
    color: Colors.SECONDARY[100],
    textAlign: 'center',
    ...Typography.mulishbold2,
  },
  modalText: {
    marginTop: hp(2),
    color: Colors.SECONDARY[100],
    textAlign:'center',
    ...Typography.mulishbold3,
  },
  actionButtonView: {
    marginTop: hp(3),
    alignSelf: 'center',
    marginBottom: hp(1),
    alignItems: 'center',
  },
  cancelButtonView: {
    marginTop: hp(2),
    alignSelf: 'center',
    marginBottom: hp(2),
    alignItems: 'center',
  },
  cancelButton: {
    borderRadius: 40,
    alignItems: 'center',
    paddingVertical: hp(1.5),
    width: wp(32),
    backgroundColor: Colors.PRIMARY[300],
    ...cardShadow
  },
  caneclButtonText: {
    color: Colors.SECONDARY[100],
    ...Typography.mulishbold3,
  }

});

export default styles;
