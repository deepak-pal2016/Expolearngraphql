/* eslint-disable react-native/no-inline-styles */
import React, { FC, useContext, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthStackProps } from "src/@types";
import {
  Button,
  DarkTheme,
  FloatingTextInput,
  Header,
  LightTheme,
  TextView,
  CommonLoader,
} from "@components/index";
import { Colors, Images, Typography } from "@constant/index";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@constant/dimentions";
import loginStyles from "../../../styles/loginStyles";
import { ThemeContext } from "../../../context/themeContext";
import { showError, showSuccess } from "@components/Flashmessge";
import { CHANGE_PASSWORD } from "@/services/queries/queriesservice";
import { useMutation } from "@apollo/client/react";

type ResetPasswordNavigationType = NativeStackNavigationProp<
  AuthStackProps,
  "Resetpassword"
>;

type ChangepasswordMutationData = {
  changepassword?: {
    success?: boolean;
    message?: string;
  };
};

type changepasswordutationVariables = {
  email: string;
  password: string;
};

const Resetpassword: FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ResetPasswordNavigationType>();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = loginStyles(currentTheme);
  const { showLoader, hideLoader } = CommonLoader();
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [changepassword, { loading }] = useMutation<
    ChangepasswordMutationData,
    changepasswordutationVariables
  >(CHANGE_PASSWORD);
  const route: any = useRoute();
  const { email } = route.params;

  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validate: (value) => {
      const validationErrors: { password?: string; confirmPassword?: string } =
        {};
      if (!value.password) validationErrors.password = "Password is required";
      else if (value.password.length < 8) {
        validationErrors.password = "Password must be at least 8 characters";
      }
      if (!value.confirmPassword) {
        validationErrors.confirmPassword = "Please confirm your password";
      } else if (value.password !== value.confirmPassword) {
        validationErrors.confirmPassword = "Passwords do not match";
      }
      return validationErrors;
    },
    onSubmit: async () => {
      try {
        showLoader();
        const { data } = await changepassword({
          variables: { email: email, password: values.confirmPassword },
        });
    //    console.log(data, "===data");
        if (data?.changepassword?.success === true) {
          showSuccess(
            data?.changepassword?.message || "Password changed successfully",
          );
          navigation.navigate("Login");
        } else {
          showError(
            data?.changepassword?.message || "Password not change try again...",
          );
        }
        //   showSuccess("Password reset successfully");
        //   navigation.navigate("Login");
      } catch (error: any) {
        hideLoader();
        showError(error);
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
            theme === "dark" ? currentTheme.background : Colors.SECONDARY[100],
        }}
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
              <TextView style={styles.apptitle}>Reset Password</TextView>
              <TextView
                style={[
                  styles.apptitle,
                  { ...Typography.BodyRegular12, textAlign: "left" },
                ]}
              >
                Enter your new password below.
              </TextView>
            </View>
            <View style={styles.panel}>
              <View style={styles.inputWrapper}>
                <FloatingTextInput
                  lefticon={Images.ic_lock}
                  style={{ width: wp(80), elevation: 0 }}
                  label="New Password"
                  placeholder="Enter new password"
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                  {...({ secureTextEntry: securePassword } as Record<
                    string,
                    boolean
                  >)}
                  {...({
                    righticon: secureConfirmPassword
                      ? Images.ic_eyeopen
                      : Images.ic_eyeclose,
                    onRightIconPress: () => setSecurePassword(!securePassword),
                  } as Record<string, unknown>)}
                  onChangeText={(text: string) =>
                    setFieldValue("password", text)
                  }
                />
              </View>
              <View style={styles.inputWrapper}>
                <FloatingTextInput
                  lefticon={Images.ic_lock}
                  style={{ width: wp(80), elevation: 0 }}
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  {...({ secureTextEntry: secureConfirmPassword } as Record<
                    string,
                    boolean
                  >)}
                  {...({
                    righticon: secureConfirmPassword
                      ? Images.ic_eyeopen
                      : Images.ic_eyeclose,
                    onRightIconPress: () =>
                      setSecureConfirmPassword(!secureConfirmPassword),
                  } as Record<string, unknown>)}
                  onChangeText={(text: string) =>
                    setFieldValue("confirmPassword", text)
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
              title="Reset Password"
              gradientColors={[Colors.PRIMARY[100], Colors.PRIMARY[100]]}
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

export default Resetpassword;
