/* eslint-disable no-catch-shadow */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  Platform,
} from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import loginStyles from "../../styles/loginStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors, Images, Typography } from "@constant/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@constant/dimentions";
import {
  Button,
  FloatingTextInput,
  TextView,
  DividerWithText,
  LightTheme,
  DarkTheme,
  CommonLoader,
} from "@components/index";
import { ThemeContext } from "../../context/themeContext";
import { AuthStackProps } from "src/@types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { showError, showSuccess } from "@components/Flashmessge";
import { LocalStorage } from "@helpers/localstorage";
import { UserDataContext } from "../../context";
import { UserData } from "../../context/userDataContext";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useMutation } from "@apollo/client/react";
import { LOGIN_USER } from "@/graphqls/mutations/auth";
import useAuthStore from "@/store/authStore";
import { SignInValidationSchema } from "@/helpers/validations";
type LoginscreenNavigationType = NativeStackNavigationProp<
  AuthStackProps,
  "Login"
>;

const Login: FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<LoginscreenNavigationType>();
  const { setIsLoggedIn, setUserData } = useContext<UserData>(UserDataContext);
  const { showLoader, hideLoader } = CommonLoader();
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const login = useAuthStore((state) => state.login);
  const { theme, themetoggle } = useContext(ThemeContext);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = loginStyles(currentTheme);

 useEffect(() => {
  getFCMToken();
}, []);

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      validationSchema: SignInValidationSchema,
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (datas: any) => {
        try {
          const token = await getFCMToken();
          const addwihtfmcdta = { ...datas, fcmtoken: token };
          showLoader();
          console.log(token, "addwihtfmcdta");

          const { data } = await loginUser({
            variables: addwihtfmcdta,
          });
          console.log(addwihtfmcdta, "LOGIN RESPONSE:", data);
        } catch (error: any) {
          console.log("ERROR FULL:", error);
          showError("Login Failed");
          if (error?.status === 500) {
            showError("Internal Server Error");
          } else if (error?.status === 404) {
            showError(error?.message || "User not found");
          } else {
            showError(
              error?.data?.message ||
                error?.message ||
                "Something went wrong. Please try again later.",
            );
          }
        } finally {
          hideLoader();
        }
      },
    });

  const getFCMToken = async () => {
    try {
      if (!Device.isDevice) {
        console.log("Physical device required");
        return null;
      }

      // Android notification channel
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }

      // Permission
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();

        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Notification permission denied");
        return null;
      }

      const tokenResponse = await Notifications.getDevicePushTokenAsync();

      console.log("TOKEN TYPE =>", tokenResponse.type);
      console.log("FCM TOKEN =>", tokenResponse.data);

      return tokenResponse.data;
    } catch (error) {
      console.log("FCM TOKEN ERROR =>", error);
      return null;
    }
  };

  return (
    <TouchableWithoutFeedback>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor:
            theme === "dark" ? currentTheme?.background : Colors.SECONDARY[100],
        }}
        enableOnAndroid={false}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={hp(1)}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <Image source={Images.ic_logo} style={styles.logostyles} />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              left: hp(5),
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TextView style={styles.apptitle}>Welcome Back!</TextView>
              <Image source={Images.ic_hi} style={styles.hiimg} />
            </View>
            <TextView
              style={[styles.apptitle, { ...Typography.BodyRegular13 }]}
            >
              Login to continue your reading jouney..
            </TextView>
          </View>

          <View style={styles.panel}>
            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_email}
                style={{ width: wp(80), elevation: 0 }}
                label={"Email"}
                placeholder="Enter your email"
                value={values.email}
                error={errors.email}
                touched={touched.email}
                onChangeText={(text: any) =>
                  setFieldValue("email", text.replace(/\s/g, "").toLowerCase())
                }
              />
            </View>
            <View style={[styles.inputWrapper, { flexDirection: "column" }]}>
              <FloatingTextInput
                lefticon={Images.ic_lock}
                style={{ width: wp(80), elevation: 0 }}
                label={"Password"}
                placeholder="Enter your password"
                value={values.password}
                error={errors.password}
                touched={touched.password}
                isSecure={isSecure}
                onSecureTextPress={() => setIsSecure(!isSecure)}
                onChangeText={(text: any) =>
                  setFieldValue("password", text.replace(/\s/g, ""))
                }
              />
              <Pressable
                onPress={() => navigation.navigate("Forgotpassword")}
                style={{ alignSelf: "flex-end" }}
              >
                <TextView
                  style={{
                    color: Colors.PRIMARY[100],
                    ...Typography.BodyBold13,
                    padding: hp(1),
                  }}
                >
                  Forgot Password?
                </TextView>
              </Pressable>
            </View>
          </View>
          <Button
            style={styles.buttonview}
            onPress={() => handleSubmit()}
            titleStyle={{
              color: Colors.SECONDARY[100],
              ...Typography.BodyBold15,
            }}
            title={"Log in"}
            gradientColors={[
              Colors.PRIMARY[100],
              Colors.PRIMARY[100],
              // Colors.PRIMARY[300],
            ]}
          />

          <DividerWithText title="Or continue with" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Button
              //@ts-ignore borderRadius:hp(2)
              style={[
                styles.buttonview,
                { width: wp(35), borderWidth: 0.5, borderRadius: hp(1) },
              ]}
              onPress={() => console.log("ddf")}
              titleStyle={{
                color: Colors.SECONDARY[200],
                ...Typography.BodyMedium14,
              }}
              title={"Google"}
              gradientColors={[Colors.SECONDARY[100], Colors.SECONDARY[100]]}
              lefticon={true}
              icon={Images.ic_google}
            />
            <Button
              //@ts-expect-error
              style={[
                styles.buttonview,
                { width: wp(35), borderWidth: 0.5, borderRadius: hp(1) },
              ]}
              onPress={() => console.log("ddf")}
              titleStyle={{
                color: Colors.SECONDARY[200],
                ...Typography.BodyMedium14,
              }}
              title={"Apple"}
              gradientColors={[Colors.SECONDARY[100], Colors.SECONDARY[100]]}
              lefticon={true}
              icon={Images.ic_apple}
            />
          </View>
          <View style={styles.alreadyaccount}>
            <TextView style={styles.accounttext}>
              Don't have an account?
            </TextView>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <TextView style={styles.singuptitle}>Sign up</TextView>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
