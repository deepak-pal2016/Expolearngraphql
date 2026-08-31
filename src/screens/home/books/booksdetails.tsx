/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackProps } from "src/@types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dashboardstyle from "../../../styles/dashboardStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@constant/dimentions";
import {
  CommonLoader,
  DarkTheme,
  FloatingTextInput,
  Header,
  LightTheme,
  PopularBooks,
  TextView,
  Recommneded,
  TopResults,
} from "@components/index";
import { Colors, Icon, Typography, Images } from "@constant/index";
import { ThemeContext } from "../../../context/themeContext";
import searchstyles from "@/styles/searchStyles";
import bookStyles from "@/styles/booksStyles";
// import messaging from '@react-native-firebase/messaging';
// import notifee from '@notifee/react-native';
type BookdetailsNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "Bookdetails"
>;

const Bookdetails: FC = () => {
  const route: any = useRoute();
  const { showLoader, hideLoader } = CommonLoader();
  const navigation = useNavigation<BookdetailsNavigationType>();
  const { theme, themetoggle } = useContext(ThemeContext);
  const [selectcatid, setSelectCatId] = useState<number>(0);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = bookStyles(currentTheme);
  const { itemdetails } = route?.params;

  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor:
            theme === "dark" ? currentTheme?.background : Colors.PRIMARY[700],
        },
      ]}
    >
      <Header showicons={true} title="Book Details" showheader={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.bookSection}>
          <View style={styles.coverContainer}>
            <Image
              source={{
                uri: itemdetails?.coverimage,
              }}
              style={styles.bookCover}
            />
          </View>

          <View style={styles.bookInfo}>
            <TextView style={styles.bookTitle}>{itemdetails?.title}</TextView>

            <TextView style={styles.author}>{itemdetails?.author}</TextView>

            <View style={styles.ratingRow}>
              <TextView style={styles.star}>★</TextView>
              <TextView style={styles.rating}>{itemdetails?.rating}</TextView>
            </View>

            <Text style={styles.reviewCount}>
              {`(${itemdetails?.totalreviews ?? 0} reviews)`}
            </Text>

            {/* Categories */}
            <View style={styles.categoryRow}>
              <View style={styles.category}>
                <TextView style={styles.categoryText}>
                  {itemdetails?.genre}
                </TextView>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <TextView style={styles.description}>
            {itemdetails?.description}
          </TextView>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <TextView style={styles.metaIcon}>▣</TextView>
            <TextView style={styles.metaText}>
              {itemdetails?.pages} Pages
            </TextView>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReadBook", { bookcontent: itemdetails })
            }
            activeOpacity={0.8}
            style={styles.readButton}
          >
            <TextView style={styles.readButtonText}>Read Now</TextView>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.libraryButton}>
            <TextView style={styles.libraryButtonText}>Add to Library</TextView>
          </TouchableOpacity>
        </View>

        <View style={styles.reviewHeader}>
          <TextView style={styles.reviewTitle}>Reviews</TextView>

          <TouchableOpacity>
            <TextView style={styles.viewAll}>View all</TextView>
          </TouchableOpacity>
        </View>

        <View style={styles.reviewCard}>
          <View style={styles.reviewerTop}>
            <View style={styles.avatar}>
              <TextView style={styles.avatarText}>👩🏻</TextView>
            </View>
            <View style={styles.reviewerInfo}>
              <TextView style={styles.reviewerName}>Sarah Johnson</TextView>
              <View style={styles.reviewRating}>
                <TextView style={styles.reviewStars}>★★★★★</TextView>
              </View>
            </View>
            <TextView style={styles.reviewDate}>2 days ago</TextView>
          </View>

          <TextView style={styles.reviewText}>
            A beautiful and thought-provoking book about choices and regrets.
          </TextView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Bookdetails;
