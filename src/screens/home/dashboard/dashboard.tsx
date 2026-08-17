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
} from "@components/index";
import { Colors, Icon, Typography, Images } from "@constant/index";
import { cardShadow } from "@constant/index";
import { ThemeContext } from "../../../context/themeContext";
import { UserData, UserDataContext } from "../../../context/userDataContext";
import { LocalStorage } from "@helpers/localstorage";
import { UsePagination } from "../../../hooks/usepagination";
import { showError, showSuccess } from "@components/Flashmessge";

type DashboardscreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "Dashboard"
>;

export const categories = [
  {
    id: 1,
    title: "All",
    value: "all",
    isSelected: true,
  },
  {
    id: 2,
    title: "Fiction",
    value: "fiction",
    isSelected: false,
  },
  {
    id: 3,
    title: "Programming",
    value: "programming",
    isSelected: false,
  },
  {
    id: 4,
    title: "History",
    value: "history",
    isSelected: false,
  },
  {
    id: 5,
    title: "Business",
    value: "business",
    isSelected: false,
  },
  {
    id: 6,
    title: "Science",
    value: "science",
    isSelected: false,
  },
  {
    id: 7,
    title: "Biography",
    value: "biography",
    isSelected: false,
  },
  {
    id: 8,
    title: "Self Help",
    value: "self_help",
    isSelected: false,
  },
];

const Dashboard: FC = () => {
  const { showLoader, hideLoader } = CommonLoader();
  const navigation = useNavigation<DashboardscreenNavigationType>();
  const { theme, themetoggle } = useContext(ThemeContext);
  const [selectcatid, setSelectCatId] = useState<number>(0);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = dashboardstyle(currentTheme);
  const { setIsLoggedIn, setUserData, userData } = useContext<UserData>(UserDataContext);
  // console.log(userData,'userData');
  
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
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              justifyContent: "space-between",
              // paddingLeft: hp(2),
              flexDirection: "row",
              padding: hp(3),
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TextView style={styles.greeings}>
                Hello, {`${userData?.name}`}
              </TextView>
              <Image source={Images.ic_hi} style={styles.hiimg} />
            </View>
            <View style={{}}>
              <Icon name="bell" family="EvilIcons" size={30} color="black" />
            </View>
          </View>
          <View style={{ padding: hp(3), bottom: hp(5.5) }}>
            <TextView
              style={{
                color: Colors.SECONDARY[500],
                ...Typography.BodyRegular12,
                lineHeight: hp(1.8),
              }}
            >
              Let's continue your {"\n"}reading journey
            </TextView>
          </View>
          <View style={{ alignSelf: "center", bottom: hp(8) }}>
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

          <View style={{ flexDirection: "column", bottom: hp(5) }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: hp(3),
              }}
            >
              <TextView
                style={{
                  color: Colors.SECONDARY[200],
                  ...Typography.BodyBold15,
                }}
              >
                Categories
              </TextView>
              <TextView
                style={{ color: Colors.PRIMARY[100], ...Typography.BodyBold13 }}
              >
                View All
              </TextView>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                top: hp(2),
              }}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: wp(5),
                  alignItems: "center",
                }}
              >
                {categories?.map((item: any, index: number) => (
                  <Pressable
                    key={index}
                    onPress={() => setSelectCatId(index)}
                    style={{
                      paddingHorizontal: wp(4),
                      paddingVertical: hp(0.8),
                      borderRadius: hp(2),
                      backgroundColor:
                        index === selectcatid
                          ? Colors.PRIMARY[100]
                          : Colors.PRIMARY[400],
                      marginRight: wp(2),
                      // ...cardShadow,
                    }}
                  >
                    <TextView
                      style={{
                        ...Typography.Caption12,
                        letterSpacing: 0.4,
                        color:
                          index === selectcatid
                            ? Colors.SECONDARY[100]
                            : Colors.SECONDARY[200],
                      }}
                    >
                      {item.title}
                    </TextView>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
          <PopularBooks />
          <Recommneded />

          {/* <Pressable
          onPress={() => navigation.navigate("Tasklist")}
          style={{
            padding: hp(2),
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TextView
            style={{
              color: currentTheme?.text,
              ...Typography.BodyRegular13,
              textAlign: "right",
              textDecorationLine: "underline",
            }}
          >
            View All Task{" "}
          </TextView>
        </Pressable> */}
          {/* <View style={styles.taskcontainer}>
          <TextView style={styles.recenttile}>Recent Task</TextView>
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TextView
                style={[styles.recenttile, { ...Typography.BodyRegular13 }]}
              >
                Today
              </TextView>
              <Icon
                family="Ionicons"
                name="chevron-forward-sharp"
                color={Colors.SECONDARY[200]}
                size={15}
              />
            </View>
          </View>
        </View> */}
          {/* <View style={{ bottom: hp(3) }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingBottom: hp(33) + insets.bottom,
            }}
            removeClippedSubviews={true}
            onEndReached={loadMore}
            windowSize={5}
            refreshing={refreshing}
            onRefresh={onrefresh}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator size="large" color={Colors.PRIMARY[100]} />
              ) : !hasMore ? (
                <TextView
                  style={{
                    textAlign: "center",
                    padding: 10,
                    color: Colors.SECONDARY[400],
                    ...Typography.BodyRegular12,
                  }}
                >
                  No more records available!
                </TextView>
              ) : null
            }
          />
        </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
