// components/DeleteConfirmModal.tsx
import TextView from '@components/TextView/textView';
import Colors from '@constant/colors';
import Typography from '@constant/fontSize';
import Images from '@constant/images';
import { cardShadow } from '@constant/index';
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface DeleteConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>

          <View style={styles.headerRow}>
            <Image
              source={Images.ic_logo}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.textBlock}>
              <TextView style={styles.title}>Confirmation Message</TextView>
              <TextView style={styles.message}>
                Are you sure you want to delete this record? 
              </TextView>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <TextView style={styles.cancelText}>Cancel</TextView>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm}>
              <TextView style={styles.deleteText}>Delete</TextView>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 55,
    height: 55,
    marginRight: 14,
    
  },
  textBlock: {
    flex: 1,
  },
  title: {
   color:Colors.SECONDARY[200],
   ...Typography.mulishbold4,
    marginBottom: 4,
  },
  message: {
    color:Colors.SECONDARY[400],
    ...Typography.confimaationmessage
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
  },
  cancelBtn: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  cancelText: {
   color:Colors.SECONDARY[400],
   ...Typography.mulishbold3
  },
  deleteBtn: {
    paddingHorizontal: 22,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#e53935',
    ...cardShadow
  },
  deleteText: {
    color:Colors.SECONDARY[100],
   ...Typography.mulishbold3,
  
  },
});
