/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useRef, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable,Alert } from 'react-native';
import  TextView  from '../TextView/textView';
import Button from '../Button/button';
import Modal from 'react-native-modal';
import { Colors } from '@constant/index';
import styles from './styles';
import { widthPercentageToDP as wp } from '@constant/dimentions';
import { LinearGradient } from 'expo-linear-gradient';

interface ModalProps {
  showAlert: (
    modalTitle: string,
    modalText: string,
    modalActionButtonText: string,
    modalActionPress: () => void,
    modalType?: string,
    modalCancelButtonText?: string,
    modalCancelPress?: () => void,
  ) => void;
  hideAlert: () => void;
}

const ModalContext = createContext<ModalProps | undefined>(undefined);

export const CommonAlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //Class States
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState('');

  //Update States When Modal is Shown
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalActionButtonText, setModalActionButtonText] = useState('');
  const [modalActionPress, setModalActionPress] = useState<
    (() => void) | undefined
  >(undefined);
  const [modalCancelButtonText, setModalCancelButtonText] = useState('');
  const [modalCancelPress, setModalCancelPress] = useState<(() => void) | undefined>(undefined);

  const showAlert = (
    modalTitle: string,
    modalText: string,
    modalActionButtonText: string = '',
    modalActionPress: () => void = () => { },
    modalType?: string,
    modalCancelButtonText: string = '',
    modalCancelPress: () => void = () => { },
  ) => {
    setModalTitle(modalTitle);
    setModalText(modalText);
    setModalActionButtonText(modalActionButtonText);
    setModalActionPress(() => modalActionPress);
    setModalCancelButtonText(modalCancelButtonText);
    setModalCancelPress(() => modalCancelPress);
    switch (modalType) {
      case 'confirm':
        setTimeout(() => {
          setModalShow(true);
          setModalType('confirm');
        }, 500);
        break;
      case 'internet':
        setTimeout(() => {
          setModalShow(true);
          setModalType('internet');
        }, 500);
        break;
      default:
        setTimeout(() => {
          setModalShow(true);
          setModalType('');
        }, 500);
        break;
    }
  };

  const hideAlert = () => {
    setModalShow(false);
  };

  return (
    <ModalContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Modal isVisible={modalShow}>
        <View style={styles.modalViewContainer}>
          <LinearGradient
            colors={[
              Colors.PRIMARY[100],
              Colors.PRIMARY[200],
              // Colors.PRIMARY[300],
            ]}
            style={styles.modalView}
            start={{ x: .6, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <TextView style={styles.modalTitleText}>
              {modalTitle || 'Something went wrong'}
            </TextView>

            <TextView style={styles.modalText}>{modalText}</TextView>

            <View style={styles.actionButtonView}>
              <LinearGradient
                colors={[
                  Colors.PRIMARY[100],
                  Colors.PRIMARY[200],
                  Colors.PRIMARY[400],
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.7, y: 1 }}
                style={styles.cancelButton}>
                <Pressable onPress={modalActionPress}>
                  <TextView style={styles.caneclButtonText}>
                    {modalActionButtonText}
                  </TextView>
                </Pressable>
              </LinearGradient>
            </View>

            {modalType === 'confirm' && (
              <View style={styles.cancelButtonView}>
                <LinearGradient
                  colors={[
                    Colors.PRIMARY[200],
                    Colors.PRIMARY[500],
                    Colors.PRIMARY[600],
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1.7, y: 1 }}
                  style={styles.cancelButton}>
                  <Pressable onPress={hideAlert}>
                    <TextView style={styles.caneclButtonText}>
                      {modalCancelButtonText}
                    </TextView>
                  </Pressable>
                </LinearGradient>
              </View>
            )}
          </LinearGradient>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

export const CommonAlertModal = (): ModalProps => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error('CommonAlert must be used within a ModalProvider');
  }
  return modalContext;
};
