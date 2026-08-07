import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackProps } from "src/@types";
import { Bookdetails, Dashboard, Search } from "@screens/index";
import BottomTabNavigator from "../navigation/bottomtabnavigator";


const Homestacknavigator: FC = () => {
  const HomeStack = createNativeStackNavigator<HomeStackProps>();
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <HomeStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      /> */}
      {/* <HomeStack.Screen name="Dashboard" component={Dashboard} /> */}
      {/* <HomeStack.Screen name="Search" component={Search} /> */}
      <HomeStack.Screen name="Bookdetails" component={Bookdetails} />
    </HomeStack.Navigator>
  );
};

export default Homestacknavigator;
