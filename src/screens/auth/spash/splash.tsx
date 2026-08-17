import React, {FC, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackProps} from 'src/@types';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackProps, 'Splash'>;

const Splash: FC<Props> = ({navigation}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Login');
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../assets/images/splash.png')}
        style={[
          styles.image,
          {
            opacity,
            transform: [{scale}],
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  image: {
    width,
    height,
  },
});