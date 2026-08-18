/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Homestacknavigator,
  Authstacknavigator,
  BottomTabNavigator,
} from "../navigation/index";
import { StatusBar, BackHandler } from "react-native";
const Stack = createNativeStackNavigator();
import { LocalStorage } from "@helpers/localstorage";
import { UserData, UserDataContext } from "../context/userDataContext";
import { Colors } from "../constant";
import * as Network from "expo-network";
import { CommonLoader, CommonAlertModal } from "@components/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { navigationRef } from "../utils/NavigationService";
import useAuthStore from "@/store/authStore";

const Route: FC = () => {
  const [userLogin, setUserLogin] = useState<any>(undefined);
  const { showAlert, hideAlert } = CommonAlertModal();
  const { userData, setIsLoggedIn } = useContext<UserData>(UserDataContext);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  console.log(isLoggedIn,'isLoggedIn');
  

  useEffect(() => {
    getAsync();
  }, [isLoggedIn]);

  const getAsync = async () => {
    try {
      setUserLogin(isLoggedIn);
    } catch (error) {
      console.error("Error fetching user login status:", error);
      setUserLogin("false");
    }
  };

  //For Fetch Internet Connectvity
  useEffect(() => {
    const checkInternet = async () => {
      const state = await Network.getNetworkStateAsync();
      if (!state.isConnected) {
        showAlert(
          "Internet Issue",
          "No Internet Connection. Make sure that Wi-Fi or mobile data is turned on.",
          "Try Again",
          () => tryAgainWithInternet(),
          "internet",
        );
      }
    };

    checkInternet();
  }, []);
  //For Check Internet Connection And Try Again

  const tryAgainWithInternet = async () => {
    const state = await Network.getNetworkStateAsync();
    if (state.isConnected) {
      hideAlert();
    }
  };

  // useEffect(() => {
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage: any) => {
  //       if (remoteMessage) {
  //         console.log("App opened from quit:", remoteMessage);

  //         // 👉 yaha navigation bhi kar sakte ho
  //         // example:
  //         // navigation.navigate('Taskdetails', {
  //         //   id: remoteMessage?.data?.taskId,
  //         // });
  //       }
  //     });
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log("App opened from background:", remoteMessage);

  //     // 👉 yaha navigation bhi kar sakte ho
  //     // example:
  //     // navigation.navigate('Taskdetails', {
  //     //   id: remoteMessage?.data?.taskId,
  //     // });
  //   });

  //   return unsubscribe;
  // }, []);

  //removed loading authscreen in first instance because of the null(false) for userLogin
  //if (loginState === undefined || loginState === 'null') return <></>;
  if (isLoggedIn === undefined || isLoggedIn === "null") return <></>;

  //
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={"default"} backgroundColor={Colors.PRIMARY[100]} />
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
              <>
                <Stack.Screen
                  name="Homestacknavigator"
                  component={Homestacknavigator}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="AuthStackNavigator"
                  component={Authstacknavigator}
                />
              </>
            )}
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
};
export default Route;
