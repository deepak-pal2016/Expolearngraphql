/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { View, Image, TouchableWithoutFeedback, Pressable } from "react-native";
import React, { FC, useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import loginStyles from "@styles/loginStyles";
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
// import {
//   getMessaging,
//   getToken,
//   requestPermission,
//   onTokenRefresh,
// } from '@react-native-firebase/messaging';
// import { getApp } from '@react-native-firebase/app';
import { useAppDispatch } from "@redux/store/hooks";
import { Registeruser } from "@redux/slices/authSlice";
import { SignupvalidSchema } from "@helpers/validations";
import { values } from "lodash";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "@components/Flashmessge";
import { LocalStorage } from "@helpers/localstorage";
import { UserData, UserDataContext } from "../../../context/userDataContext";
type SignupscreenNavigationType = NativeStackNavigationProp<
  AuthStackProps,
  "Signup"
>;

const Signup: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SignupscreenNavigationType>();
  const insets = useSafeAreaInsets();
  const { setIsLoggedIn, setUserData } = useContext<UserData>(UserDataContext);
  const { showLoader, hideLoader } = CommonLoader();
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const { theme, themetoggle } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = loginStyles(currentTheme);

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
        const token = await getfcmtoken();
        const body = { ...value, fcmtoken: token };
        const response: any = await dispatch(Registeruser(body)).unwrap();
        if (response?.success === true) {
          showSuccess("User Registered Successfully");
          setIsLoggedIn(true);
          await LocalStorage.save("@user", response?.data);
          await LocalStorage.save("@login", true);
          await LocalStorage.save("@token", response?.data?.token);
          resetForm();
        } else {
          showError(
            response?.message ||
              "Something went wrong. Please try again later.",
          );
        }
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

  // const getfcmtoken = async () => {
  //   const app = getApp();
  //   const messageingInstance = getMessaging(app);
  //   const authstatus = await requestPermission(messageingInstance);
  //   const enabled = authstatus === 1 || authstatus === 2;
  //   if (!enabled) {
  //     console.log('permission not granted');
  //     return;
  //   }

  //   const token = await getToken(messageingInstance);
  //   return token;

  //   // onTokenRefresh(messageingInstance, newtoken => {
  //   //   console.log('refresh token', newtoken);
  //   // });
  // };

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
          <View style={{ alignSelf: "center", top: hp(2) }}>
            <Image
              source={Images.ic_logo}
              style={{
                width: wp(100),
                height: wp(50),
                resizeMode: "contain",
                alignSelf: "center",
                top: hp(2),
              }}
            />
            <View style={{ justifyContent:'center',alignItems:'flex-start', left:hp(5) }}>
              <TextView style={styles.apptitle}>Create Account</TextView>
              <TextView style={[styles.apptitle, { ...Typography.BodyBold14 }]}>
                Sign up and start your reading journey..
              </TextView>
            </View>
          </View>
          <View style={styles.panel}>
            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_user}
                style={{ width: wp(80) }}
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
                style={{ width: wp(80) }}
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
                style={{ width: wp(80) }}
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
                style={{ width: wp(80) }}
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
          </View>
          <Button
            style={styles.buttonview}
            onPress={() => handleSubmit()}
            titleStyle={{
              color: Colors.SECONDARY[100],
              ...Typography.BodyMedium14,
            }}
            title={"SIGN UP"}
            gradientColors={[
              Colors.PRIMARY[100],
              Colors.PRIMARY[200],
            ]}
          />

          {/* <DividerWithText title="" /> */}
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
