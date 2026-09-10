import React, { FC, useContext, useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  TouchableOpacity,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
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
import loginStyles from "../../../styles/loginStyles";
import { ThemeContext } from "../../../context/themeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Images, Typography } from "@constant/index";
import { AuthStackProps } from "src/@types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { showError, showSuccess } from "@/components/Flashmessge";
import { FORGOT_PASSWORD, VERIFY_OTP } from "@/services/queries/queriesservice";
import { useMutation } from "@apollo/client/react";

type OTPVerifydNavigationType = NativeStackNavigationProp<
  AuthStackProps,
  "OTPVerify"
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

type VerifyOtpResponse = { verifyotp: { success: boolean; message: string } };
type VerifyOtpVariables = { email: string; otp: string };

const OTPVerify: FC = () => {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState("");
  const { showLoader, hideLoader } = CommonLoader();
  const { theme, themetoggle } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = loginStyles(currentTheme);
  const route: any = useRoute();
  const navigation = useNavigation<OTPVerifydNavigationType>();
  const [timer, setTimer] = useState<number>(60);
  const [forgotpassword] = useMutation<
    ForgotPasswordMutationData,
    ForgotPasswordMutationVariables
  >(FORGOT_PASSWORD);
  const [verifyotp, { loading }] = useMutation<
    VerifyOtpResponse,
    VerifyOtpVariables
  >(VERIFY_OTP);
  const { email } = route.params;

  useEffect(() => {
    const Interval = setInterval(() => {
      setTimer((prev:any) => {
        if(prev < 1){
          clearInterval(Interval);
          return 0;
        }
        return  prev - 1;
      })
    },1000)
    return () => clearInterval(Interval);
  },[])

  const resendopt = async () => {
    if (timer > 0) {
      return;
    }
    try {
      showLoader();
      try {
        const { data } = await forgotpassword({
          variables: {  email },
        });

        if (data?.forgotpassword?.success === true) {
          showSuccess(
            data?.forgotpassword?.message ||
              "OTP sent successsfully on your email..",
          );
          setTimer(60);
        } else {
          showError(data?.forgotpassword?.message || "something went wrong...");
        }
      } catch (error: any) {
        hideLoader();
        console.log(error, "error==");
      } finally {
        hideLoader();
      }
    } catch (err: any) {}
  };

  const verifyOtp = async () => {
    Keyboard.dismiss();
    if (otp.length != 6) {
      showError("Please enter the 6 digit OTP");
      return;
    }
    const code = otp;
    try {
      const { data } = await verifyotp({
        variables: {
          email,
          otp: code,
        },
      });

      showLoader();
      if (data?.verifyotp?.success) {
        showSuccess(data.verifyotp.message || "OTP verified successfully");
        navigation.navigate("Resetpassword", { email: email });
      } else {
        showError(data?.verifyotp?.message || "Invalid OTP");
      }
    } catch (err: any) {
      console.log(err, "verify otp error");
      showError("Something went wrong");
    } finally {
      hideLoader();
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
                <TextView style={styles.apptitle}>Enter OTP</TextView>
              </View>
              <TextView
                style={[
                  styles.apptitle,
                  { ...Typography.BodyRegular12, textAlign: "left" },
                ]}
              >
                {`We have sent the 6-dits OTP on ${email || "NA"}`}
              </TextView>
            </View>
            <View style={{ padding: hp(3) }}>
              <OTPTextInput
                inputCount={6}
                inputCellLength={1}
                handleTextChange={(value) => {
                  setOtp(value);
                }}
                tintColor={Colors.PRIMARY[100]}
                offTintColor={Colors.PRIMARY[100]}
                textInputStyle={{
                  width: wp(11),
                  height: hp(6),
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: Colors.PRIMARY[100],
                  ...Typography.BodyBold15,
                }}
              />
            </View>

            <Button
              style={styles.buttonview}
              onPress={() => verifyOtp()}
              titleStyle={{
                color: Colors.SECONDARY[100],
                ...Typography.BodyBold15,
              }}
              title={"Verify"}
              gradientColors={[
                Colors.PRIMARY[100],
                Colors.PRIMARY[100],
                // Colors.PRIMARY[300],
              ]}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: hp(2),
              }}
            >
              <TextView
                style={{
                  color: Colors.SECONDARY[400],
                  ...Typography.BodyBold12,
                }}
              >
                Didn't receive the code?{" "}
              </TextView>
              <TouchableOpacity activeOpacity={0.7} onPress={() => resendopt()}>
                <TextView
                  style={{
                    color: Colors.PRIMARY[100],
                    ...Typography.BodyBold13,
                  }}
                >
                  {`Resend ${timer === 0 ? "OTP" : `in ${timer}s`}`}
                </TextView>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default OTPVerify;
