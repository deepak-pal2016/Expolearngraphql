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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },

  headerButton: {
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: wp(8),
    color: '#111827',
    fontWeight: '300',
    marginTop: -3,
  },

  heartIcon: {
    fontSize: wp(5),
    color: '#111827',
  },

  /* ---------------- BOOK ---------------- */

  bookSection: {
    flexDirection: 'row',
    marginTop: hp(0.5),
  },

  coverContainer: {
    width: wp(39),
    height: hp(30),
    borderRadius: wp(2),
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },

  bookCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },

  star: {
    fontSize: wp(4.5),
    color: '#F07401',
    marginRight: wp(1),
  },

  rating: {
    ...Typography.BodyMedium14,
    color: '#F07401',
  },

  reviewCount: {
    ...Typography.BodyRegular12,
    color: '#6B7280',
    marginTop: hp(0.4),
  },

  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(1.5),
    gap: wp(2),
  },

  category: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.7),
    backgroundColor: '#F4F3F8',
    borderRadius: wp(3),
  },

  categoryText: {
    ...Typography.Caption11,
    color: '#606779',
  },

  /* ---------------- DESCRIPTION ---------------- */

  descriptionContainer: {
    marginTop: hp(2.2),
  },

  description: {
    ...Typography.BodyRegular13,
    color: '#697386',
    lineHeight: hp(2.5),
  },

  readMore: {
    ...Typography.BodyMedium13,
    color: '#F07401',
    marginTop: hp(0.5),
  },


  metaRow: {
    marginTop: hp(1.8),
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaIcon: {
    color: '#6B7280',
    fontSize: wp(3.5),
    marginRight: wp(2),
  },

  metaText: {
    ...Typography.BodyRegular12,
    color: '#6B7280',
  },

  actionRow: {
    flexDirection: 'row',
    gap: wp(3),
    marginTop: hp(2),
  },

  readButton: {
    flex: 1,
    height: hp(5.8),
    borderRadius: wp(2),
    backgroundColor:Colors.PRIMARY[100],
    justifyContent: 'center',
    alignItems: 'center',
  },

  readButtonText: {
    ...Typography.BodyMedium14,
    color: '#FFFFFF',
  },

  libraryButton: {
    flex: 1,
    height: hp(5.8),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },

  libraryButtonText: {
    ...Typography.BodyMedium14,
    color: '#111827',
  },

  /* ---------------- REVIEWS ---------------- */

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
    marginBottom: hp(1.5),
  },

  reviewTitle: {
    ...Typography.BodyBold14,
    color: '#111827',
  },

  viewAll: {
    ...Typography.BodyBold14,
    color: Colors.PRIMARY[200],
  },

  reviewCard: {
    paddingBottom: hp(2),
  },

  reviewerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#F2D5B8',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
    color: '#F07401',
    letterSpacing: 1,
  },

  reviewDate: {
    ...Typography.Caption11,
    color:Colors.SECONDARY[400],
    alignSelf: 'flex-start',
  },

  reviewText: {
    ...Typography.BodyRegular12,
    color: Colors.SECONDARY[400],
    lineHeight: hp(2.3),
    marginTop: hp(1),
    marginLeft: wp(13),
  },
  });

export default bookStyles;
