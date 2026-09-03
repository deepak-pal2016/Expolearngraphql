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
import { ForgotpasswordSchema } from "@helpers/validations";
import { showError, showSuccess } from "@components/Flashmessge";
import { LocalStorage } from "@helpers/localstorage";
import { useMutation } from "@apollo/client/react";
import { FORGOT_PASSWORD } from "@/services/queries/queriesservice";
type ForgotpasswordNavigationType = NativeStackNavigationProp<
  AuthStackProps,
  "Forgotpassword"
>;

type ForgotPasswordMutationData = {
  forgotpassword?: {
    success?: boolean;
    message?: string;
  };
};

type ForgotPasswordMutationVariables = {
  email: string;
};

const Forgotpassword: FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ForgotpasswordNavigationType>();
  const { showLoader, hideLoader } = CommonLoader();
  const { theme, themetoggle } = useContext(ThemeContext);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const [forgotpassword, { loading }] = useMutation<
    ForgotPasswordMutationData,
    ForgotPasswordMutationVariables
  >(FORGOT_PASSWORD);
  const styles = loginStyles(currentTheme);

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      validationSchema: ForgotpasswordSchema,
      initialValues: {
        email: "deepnodejs@gmail.com",
      },
      onSubmit: async (value: any) => {
        showLoader();
        try {
          const { data } = await forgotpassword({
            variables: { email: value?.email },
          });
          console.log(data,'data===');
          
          if (data?.forgotpassword?.success === true) {
            showSuccess(
              data?.forgotpassword?.message ||
                "Password reset link generated send to your email successfully.",
            );
          } else {
            showError(
              data?.forgotpassword?.message || "something went wrong...",
            );
          }
        } catch (error: any) {
          hideLoader();
          console.log(error, "error==");
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
        <Header showheader={true} showicons={false} />
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          source={Images.ic_passwordimg}
        >
          <View
            style={[
              styles.container,
              { paddingTop: insets.top, bottom: hp(3) },
            ]}
          >
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
                ]}
              >
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
