import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Typography } from "../../constant";

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.ERROR[100],
        backgroundColor: 'transparent',
        width: wp(88),
        flexDirection: 'column'
    },
    input: {
        marginTop: hp(1.3),
        color: Colors.SECONDARY[200],
        ...Typography.BodyRegular13,
        paddingHorizontal: wp(8),
    },
    labelContainer: {
        position: 'absolute',
        paddingHorizontal: hp(5),
        paddingVertical: hp(1.3)

    },
    label: {
        color: Colors.PRIMARY[100],
        ...Typography.BodyMedium13,
    },
    error: {
        marginTop: hp(0.5),
        marginLeft: wp(1),
        color: Colors.ERROR[100],
        maxWidth: wp(90),
        ...Typography.mulishbold2,
    },
    secureBtn: {
        position: 'absolute',
        right: 15,
        top: hp(3),
        height:hp(3), 
        width: wp(7),
    },
    eyeStyle: {
        height: wp(7),
        width: wp(6),
        tintColor: Colors.SECONDARY[800],
        resizeMode: 'contain',
    },
    lefticon: {
        width: hp(2),
        height: hp(.6),
        left: hp(1),
        // top: hp(2.1),
    },
    floatlabelcontainer: {
        flexDirection: 'row',
        width: wp(45),
    }
});

export default styles;
