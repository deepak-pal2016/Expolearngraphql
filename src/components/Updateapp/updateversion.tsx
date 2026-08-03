import TextView from '@components/TextView/textView';
import Colors from '@constant/colors';
import Typography from '@constant/fontSize';
import Images from '@constant/images';
import React, { FC } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

type UpdateModalProps = {
  visible: boolean;
  onUpdate: () => void;
  onCancel?: () => void;
};

const UpdateModal: FC<UpdateModalProps> = ({
  visible,
  onUpdate,
  onCancel,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Image source={Images.ic_logo} style={{ width: '30%', height: '30%', alignSelf: 'center' }} resizeMode='contain' />
          <TextView style={styles.title}>Update Available</TextView>
          <TextView style={styles.desc}>
            You are using an old version of the app.
            Please update to continue.
          </TextView>
          <View style={styles.actions}>
            {onCancel && (
              <TouchableOpacity
                onPress={onCancel}
                style={styles.cancelBtn}
                activeOpacity={0.7}>
                <TextView style={styles.cancelText}>Later</TextView>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onUpdate}
              style={styles.updateBtn}
              activeOpacity={0.8} >
              <TextView style={styles.updateText}>Update Now</TextView>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    elevation: 5,
    height: '30%'
  },
  title: {
    color: Colors.SECONDARY[200],
    ...Typography.H4Semibold19,
    textAlign: 'center'
  },
  desc: {
    marginTop: 12,
    color: Colors.SECONDARY[300],
    textAlign: 'center',
    ...Typography.mulishbold2
  },
  actions: {
    flexDirection: 'row',
    marginTop: 24,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  updateBtn: {
    flex: 1,
    backgroundColor: Colors.PRIMARY[100],
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontSize: 15,
  },
  updateText: {
    color: Colors.SECONDARY[100],
    ...Typography.mulishbold3,
  },
});
