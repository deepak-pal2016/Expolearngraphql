import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackProps } from 'src/@types';
import {
  Dashboard,
} from '@screens/index';
import BottomTabNavigator from '../navigation/bottomtabnavigator';
import Colors from '@constant/colors';
import Typography from '@constant/fontSize';

const Homestacknavigator: FC = () => {
  const HomeStack = createNativeStackNavigator<HomeStackProps>();
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <HomeStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      /> */}
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
    </HomeStack.Navigator>
  );
};

export default Homestacknavigator;
