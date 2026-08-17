/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from "react-native";
import { cardShadow, Colors, Typography } from "@constant/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@constant/dimentions";

const bookStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: wp(4),
      paddingBottom: hp(4),
    },

    /* ---------------- HEADER ---------------- */

    header: {
      height: hp(7),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    headerRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: wp(2),
    },

    headerButton: {
      width: wp(8),
      height: wp(8),
      justifyContent: "center",
      alignItems: "center",
    },

    backIcon: {
      fontSize: wp(8),
      color: "#111827",
      fontWeight: "300",
      marginTop: -3,
    },

    heartIcon: {
      fontSize: wp(5),
      color: "#111827",
    },

    /* ---------------- BOOK ---------------- */

    bookSection: {
      flexDirection: "row",
      marginTop: hp(0.5),
    },

    coverContainer: {
      width: wp(39),
      height: hp(30),
      borderRadius: wp(2),
      overflow: "hidden",
      backgroundColor: "#F3F4F6",

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 4,
    },

    bookCover: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },

    bookInfo: {
      flex: 1,
      marginLeft: wp(4),
      paddingTop: hp(1),
    },

    bookTitle: {
      ...Typography.BodyBold13,
      lineHeight: wp(6),
      color: Colors.SECONDARY[500],
    },

    author: {
      ...Typography.BodyRegular12,
      color: Colors.SECONDARY[400],
      marginTop: hp(0.8),
    },

    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: hp(1),
    },

    star: {
      fontSize: wp(4.5),
      color: "#F07401",
      marginRight: wp(1),
    },

    rating: {
      ...Typography.BodyMedium14,
      color: "#F07401",
    },

    reviewCount: {
      ...Typography.BodyRegular12,
      color: "#6B7280",
      marginTop: hp(0.4),
    },

    categoryRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: hp(1.5),
      gap: wp(2),
    },

    category: {
      paddingHorizontal: wp(3),
      paddingVertical: hp(0.7),
      backgroundColor: "#F4F3F8",
      borderRadius: wp(3),
    },

    categoryText: {
      ...Typography.Caption11,
      color: "#606779",
    },

    /* ---------------- DESCRIPTION ---------------- */

    descriptionContainer: {
      marginTop: hp(2.2),
    },

    description: {
      ...Typography.BodyRegular13,
      color: "#697386",
      lineHeight: hp(2.5),
    },

    readMore: {
      ...Typography.BodyMedium13,
      color: "#F07401",
      marginTop: hp(0.5),
    },

    metaRow: {
      marginTop: hp(1.8),
    },

    metaItem: {
      flexDirection: "row",
      alignItems: "center",
    },

    metaIcon: {
      color: "#6B7280",
      fontSize: wp(3.5),
      marginRight: wp(2),
    },

    metaText: {
      ...Typography.BodyRegular12,
      color: "#6B7280",
    },

    actionRow: {
      flexDirection: "row",
      gap: wp(3),
      marginTop: hp(2),
    },

    readButton: {
      flex: 1,
      height: hp(5.8),
      borderRadius: wp(2),
      backgroundColor: Colors.PRIMARY[100],
      justifyContent: "center",
      alignItems: "center",
    },

    readButtonText: {
      ...Typography.BodyMedium14,
      color: "#FFFFFF",
    },

    libraryButton: {
      flex: 1,
      height: hp(5.8),
      borderRadius: wp(2),
      borderWidth: 1,
      borderColor: "#1F2937",
      justifyContent: "center",
      alignItems: "center",
    },

    libraryButtonText: {
      ...Typography.BodyMedium14,
      color: "#111827",
    },

    /* ---------------- REVIEWS ---------------- */

    reviewHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: hp(3),
      marginBottom: hp(1.5),
    },

    reviewTitle: {
      ...Typography.BodyBold14,
      color: "#111827",
    },

    viewAll: {
      ...Typography.BodyBold14,
      color: Colors.PRIMARY[200],
    },

    reviewCard: {
      paddingBottom: hp(2),
    },

    reviewerTop: {
      flexDirection: "row",
      alignItems: "center",
    },

    avatar: {
      width: wp(10),
      height: wp(10),
      borderRadius: wp(5),
      backgroundColor: "#F2D5B8",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },

    avatarText: {
      fontSize: wp(6),
    },

    reviewerInfo: {
      marginLeft: wp(3),
      flex: 1,
    },

    reviewerName: {
      ...Typography.BodyBold13,
      color: Colors.SECONDARY[500],
    },

    reviewRating: {
      marginTop: hp(0.3),
    },

    reviewStars: {
      fontSize: wp(3),
      color: "#F07401",
      letterSpacing: 1,
    },

    reviewDate: {
      ...Typography.Caption11,
      color: Colors.SECONDARY[400],
      alignSelf: "flex-start",
    },

    reviewText: {
      ...Typography.BodyRegular12,
      color: Colors.SECONDARY[400],
      lineHeight: hp(2.3),
      marginTop: hp(1),
      marginLeft: wp(13),
    },

    headerTitle: {
      fontSize: 21,
      fontWeight: "700",
      color: Colors.SECONDARY[200],
    },

    /* Tabs */

    tabsContainer: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      gap: 8,
    },

    tab: {
      height: 34,
      paddingHorizontal: 15,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
    },

    activeTab: {
      backgroundColor: Colors.PRIMARY[100],
      borderColor: Colors.SECONDARY[500],
    },

    tabText: {
      ...Typography.BodyRegular12,
      color: Colors.SECONDARY[400],
    },

    activeTabText: {
      color: Colors.SECONDARY[100],
      ...Typography.H1Bold28,
    },

    /* Books */

    booksContainer: {
      paddingHorizontal: 10,
      paddingTop: 10,
    },

    bookCard: {
      minHeight: 108,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#E8E8EC",
      marginBottom: 10,
      padding: 8,
      flexDirection: "row",

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.04,
      shadowRadius: 5,

      elevation: 2,
    },

    bookImage: {
      width: 54,
      height: 76,
      borderRadius: 5,
      backgroundColor: "#F3F4F6",
    },

    bookDetails: {
      flex: 1,
      marginLeft: 10,
    },

    titleRow: {
      flexDirection: "row",
      alignItems: "flex-start",
    },

    titleContainer: {
      flex: 1,
      paddingRight: 5,
    },

    bookCardTitle: {
      fontSize: 12,
      lineHeight: 15,
      fontWeight: "700",
      color: Colors.SECONDARY[200],
    },

    bookCardAuthor: {
      marginTop: 2,
      fontSize: 9,
      color: Colors.FLOATINGINPUT[200],
    },

    moreButton: {
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
    },

    bookCardRatingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 3,
    },

    bookCardRating: {
      marginLeft: 4,
      ...Typography.BodyBold13,
      color: Colors.PRIMARY[100],
    },

    progressRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 7,
    },

    progressBackground: {
      flex: 1,
      height: 4,
      backgroundColor: "#E8E8EE",
      borderRadius: 10,
      overflow: "hidden",
    },

    progressFill: {
      height: "100%",
      backgroundColor: Colors.PRIMARY[100],
      borderRadius: 10,
    },

    progressText: {
      width: 32,
      marginLeft: 6,
      fontSize: 9,
      color: "#4B5563",
      textAlign: "right",
    },

    /* Continue Button */

    continueButton: {
      width: 100,
      height: 22,
      borderWidth: 1,
      borderColor: "#7C5CFF",
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
    },

    continueText: {
      color: Colors.SECONDARY[200],
      ...Typography.BodyMedium13,
      textAlign: "center",
    },

    /* Empty */

    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 100,
    },

    emptyTitle: {
      marginTop: 15,
      fontSize: 16,
      fontWeight: "700",
      color: Colors.SECONDARY[200],
    },

    emptyText: {
      marginTop: 5,
      fontSize: 12,
      color: Colors.SECONDARY[500],
    },

    /* Floating Button */

    floatingButton: {
      position: "absolute",
      right: 18,
      bottom: 72,
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: Colors.PRIMARY[100],
      alignItems: "center",
      justifyContent: "center",

      shadowColor: Colors.PRIMARY[100],
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },

    screen: {
      flex: 1,
      backgroundColor: "#071021",
    },

    inputWrapper: {
      bottom: hp(3),
      justifyContent: "space-evenly",
    },

    backButton: {
      position: "absolute",
      left: 20,
      bottom: 25,
      width: 60,
      height: 60,
      borderRadius: 20,
      backgroundColor: "#202A3B",
      alignItems: "center",
      justifyContent: "center",
    },

    coverUpload: {
      height: 325,
      marginHorizontal: 45,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: "#394457",
      borderStyle: "dashed",
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
    },

    imagePlaceholder: {
      width: wp(50),
      height: hp(20),
      borderRadius: 20,
      borderWidth: 4,
      borderColor: "#303B4E",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },

    cameraButton: {
      position: "absolute",
      right: -32,
      bottom: -8,
      width: wp(14),
      height: wp(14),
      borderRadius: wp(7),
      backgroundColor: Colors.PRIMARY[100],
      alignItems: "center",
      justifyContent: "center",
    },

    coverImage: {
      width: "100%",
      height: "100%",
      borderRadius: 23,
      resizeMode: "cover",
    },

    uploadTitle: {
      marginTop: hp(2),
      color: Colors.SECONDARY[100],
      ...Typography.BodyBold14,
    },

    uploadSubTitle: {
      marginTop: 2,
      color: Colors.SECONDARY[100],
      ...Typography.BodyBold13,
    },

    /* ================= FORM ================= */

    formContainer: {
      backgroundColor: Colors.SECONDARY[100],
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 25,
      paddingTop: 25,
      paddingBottom: 30,
    },

    inputGroup: {
      marginBottom: 15,
      flex: 1,
      bottom:hp(1.3)
    },

    label: {
      color: theme.text,
      ...Typography.BodyBold13,
      bottom:6
    },

    inputContainer: {
      height: 62,
      borderWidth: 1.5,
      borderColor: "grey",
      borderRadius: 17,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      backgroundColor: "#FFFFFF",
    },

    inputIcon: {
      color: "#344057",
      marginRight: 14,
    },

    rightIcon: {
      color: "#344057",
      marginLeft: "auto",
    },

    input: {
      flex: 1,
      fontSize: 16,
      color: "grey",
      paddingVertical: 0,
    },

    /* ================= DESCRIPTION ================= */

    descriptionContainer: {
      minHeight: 95,
      borderWidth: 1.5,
      borderColor: "grey",
      borderRadius: 17,
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingTop: 16,
    },

    descriptionIcon: {
      marginRight: 14,
    },

    descriptionInput: {
      flex: 1,
      fontSize: 16,
      color: "grey",
      textAlignVertical: "top",
    },

    /* ================= TWO COLUMN ================= */

    twoColumn: {
      flexDirection: "row",
      // padding:hp(1),
      top: hp(2),
      width: wp(100),
      alignSelf: "center",
      justifyContent: "space-evenly",
    },

    halfInput: {
      width: wp(45),
      height: hp(10),
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
    },

    selectText: {
      flex: 1,
      fontSize: 16,
      color: "grey",
      marginLeft: 14,
    },

    /* ================= RATING ================= */

    ratingContainer: {
      height: hp(6),
      borderWidth: 1,
      borderColor: Colors.SECONDARY[400],
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
    },

    stars: {
      flexDirection: "row",
      flex: 1,
    },

    star: {
      marginRight: 9,
    },

    ratingText: {
      fontSize: 18,
      color: "#8992A5",
    },

    switchRow: {
      flexDirection: "row",
      gap: 15,
      marginBottom: 20,
    },

    switchBox: {
      flex: 1,
      height: 62,
      borderWidth: 1.5,
      borderColor: "grey",
      borderRadius: 17,
      paddingHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    switchLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    switchText: {
      ...Typography.BodyBold13,
      color: Colors.SECONDARY[500],
    },

    /* ================= ADD BUTTON ================= */

    addButton: {
      height: 68,
      borderRadius: 18,
      backgroundColor: Colors.PRIMARY[100],
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },

    addButtonText: {
      fontSize: 21,
      fontWeight: "700",
      color: "#FFFFFF",
    },

    bottomNav: {
      height: 92,
      backgroundColor: "#FFFFFF",
      borderTopWidth: 1,
      borderTopColor: "#E5E7EB",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingBottom: 8,
    },

    navItem: {
      alignItems: "center",
      justifyContent: "center",
      minWidth: 60,
    },

    navText: {
      marginTop: 5,
      fontSize: 12,
      color: "#667085",
    },

    activeNavText: {
      color: Colors.PRIMARY[100],
      fontWeight: "700",
    },
  });

export default bookStyles;
