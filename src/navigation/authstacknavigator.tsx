import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login,Signup } from '@screens/index';
import { AuthStackProps } from 'src/@types';


const Authstacknavigator: FC = () => {
  const AuthStack = createNativeStackNavigator<AuthStackProps>();
  return (
    <>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        {/* <AuthStack.Screen name="Login" component={Login} /> */}
          <AuthStack.Screen name="Signup" component={Signup} />
      </AuthStack.Navigator>
    </>
  );
};

export default Authstacknavigator;
