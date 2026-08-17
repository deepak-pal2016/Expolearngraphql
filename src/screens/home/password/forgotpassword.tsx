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
  ImageBackground,
} from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import loginStyles from "../../../styles/loginStyles";
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
  Header,
} from "@components/index";
import { ThemeContext } from "../../../context/themeContext";
import { AuthStackProps } from "src/@types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { SignInValidationSchema } from "@helpers/validations";
import { showError, showSuccess } from "@components/Flashmessge";
import { LocalStorage } from "@helpers/localstorage";
import { UserDataContext } from "../../../context";
import { UserData } from "../../../context/userDataContext";
type ForgotpasswordNavigationType = NativeStackNavigationProp<
  AuthStackProps,
  "Forgotpassword"
>;

const Forgotpassword: FC = () => {
  // const [login, { data, error, isLoading }] = useLoginMutation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ForgotpasswordNavigationType>();
  const { setIsLoggedIn, setUserData } = useContext<UserData>(UserDataContext);
  const { showLoader, hideLoader } = CommonLoader();
  const { theme, themetoggle } = useContext(ThemeContext);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = loginStyles(currentTheme);

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      validationSchema: SignInValidationSchema,
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (data: any) => {
        const token = await getfcmtoken();
        const addwihtfmcdta = { ...data, fcmtoken: token };
        showLoader();
        // try {  rtk query code
        //   const response: any = await login(addwihtfmcdta).unwrap();
        //   console.log(response?.success, '==addwihtfmcdta==', response?.data);
        //   if (response?.success === true) {
        //     await LocalStorage.save('@user', response?.data);
        //     await LocalStorage.save('@login', true);
        //     setUserData(response?.data)
        //     showSuccess('Login Successfully');
        //   } else {
        //     showError('Login Failed try again..');
        //   }
        // } catch (error: any) {
        //   console.log(error, 'error==');
        // } finally {
        //   hideLoader();
        // }
        try {
          const response: any = await dispatch(
            Loginuser(addwihtfmcdta),
          ).unwrap();
          if (response?.success === true) {
            await LocalStorage.save("@user", response?.data);
            await LocalStorage.save("@token", response?.data?.token);
            await LocalStorage.save("@login", true);
            setIsLoggedIn(true);
            setUserData(response?.data);
            if (response?.data?._id) {
              Socket.connect();
              Socket.emit("user_online", response?.data?._id);
            }
            showSuccess("Login Successfully");
          } else {
            showError(response?.message || "Login failed");
          }
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
           <Header showheader={true} showicons={false} />
        <ImageBackground style={{width:'100%', height:'100%',  }} resizeMode='cover' source={Images.ic_passwordimg}>
          <View style={[styles.container, { paddingTop: insets.top , bottom:hp(3)}]}>
            <Image source={Images.ic_logo} style={styles.logostyles} />
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                left: hp(5),
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TextView style={styles.apptitle}>Forgot Password?</TextView>
              </View>
              <TextView
                style={[
                  styles.apptitle,
                  { ...Typography.BodyRegular12, textAlign: "left" },
                ]}>
                Enter your email and we'll send you a link {"\n"}to reset your
                password.
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
                    setFieldValue(
                      "email",
                      text.replace(/\s/g, "").toLowerCase(),
                    )
                  }
                />
              </View>
            </View>
            <Button
              style={styles.buttonview}
              onPress={() => handleSubmit()}
              titleStyle={{
                color: Colors.SECONDARY[100],
                ...Typography.BodyBold15,
              }}
              title={"Send Reset Link"}
              gradientColors={[
                Colors.PRIMARY[100],
                Colors.PRIMARY[100],
                // Colors.PRIMARY[300],
              ]}
            />

            <View style={styles.alreadyaccount}>
              <TextView style={styles.accounttext}>
                Remember your password?
              </TextView>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <TextView style={styles.singuptitle}>Login</TextView>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Forgotpassword;
