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
import React, { FC, useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import loginStyles from "../../../styles/loginStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { cardShadow, Colors, Images, Typography } from "@constant/index";
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
import { ThemeContext } from "../../../context/themeContext";
import { AuthStackProps } from "src/@types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { SignupvalidSchema } from "@helpers/validations";
import { values } from "lodash";
import { showError, showSuccess } from "@components/Flashmessge";
import { LocalStorage } from "@helpers/localstorage";
import { UserData, UserDataContext } from "../../../context/userDataContext";
type SignupscreenNavigationType = NativeStackNavigationProp<
  AuthStackProps,
  "Signup"
>;

const Signup: FC = () => {
  const navigation = useNavigation<SignupscreenNavigationType>();
  const insets = useSafeAreaInsets();
  const { setIsLoggedIn, setUserData } = useContext<UserData>(UserDataContext);
  const { showLoader, hideLoader } = CommonLoader();
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const { theme, themetoggle } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const [privacy, setPrivacy] = useState<boolean>(false);
  const styles = loginStyles(currentTheme);

  const getFCMToken = async () => {
    try {
      if (!Device.isDevice) {
        console.log("Physical device required for push notifications");
        return null;
      }

      // Permission check
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

      // Android notification channel
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }

      // Get native device token
      const tokenResponse = await Notifications.getDevicePushTokenAsync();

      console.log("FCM TOKEN =>", tokenResponse.data);

      return tokenResponse.data;
    } catch (error) {
      console.log("FCM TOKEN ERROR =>", error);
      return null;
    }
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    validationSchema: SignupvalidSchema,
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },

    onSubmit: async (value) => {
      showLoader();
      try {
        const token = await getFCMToken();
        const body = { ...value, fcmtoken: token };
     
      } catch (error: any) {
        console.log(error, "error==");
        if (error?.status === 404) {
          showError(error?.message);
        } else if (error?.status === 400) {
          showError(error?.message);
        } else {
          showError("Something went wrong. Please try again later.");
        }
      } finally {
        hideLoader();
      }
    },
  });

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
          <View style={{ alignSelf: "center", top: hp(1) }}>
            <Image
              source={Images.ic_logo}
              style={{
                width: wp(100),
                height: wp(50),
                resizeMode: "contain",
                alignSelf: "center",
                top: hp(0),
              }}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                left: hp(5),
              }}
            >
              <TextView style={styles.apptitle}>Create Account</TextView>
              <TextView
                style={[styles.apptitle, { ...Typography.BodyRegular13 }]}
              >
                Sign up and start your reading journey..
              </TextView>
            </View>
          </View>
          <View style={styles.panel}>
            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_user}
                style={styles.widthtextinput}
                label={"Name"}
                placeholder="Enter your full-name"
                touched={touched.name}
                error={errors.name}
                value={values.name}
                onChangeText={(text: any) => setFieldValue("name", text)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_email}
                style={styles.widthtextinput}
                label={"Email"}
                placeholder="Enter your email"
                touched={touched.email}
                error={errors.email}
                value={values.email}
                onChangeText={(text: any) =>
                  setFieldValue("email", text.replace(/\s/g, "").toLowerCase())
                }
              />
            </View>

            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_email}
                style={styles.widthtextinput}
                label={"Mobile"}
                placeholder="Enter your mobile"
                touched={touched.mobile}
                error={errors.mobile}
                value={values.mobile}
                onChangeText={(text: any) => setFieldValue("mobile", text)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_lock}
                style={styles.widthtextinput}
                label={"Password"}
                placeholder="Enter your password"
                isSecure={true}
                onSecureTextPress={() => setIsSecure(!isSecure)}
                touched={touched.password}
                error={errors.password}
                value={values.password}
                onChangeText={(text: any) => setFieldValue("password", text)}
              />
            </View>

            <View
              style={[
                styles.inputWrapper,
                {
                  flexDirection: "row",
                  top: hp(1),
                  justifyContent: "space-evenly",
                  alignSelf: "flex-start",
                },
              ]}
            >
              <Pressable onPress={() => setPrivacy((prev) => !prev)}>
                <Image
                  source={privacy ? Images.ic_check : Images.ic_uncheck}
                  style={{
                    width: wp(5),
                    height: wp(5),
                    resizeMode: "contain",
                    tintColor: Colors.PRIMARY[100],
                  }}
                />
              </Pressable>
              <TextView style={styles.policytext}>
                I agree to the{" "}
                <TextView style={styles.termstext}>Terms & Conditions</TextView>{" "}
                and{" "}
                <TextView style={styles.termstext}>
                  Privacy Policy.
                </TextView>{" "}
              </TextView>
            </View>
          </View>
          <Button
            style={styles.buttonview}
            onPress={() => handleSubmit()}
            titleStyle={{
              color: Colors.SECONDARY[100],
              ...Typography.BodyMedium14,
            }}
            title={"Sign up"}
            gradientColors={[Colors.PRIMARY[100], Colors.PRIMARY[200]]}
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
              Already have an account?
            </TextView>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <TextView style={styles.singuptitle}>Login</TextView>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
