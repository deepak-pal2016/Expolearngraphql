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
import { useNavigation } from "@react-navigation/native";
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
import { UserData, UserDataContext } from "../../../context/userDataContext";
import searchstyles from "@/styles/searchStyles";
// import messaging from '@react-native-firebase/messaging';
// import notifee from '@notifee/react-native';
type SearchscreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "Search"
>;

const Search: FC = () => {
  const { showLoader, hideLoader } = CommonLoader();
  const navigation = useNavigation<SearchscreenNavigationType>();
  const { theme, themetoggle } = useContext(ThemeContext);
  const [selectcatid, setSelectCatId] = useState<number>(0);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = searchstyles(currentTheme);
  const { userData, setIsLoggedIn } = useContext<UserData>(UserDataContext);

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp(5),
          flexGrow: 1,
        }}
      >
        <Header showicons={false} title="Search" showheader={true} />
        <View style={{ flexDirection: "column", bottom: hp(2) }}>
          <View style={{ alignSelf: "center" }}>
            <FloatingTextInput
              lefticon={Images.ic_search}
              style={{ width: wp(88) }}
              backcolor={Colors.PRIMARY[400]}
              placeholder="Search books, authors and genre.."
              //  touched={touched.password}
              //  error={errors.password}
              //  value={values.password}
              onChangeText={(text: any) => console.log(text, "textt")}
            />
          </View>

          <View
            style={{
              alignSelf: "flex-start",
              padding: hp(3),
              flexDirection: "column",
            }}
          >
            <TextView style={styles.trendingschers}>Recent Searches</TextView>
            <View style={{ flexDirection: "row", padding: hp(1) }}>
              <View style={styles.recentsearch}>
                <TextView>Atomic Habitd</TextView>
              </View>
              <View style={styles.recentsearch}>
                <TextView>Sapeiens</TextView>
              </View>
            </View>
            <View style={{ flexDirection: "row", padding: hp(1) }}>
              <View style={styles.recentsearch}>
                <TextView>The Alchemist </TextView>
              </View>
              <View style={styles.recentsearch}>
                <TextView>Think and grow rich</TextView>
              </View>
            </View>
          </View>

          <View
            style={{
              alignSelf: "flex-start",
              padding: hp(3),
              flexDirection: "column",
            }}
          >
            <TextView style={styles.trendingschers}>Trending Searches</TextView>
            <View style={{ flexDirection: "row", padding: hp(1) }}>
              <View style={styles.recentsearch}>
                <TextView>Atomic Habitd</TextView>
              </View>
              <View style={styles.recentsearch}>
                <TextView>Sapeiens</TextView>
              </View>
            </View>
            <View style={{ flexDirection: "row", padding: hp(1) }}>
              <View style={styles.recentsearch}>
                <TextView>The Alchemist </TextView>
              </View>
              <View style={styles.recentsearch}>
                <TextView>Think and grow rich</TextView>
              </View>
            </View>
          </View>

          <View style={{padding:hp(3)}}>
            <TopResults />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
