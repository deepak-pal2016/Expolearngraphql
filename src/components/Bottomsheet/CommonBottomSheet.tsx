import React, {FC, ReactNode, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import RNModal from 'react-native-modal';
import Icon from '@expo/vector-icons/Ionicons';
import TextView from '@components/TextView/textView';
import Typography from '@constant/fontSize';
import Colors from '@constant/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '@constant/dimentions';
import {cardShadow} from '@constant/index';
import {showSuccess} from '@components/Flashmessge';

interface CommonBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  message?: string;
}

const CommonBottomSheet: FC<CommonBottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
  message,
}) => {

  useEffect(() => {
    if (message) {
      showSuccess(message);
    }
  }, [message]);

  return (
    <RNModal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={400}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={styles.container}>
        {/* Top Handle */}
        <View style={styles.handle} />

        {/* Header with Title + Close Button */}
        <View style={styles.header}>
          <TextView style={styles.title}>{title || ''}</TextView>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.closeBtn}
            onPress={onClose}>
            <Icon
              name="close"
              size={20}
              color={Colors.SECONDARY[100]}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>

        {/* Children Content */}
        <View style={styles.body}>{children}</View>
      </View>
    </RNModal>
  );
};

export default CommonBottomSheet;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: hp(90),
    width: wp(100),
  },
  handle: {
    width: wp(12),
    height: hp(0.8),
    backgroundColor: 'grey',
    borderRadius: hp(10),
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp(2),
  },
  title: {
    color: Colors.PRIMARY[100],
    ...Typography.mulishbold4,
  },
  closeBtn: {
    ...cardShadow,
    width: wp(8),
    height: hp(4),
    borderRadius: hp(8),
    backgroundColor: Colors.PRIMARY[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    marginTop: hp(2),
  },
});
