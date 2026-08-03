import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
//import styles from './styles'; // assuming you’re importing from a StyleSheet
import {Colors, Typography, Icon, Fonts, cardShadow} from '@constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '@constant/dimentions';
import TextView from '@components/TextView/textView';

interface MenuItemProps {
  icon: any;
  title: string;
  onPress: () => void;
  indexnumber: number;
}

const colors = [
  '#FF6B6B',
  '#4ECDC4',
  '#FFD93D',
  '#FF8C42',
  '#1DD1A1',
  '#2E86AB',
  '#87CEEB',
  '#28A745',
  '#808080',
];
const ProfileMenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  onPress,
  indexnumber,
}) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}>
    <View
      style={{
        backgroundColor: colors[indexnumber % colors.length],
        borderRadius: hp(10),
        width: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(6),
        left: hp(0.5),
        marginRight: hp(2),
        ...cardShadow,
      }}>
      <Image
        source={icon}
        style={{
          tintColor: Colors.SECONDARY[100],
          width: wp(6),
          height: wp(6),
          resizeMode: 'center',
        }}
      />
    </View>
    <TextView
      style={{
        color: Colors.SECONDARY[400],
        ...Typography.mulishbold3,
        flex: 1,
      }}>
      {title}
    </TextView>
    <Icon
      family="MaterialIcons"
      name="arrow-forward-ios"
      size={18}
      color={Colors.SECONDARY[600]}
    />
  </TouchableOpacity>
);

export default ProfileMenuItem;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    width: wp(80),
    borderBottomWidth: 0.3,
    borderBottomColor: '#D3D3D3',
    // backgroundColor: '#fff',
  },
});
