/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "@constant/dimentions";
import { cardShadow, Colors, Typography } from "@constant/index";

const styles = (theme:any) => StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: hp(1),
        borderColor: Colors.SECONDARY[400],
        backgroundColor: Colors.SECONDARY[100],
        width: wp(80),
        alignSelf: 'center',
        flexDirection: 'column',
        marginTop: hp(1),
        shadowColor: Colors.PRIMARY[100],
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 10,
        shadowRadius: 20,
        elevation: 5,
    },
    input: {
       bottom:hp(.0),
        color: Colors.SECONDARY[200],
        ...Typography.H1Bold30,
        paddingHorizontal: hp(5),
        borderRadius: hp(1),
        textAlignVertical:'center'
    },
    labelContainer: {
        position: 'absolute',
        paddingHorizontal: hp(5),
    },
    label: {
        color: Colors.SECONDARY[200],
        ...Typography.Caption12,
        bottom: 2.5
    },
    error: {
        marginTop: hp(.5),
        marginLeft: hp(.5),
        color: Colors.ERROR[100],
        maxWidth: wp(90),
        ...Typography.BodyBold13,
    },
    secureBtn: {
        position: 'absolute',
        right: 15,
        top: hp(2),
    },
    eyeStyle: {
        height: wp(5),
        width: wp(6),
        tintColor: Colors.SECONDARY[400],
        resizeMode: 'contain',
    },
    lefticon: {
        width: hp(2),
        height: hp(.6),
        left: hp(1.4),
        top: hp(1.9),
    },
    floatlabelcontainer: {
        flexDirection: 'row',
        width: wp(45),
    },
    floatlable: {
        color: theme?.text,
        ...Typography.BodyRegular12,
        left: hp(1),
        top:hp(.2)
    }
});

export default styles;
