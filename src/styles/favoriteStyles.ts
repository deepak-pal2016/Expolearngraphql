/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from "react-native";
import { cardShadow, Colors, Typography } from "@constant/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@constant/dimentions";

const favoritebookStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: wp(4),
      paddingBottom: hp(4),
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: hp(2),
    },
    title: {
      color: Colors.SECONDARY[400],
      ...Typography.H1Bold32,
    },
    subtitle: {
      ...Typography.BodyRegular12,
      color: Colors.SECONDARY[500],
    },
    headerActions: {
      flexDirection: "row",
      gap: 10,
    },
    circleButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#ffffff",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      marginLeft: 8,
    },
    actionIcon: {
      fontSize: 18,
    },
    tabContainer: {
      flexDirection: "row",
      marginTop: 20,
      backgroundColor: "#ffffff",
      borderRadius: 22,
      padding: 6,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
    tabItem: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 18,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    tabItemActive: {
      backgroundColor: Colors.PRIMARY[100],
    },
    tabLabel: {
      color: Colors.SECONDARY[400],
      ...Typography.BodyBold13,
    },
    tabLabelActive: {
      color: Colors.SECONDARY[100],
    },
    tabCount: {
      marginLeft: 6,
      color: "#7d8a9f",
      fontSize: 14,
    },
    tabCountActive: {
      color: "#f5f1ef",
    },
    listContent: {
      paddingVertical: 20,
      paddingBottom: 120,
    },
    bookCard: {
      flexDirection: "row",
      backgroundColor: "#ffffff",
      borderRadius: 24,
      padding: 16,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
    coverPlaceholder: {
      width: 90,
      height: 130,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    coverText: {
      color: "#4a4a4a",
      fontWeight: "700",
    },
    bookInfo: {
      flex: 1,
      justifyContent: "space-between",
    },
    bookHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    bookTitle: {
      color:Colors.SECONDARY[700],
      ...Typography.BodyBold14,
      flex: 1,
    },
    favoriteDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: Colors.PRIMARY[100],
      marginLeft: 10,
    },
    bookAuthor: {
      marginTop: 6,
      color:Colors.NEUTRAL[400],
      ...Typography.BodyRegular12
    },
    bookMeta: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      gap: 10,
    },
    bookRating: {
      color: Colors.PRIMARY[200],
      fontWeight: "700",
      fontSize: 14,
    },
    bookGenre: {
      color: "#5a6772",
      fontSize: 14,
    },
    bookSummary: {
      marginTop: 10,
      color: "#5a6772",
      fontSize: 13,
      lineHeight: 18,
    },
    separator: {
      height: 16,
    },
    footerCard: {
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 20,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ffffff",
      borderRadius: 24,
      padding: 16,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 5,
    },
    footerTextBox: {
      flex: 1,
    },
    footerTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: "#1c2533",
    },
    footerSubtitle: {
      marginTop: 4,
      color: "#6d7a8c",
      fontSize: 12,
    },
    footerButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: "#ff7a26",
      backgroundColor: "rgba(255, 122, 38, 0.08)",
    },
    footerButtonText: {
      color: "#ff7a26",
      fontWeight: "700",
    },
    coverTextView: {
      ...Typography.BodyMedium13,
      color: "#111827",
      marginBottom: hp(1),
    },
  });

export default favoritebookStyles;
