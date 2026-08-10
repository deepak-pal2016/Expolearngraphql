/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from "react-native";
import { cardShadow, Colors, Typography } from "@constant/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@constant/dimentions";

const profileStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
    },
    conentview: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingHorizontal: hp(4),
      bottom: hp(3),
    },
    imgview: {
      width: wp(30),
      height: wp(30),
      borderRadius: wp(15),
      resizeMode: "cover",
    },
    nametext: {
      textAlign: "center",
      color: theme?.text,
      ...Typography.BodyRegular16,
    },
    itemview: {
      marginTop: hp(2),
      backgroundColor: "#1f2937",
      borderRadius: 16,
      paddingVertical: hp(1),
      marginHorizontal: wp(5),
    },
    menuitem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: hp(1),
      paddingHorizontal: wp(5),
      borderBottomWidth: 0.5,
      borderBottomColor: "#374151",
    },
    logoutview: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: hp(1),
      paddingHorizontal: wp(5),
    },
    emailtext: {
      color: theme?.text,
      ...Typography.BodyRegular13,
      textAlign: "center",
      padding: hp(1),
    },

    scrollContent: {
      paddingBottom: 70,
    },

    profileHeader: {
      height: 270,
      alignItems: "center",
      paddingTop: 35,
      paddingHorizontal: 8,
      backgroundColor: "#0c1322",
    },

    avatar: {
      width: 74,
      height: 74,
      borderRadius: 37,
      borderWidth: 2,
      borderColor: "#D9DCE5",
    },

    name: {
      marginTop: 9,
      color: Colors.SECONDARY[100],
      ...Typography.BodyBold14,
      fontWeight: "500",
    },

    email: {
      marginTop: 3,
      color: Colors.NEUTRAL[100],
      ...Typography.BodyRegular13,
    },

    statsContainer: {
      width: "100%",
      height: 68,
      marginTop: 18,

      flexDirection: "row",
      alignItems: "center",

      backgroundColor: "#111D31",
      borderRadius: 9,

      paddingHorizontal: 5,
    },

    statItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    statTitle: {
      color: Colors.NEUTRAL[100],
      ...Typography.ButtonText16,
      marginBottom: 4,
    },

    statValue: {
      color: Colors.NEUTRAL[100],
      ...Typography.BodyBold14,
    },

    statDivider: {
      width: 1,
      height: 34,
      backgroundColor: "#3B4558",
    },

    // =========================
    // MENU
    // =========================

    menuContainer: {
      flex: 1,

      backgroundColor: "#FFFFFF",

      borderTopLeftRadius: 23,
      borderTopRightRadius: 23,

      paddingHorizontal: 17,
      paddingTop: 7,
    },

    menuItem: {
      height: 64,

      flexDirection: "row",
      alignItems: "center",

      borderBottomWidth: 1,
      borderBottomColor: "#EEEEEE",
    },

    lastMenuItem: {
      borderBottomWidth: 0,
    },

    menuIconContainer: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",

      marginRight: 10,
    },

    menuTitle: {
      flex: 1,
      color: Colors.SECONDARY[400],
      ...Typography.BodyBold13,
    },

    bottomNavigation: {
      position: "absolute",

      bottom: 0,
      left: 0,
      right: 0,

      height: 62,

      backgroundColor: "#FFFFFF",

      borderTopWidth: 1,
      borderTopColor: "#EEEEEE",

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",

      paddingBottom: 3,
    },

    navItem: {
      flex: 1,

      alignItems: "center",
      justifyContent: "center",

      gap: 4,
    },

    navText: {
      fontSize: 8,
      color: Colors.SECONDARY[400],
    },

    activeText: {
      color: Colors.PRIMARY[100],
      fontWeight: "600",
    },
  });

export default profileStyles;
