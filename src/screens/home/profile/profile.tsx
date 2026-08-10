/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Switch,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  Button,
  FloatingTextInput,
  TextView,
  DividerWithText,
  LightTheme,
  DarkTheme,
  Header,
  Dropdownmultiselect,
  CustomDropdown,
  Attachment,
  CommonLoader,
} from "@components/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@constant/dimentions";
import { useFormik } from "formik";
import { ThemeContext } from "../../../context/themeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cardShadow, Colors, Icon, Images, Typography } from "@constant/index";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import profileStyles from "@/styles/profileStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackProps } from "src/@types";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { Loginuser, Logout, Logoutuser } from "@redux/slices/authSlice";
import { UserData, UserDataContext } from "../../../context/userDataContext";
import { LocalStorage } from "@helpers/localstorage";
import { showError, showSuccess } from "@components/Flashmessge";
import { Socket } from "socket.io-client";
import { Uploaduserimage } from "@redux/slices/userSlice";
import * as ImagePicker from "expo-image-picker";
import { AppDispatch } from "@redux/store/store";
type ProfilescreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "Profile"
>;

interface ProfileScreenProps {
  onReadingStatistics?: () => void;
  onAchievements?: () => void;
  onReadingReminders?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

const Profile: FC<ProfileScreenProps> = ({
  onReadingStatistics,
  onAchievements,
  onReadingReminders,
  onSettings,
  onLogout,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const { showLoader, hideLoader } = CommonLoader();
  const { theme, themetoggle } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = profileStyles(currentTheme);
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const { setIsLoggedIn, setUserData, userData } =
    useContext<UserData>(UserDataContext);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);

  // useEffect(() => {
  //  getvalue()
  // }, []);

  // const getvalue = async () => {
  //   let val = await LocalStorage.read('@login');
  //   let user = await LocalStorage.read('@user');
  //   console.log(val, user,'user===');
  // }

  // rtk query logout
  //   const handleLogout = async () => {
  //   dispatch(logout());
  //   setIsLoggedIn(false);
  //   await LocalStorage.save('@login', false);
  //   await LocalStorage.flushQuestionKeys();
  //   showSuccess('Logout Successfully..');
  // };

  const handlelogout = async () => {
    try {
      await dispatch(Logout());
      (Socket as any).disconnect?.();
      setIsLoggedIn(false);
    } catch (error: any) {
      console.log(error, "logout error");
      showError(error?.message || "Something went wrong");
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickGallery = async () => {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (response.canceled || !response.assets?.length) return;
      setSelectedFile(response.assets[0]);
      console.log(response.assets[0], "response.assets[0]");
      if (response) {
        showLoader();
        const formdata = new FormData();
        formdata.append("userId", userData?._id);
        formdata.append("image", {
          uri: response.assets[0].uri,
          type: response.assets[0].type || "image/jpeg",
          name: response.assets[0].fileName || "profile-image.jpg",
        } as any);
        const resp: any = await dispatch(Uploaduserimage(formdata)).unwrap();
        if (resp?.success === true) {
          showSuccess("Profile image updated successfully..");
          await LocalStorage.save("@user", resp?.user);
          setUserData(resp?.user);
        } else {
          showError("Profile image not updated..");
        }
      } else {
        showError("Please open camera take selfie..");
      }
      setShowAttachmentModal(false);
    } catch (error: any) {
      setShowAttachmentModal(false);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while adding the task";
      showError(errorMessage);
    } finally {
      hideLoader();
    }
  };

  const openCamera = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        console.log("Camera permission denied");
        return;
      }

      const response = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (response.canceled || !response.assets?.length) {
        return;
      }
      setShowAttachmentModal(false);
      setSelectedFile(response.assets[0]);
      if (response) {
        showLoader();
        const formdata = new FormData();
        formdata.append("userId", userData?._id);
        formdata.append("image", {
          uri: response.assets[0].uri,
          type: response.assets[0].type || "image/jpeg",
          name: response.assets[0].fileName || "profile-image.jpg",
        } as any);
        const resp: any = await dispatch(Uploaduserimage(formdata)).unwrap();
        console.log(resp?.user, "drepe====");
        if (resp?.success === true) {
          showSuccess("Profile image Updated successfully..");
          await LocalStorage.save("@user", resp?.user);
          setUserData(resp?.user);
        } else {
          showError("Profile image not updated..");
        }
      } else {
        showError("Please open camera take selfie..");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while adding the task";
      showError(errorMessage);
    } finally {
      hideLoader();
    }
  };

  const menuItems = [
    {
      title: "Reading Statistics",
      icon: "bar-chart",
      family: "FontAwesome" as const,
      onPress: onReadingStatistics,
    },
    {
      title: "Achievements",
      icon: "trophy",
      family: "FontAwesome5" as const,
      onPress: onAchievements,
    },
    {
      title: "Reading Reminders",
      icon: "bell-o",
      family: "FontAwesome" as const,
      onPress: onReadingReminders,
    },
    {
      title: "Settings",
      icon: "cog",
      family: "FontAwesome" as const,
      onPress: onSettings,
    },
    {
      title: "Logout",
      icon: "sign-out",
      family: "FontAwesome" as const,
      onPress: onLogout,
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor:
            theme === "dark" ? currentTheme?.background : Colors.PRIMARY[800],
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12",
            }}
            style={styles.avatar}
          />

          <TextView style={styles.name}>Deepak Pal</TextView>
          <TextView style={styles.email}>deepak@example.com</TextView>

          {/* Statistics */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <TextView style={styles.statTitle}>Books Read</TextView>
              <TextView style={styles.statValue}>24</TextView>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <TextView style={styles.statTitle}>Reviews</TextView>
              <TextView style={styles.statValue}>18</TextView>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <TextView style={styles.statTitle}>Favorites</TextView>
              <TextView style={styles.statValue}>32</TextView>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              activeOpacity={0.7}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem,
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuIconContainer}>
                {item.family === "FontAwesome5" ? (
                  <Icon
                    family="FontAwesome"
                    name={item.icon}
                    size={18}
                    color="#17213A"
                  />
                ) : (
                  <Icon
                    family="FontAwesome"
                    name={item.icon}
                    size={18}
                    color={index === 0 ? "#5531E8" : "#17213A"}
                  />
                )}
              </View>

              <TextView style={styles.menuTitle}>{item.title}</TextView>
              <Icon
                family="FontAwesome"
                name="angle-right"
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
