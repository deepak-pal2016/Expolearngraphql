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
} from "@components/index";
import { Colors, Icon, Typography, Images } from "@constant/index";
import { cardShadow } from "@constant/index";
import { ThemeContext } from "../../../context/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { Getuserlist } from "@redux/slices/userSlice";
import { UserData, UserDataContext } from "../../../context/userDataContext";
import { LocalStorage } from "@helpers/localstorage";
import { UsePagination } from "../../../hooks/usepagination";
import { Logoutuser } from "@redux/slices/authSlice";
import { showError, showSuccess } from "@components/Flashmessge";
import { Getallusertask } from "@redux/slices/taskSlice";
// import messaging from '@react-native-firebase/messaging';
// import notifee from '@notifee/react-native';
import moment from "moment";
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
  const EMPTY_TASKS: any[] = [];
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch<any>();
  const { showLoader, hideLoader } = CommonLoader();
  const navigation = useNavigation<DashboardscreenNavigationType>();
  const { theme, themetoggle } = useContext(ThemeContext);
  const [selectcatid, setSelectCatId] = useState<number>(0);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = dashboardstyle(currentTheme);
  const alltasklist =
    useSelector((state: any) => state?.getalltask?.data?.data) ?? EMPTY_TASKS;

  const pagesize = alltasklist?.length > 10 ? 5 : 3;
  const { data, loading, hasMore, loadMore } = UsePagination(
    alltasklist,
    pagesize,
  );

  const { userData, setIsLoggedIn } = useContext<UserData>(UserDataContext);
  const [tasklist, setTaskList] = useState<any>([]);
  const pendingtask = useMemo(() => {
    return (alltasklist || []).filter(
      (item: any) => item?.status === "pending",
    );
  }, [alltasklist]);

  const completetask = useMemo(() => {
    return (alltasklist || []).filter(
      (item: any) => item?.status === "completed",
    );
  }, [alltasklist]);

  useEffect(() => {
    fetchuserlist();
  }, [userData?.email]);

  useEffect(() => {
    setTaskList([
      {
        taskname: "Total Task",
        taskcount: alltasklist?.length || 0,
        color: Colors.PRIMARY[600],
      },
      {
        taskname: "Completed",
        taskcount: completetask.length || 0,
        color: Colors.PRIMARY[500],
      },
      {
        taskname: "Pending",
        taskcount: pendingtask.length || 0,
        color: Colors.PRIMARY[100],
      },
    ]);
  }, [alltasklist]);

  const onrefresh = useCallback(async () => {
    showLoader();
    try {
      await fetchuserlist();
    } catch (error) {
      console.log("error in refresh", error);
    } finally {
      hideLoader();
    }
  }, []);

  const fetchuserlist = async () => {
    try {
      showLoader();
      const resp: any = await dispatch(Getallusertask(userData?._id));

      if (resp?.payload?.status === true) {
        await dispatch(Getuserlist(userData?.email)).unwrap();
      } else if (
        resp?.payload === "Token expired or invalid" ||
        resp?.payload === "Token expired"
      ) {
        handlelogout(userData);
      } else {
        showError("somehting went wrong,  down refresh.");
      }
    } catch (error: any) {
      if (error?.status === 401) {
        showError(error?.message);
        handlelogout(userData);
      } else {
      }
    } finally {
      hideLoader();
    }
  };

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     //  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     dispatch(Getallusertask(userData?._id));
  //     await notifee.displayNotification({
  //       title: remoteMessage.notification?.title,
  //       body: remoteMessage.notification?.body,

  //       android: {
  //         channelId: 'default',
  //         smallIcon: 'ic_notification',
  //         color: Colors.PRIMARY[100],
  //         pressAction: {
  //           id: 'default',
  //         },
  //         importance: 4,
  //         sound: 'default',
  //       },
  //     });
  //   });

  //   return unsubscribe;
  // }, []);

  const handlelogout = async (userData: any) => {
    try {
      // const response: any = dispatch(Logoutuser(userData)).unwrap();
      // console.log(response, 'logout response');
      setIsLoggedIn(false);
      await LocalStorage.save("@login", false);
      await LocalStorage.flushQuestionKeys();
    } catch (error: any) {
      console.log(error, "logout error");
      showError(error?.message || "Something went wrong");
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View
        style={{
          marginTop: hp(1),
          backgroundColor: Colors.SECONDARY[100],
          alignSelf: "center",
          paddingHorizontal: wp(5),
          width: wp(88),
          borderRadius: 12,
          ...cardShadow,
          paddingVertical: hp(2),
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left Icon */}
          <View
            style={{
              width: wp(8),
              height: wp(8),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={Images.ic_check}
              style={{
                width: wp(9),
                height: wp(9),
                resizeMode: "contain",
                tintColor: item?.priorityColor,
              }}
            />
          </View>

          {/* Task Info */}
          <View
            style={{
              flex: 1,
              marginLeft: wp(4),
              top: hp(0.6),
            }}
          >
            <TextView
              style={{
                color: Colors.SECONDARY[200],
                ...Typography.BodyRegular15,
              }}
            >
              {(item?.title || "").charAt(0).toUpperCase() +
                (item?.title || "").slice(1)}
            </TextView>

            <TextView
              style={{
                color: Colors.FLOATINGINPUT[100],
                ...Typography.BodyRegular13,
                marginTop: hp(0.4),
              }}
            >
              {moment(item?.createdAt).format("DD/MM/YYYY")}
            </TextView>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingHorizontal: hp(1),
            }}
          >
            {/* Right Avatar */}
            <Image source={Images.ic_userimg} style={styles.avatarview} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: hp(1),
          }}
        >
          <View
            style={{
              backgroundColor:
                item?.status === "completed"
                  ? Colors.PRIMARY[500]
                  : Colors.PRIMARY[100],
              borderRadius: hp(2),
              right: hp(1),
              alignSelf: "flex-end",
              top: hp(1),
              paddingHorizontal: wp(3),
              paddingVertical: hp(1),
              bottom: hp(0),
            }}
          >
            <TextView
              style={{
                color: Colors.SECONDARY[100],
                ...Typography.BodyRegular12,
              }}
            >
              {item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)}
            </TextView>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.PRIMARY[100],
              borderRadius: hp(2),
              left: hp(1),
              alignSelf: "flex-end",
              top: hp(1),
              paddingHorizontal: wp(3),
              paddingVertical: hp(1),
              bottom: hp(0),
            }}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("Taskdetails" as any, { detailstask: item });
            }}
          >
            <TextView
              style={{
                color: Colors.SECONDARY[100],
                ...Typography.BodyRegular12,
              }}
            >
              View Details
            </TextView>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
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
