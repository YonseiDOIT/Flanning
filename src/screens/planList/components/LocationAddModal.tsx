// @ts-nocheck
import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Easing,
  TextInput,
  ScrollView,
} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import BText from 'src/components/common/BText';
import globalStyles from 'src/assets/styles/globalStyles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MText from 'src/components/common/MText';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import GooglePlacesSearch from './GooglePlacesSearch';

const LocationAddModal = ({
  isVisible,
  navigation,
  onClose,
  dateList,
  planItem,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(isVisible);
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(800)).current;
  const [isAddTypeModal, setIsAddTypeModal] = useState(false);
  const [isAddType, setIsAddType] = useState<'plan' | 'map'>('plan');
  const [place, setPlace] = useState([]);

  useEffect(() => {
    if (isVisible) {
      setIsModalVisible(true);
      setIsAddTypeModal(false);
      setPlace(null);
      Animated.parallel([
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.ease,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.ease,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.ease,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 800,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.ease,
        }),
      ]).start(() => {
        setIsModalVisible(false);
      });
    }
  }, [isVisible, backgroundOpacity, modalTranslateY]);

  if (!isModalVisible) {
    // 모달 애니메이션이 끝난 후 모달 없애기
    return null;
  }

  return (
    <Modal animationType="none" transparent visible={isModalVisible}>
      {/* 배경 애니메이션 */}
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: backgroundOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)'],
            }),
          },
        ]}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          onPress={() => {
            console.log('배경 터치');
            onClose();
          }}
        />
      </Animated.View>

      {/* 모달 컨테이너 애니메이션 */}
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{translateY: modalTranslateY}],
          },
        ]}>
        <View style={styles.modalContent}>
          <View style={{zIndex: 5}}>
            <View style={styles.modalTitle}>
              <BText fontSize={28}>추가할 장소를</BText>
              <BText fontSize={28}>검색해주세요</BText>
            </View>

            <View style={{position: 'relative', zIndex: 4}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={() => {
                  setIsAddTypeModal(prev => !prev);
                }}>
                <MText color={fcolor.gray4}>
                  {isAddType === 'plan' ? '일정에 추가' : '지도에 저장'}
                </MText>
                {isAddTypeModal ? (
                  <AntDesignIcon
                    name="caretup"
                    size={12}
                    color={fcolor.gray3}
                  />
                ) : (
                  <AntDesignIcon
                    name="caretdown"
                    size={12}
                    color={fcolor.gray3}
                  />
                )}
              </TouchableOpacity>
              {isAddTypeModal && (
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 20,
                    flexDirection: 'column',
                    backgroundColor: fcolor.white,
                    borderRadius: 10,
                    ...globalStyles.shadowBase,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsAddType('map');
                      setIsAddTypeModal(false);
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 40,
                    }}>
                    <MText>지도에 저장</MText>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: fcolor.gray2,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setIsAddType('plan');
                      setIsAddTypeModal(false);
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 40,
                    }}>
                    <MText>일정에 추가</MText>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <GooglePlacesSearch onPlaceSelected={setPlace} />
          {place && (
            <View
              style={{
                backgroundColor: fcolor.gray1,
                padding: 10,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <MText fontSize={20}>📍</MText>
              <View style={{gap: 5}}>
                <BText fontSize={16} color={fcolor.blue}>
                  {place.locationTitle}
                </BText>
                <MText fontSize={14} color={fcolor.gray4}>
                  {place.location.length > 30
                    ? place.location.slice(0, 26) + '...'
                    : place.location}
                </MText>
              </View>
            </View>
          )}
          <View
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              gap: 10,
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={[
                globalStyles.buttonBase,
                globalStyles.centered,
                {backgroundColor: fcolor.gray4, flex: 1},
              ]}
              onPress={onClose}>
              <MText color={fcolor.white}>닫기</MText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.buttonBase,
                globalStyles.centered,
                {backgroundColor: !place ? fcolor.gray2 : fcolor.blue, flex: 1},
              ]}
              disabled={!place}
              onPress={() => {
                onClose();
                if (isAddType === 'plan') {
                  navigation.navigate('LocationAdd', {
                    place,
                    dateList,
                    planItem,
                  });
                } else {
                  console.log('place', place);
                }
              }}>
              <MText color={fcolor.white}>장소 추가</MText>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1, // 배경을 터치했을 때 닫히도록 설정
  },
  modalTitle: {
    alignItems: 'flex-start',
    gap: 3,
    marginBottom: 24,
  },
  modalSearch: {
    position: 'relative',
    zIndex: 3,
  },
  modalSearchIcon: {
    position: 'absolute',
    alignItems: 'center',
    right: 10,
    top: 10,
    zIndex: 2,
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '80%',
    backgroundColor: fcolor.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    paddingVertical: 40,
  },
  modalContent: {
    justifyContent: 'space-between',
    height: '100%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: fcolor.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default LocationAddModal;
