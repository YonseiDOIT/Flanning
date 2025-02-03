// @ts-nocheck
import {Link, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  Animated,
  Easing,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import BText from 'src/components/common/BText';
import fcolor from 'src/assets/colors/fcolors';
import MText from 'src/components/common/MText';
import BackHeader from 'src/components/common/BackHeader';
import DefaultIcon from 'src/components/common/DefaultIcon';
import MapView, {Marker} from 'react-native-maps';
import CustomMarker from 'src/components/common/CustomMarker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LinkIcon from 'src/components/common/icons/LinkIcon';
import TrashIcon from 'src/components/common/icons/TrashIcon';
import globalStyles from 'src/assets/styles/globalStyles';
import {firestore} from 'src/utils/firebase';
import placeType from 'src/assets/json/placeType.json';
import EmojiPicker from 'rn-emoji-keyboard';
import TrafficItem from './components/TrafficItem';
import MemoItem from './components/MemoItem';
import MemoIconModal from './components/MemoIconModal';
import LinkModal from './components/LinkModal';
import {TrafficIconModal} from './components/TrafficIconModal';

const stateList = [
  {
    name: '표시 안함',
    value: 0,
  },
  {
    name: '예약 전',
    value: 1,
  },
  {
    name: '예약 완료',
    value: 2,
  },
];

const LocationAddScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {place, dateList, planItem} = route.params;
  // const place = {
  //   location: '대한민국 강원특별자치도 원주시 중앙로 28',
  //   locationMap: {latitude: 37.3463543, longitude: 127.9540423},
  //   locationTitle: '금성식당',
  //   locationType: 'restaurant',
  // };
  // const dateList = ['2025-01-21', '2025-01-22', '2025-01-23'];
  // const planItem = {
  //   id: '123',
  //   title: '플래닝 테스트',
  //   dayList: ['2025-01-21', '2025-01-22', '2025-01-23'],
  //   area: '강원특별자치도',
  // };
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const mapRef = useRef(null);
  const [addPlace, setAddPlace] = useState({
    locationTitle: place.locationTitle,
    location: place.location,
    locationType: place.locationType,
    locationMap: place.locationMap,
    selectedEmoji: null,
    selectedDate: dateList[0],
    selectedTime: null,
    selectedState: 0,
    referenceLink: [],
    memo: [],
    movePath: [],
  });
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [isMemoIconModalVisible, setIsMemoIconModalVisible] = useState(false);
  const [isTrafficIconModalVisible, setIsTrafficIconModalVisible] =
    useState(false);
  const [selectedMemoIconIndex, setSelectedMemoIconIndex] = useState(null);
  const [selectedTrafficIconIndex, setSelectedTrafficIconIndex] =
    useState(null);
  const [deleteLinkModeIndex, setDeleteLinkModeIndex] = useState(null);
  const [deleteMemoModeIndex, setDeleteMemoModeIndex] = useState(null);
  const [deleteTrafficModeIndex, setDeleteTrafficModeIndex] = useState(null);
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (
      isLinkModalVisible ||
      isMemoIconModalVisible ||
      isTrafficIconModalVisible
    ) {
      Animated.parallel([
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 500,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]).start(() => {
        setIsLinkModalVisible(false);
      });
    }
  }, [isLinkModalVisible, isMemoIconModalVisible, isTrafficIconModalVisible]);

  useEffect(() => {
    if (mapRef.current && place.locationMap) {
      mapRef.current.animateToRegion(
        {
          latitude: place.locationMap.latitude,
          longitude: place.locationMap.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        },
        500,
      );
    }
  }, []);

  const handleDeleteLink = index => {
    setAddPlace(prev => ({
      ...prev,
      referenceLink: prev.referenceLink.filter((_, idx) => idx !== index),
    }));
    setDeleteLinkModeIndex(null);
  };

  const handleConfirmTime = date => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    setAddPlace(prev => ({...prev, selectedTime: `${hours}:${minutes}`}));
    setTimePickerVisible(false);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;
    const distanceM = distanceKm * 1000;

    return {distanceKm, distanceM};
  };

  const handleAddPlace = async (place, planItem) => {
    const planId = planItem.id;

    const filteredType = placeType[place.locationType];

    const isValidArray = arr =>
      Array.isArray(arr) &&
      arr.length > 0 &&
      arr.some(item => Object.values(item).some(value => value !== ''));

    const placeData = {
      locationTitle: place.locationTitle,
      location: place.location,
      locationType: filteredType,
      locationMap: place.locationMap,
      locationIcon: place.selectedEmoji,
      time: place.selectedTime,
      state: place.selectedState,
      referenceLink: place.referenceLink,
      memo: isValidArray(place.memo) ? place.memo : [],
      movePath: isValidArray(place.movePath) ? place.movePath : [],
    };

    const planListRef = firestore()
      .collection('plan')
      .doc(planId)
      .collection('planList')
      .doc(place.selectedDate);

    // 이전 데이터 값 가져오기
    try {
      const docSnapshot = await planListRef.get();
      let prevData = null;
      let distanceToNext = 0;

      if (docSnapshot.exists) {
        const planArray = docSnapshot.data().plan || [];

        if (planArray.length > 0) {
          prevData = planArray[planArray.length - 1];
          const distanceResult = getDistance(
            prevData.locationMap.latitude,
            prevData.locationMap.longitude,
            place.locationMap.latitude,
            place.locationMap.longitude,
          );
          if (distanceResult.distanceKm < 1) {
            distanceToNext = distanceResult.distanceM.toFixed(0) + 'm';
          } else if (distanceResult.distanceKm.toFixed(1) < 9.9) {
            distanceToNext = distanceResult.distanceKm.toFixed(1) + 'km';
          } else {
            distanceToNext = distanceResult.distanceKm.toFixed(0) + 'km';
          }

          planArray[planArray.length - 1] = {
            ...prevData,
            distanceToNext: distanceToNext,
          };

          await planListRef.update({
            plan: planArray,
          });
        }
      }
    } catch (e) {
      console.error('이전 데이터 값 불러오기 오류:', e);
    }

    try {
      const docSnapshot = await planListRef.get();

      if (docSnapshot.exists) {
        await planListRef.update({
          plan: firestore.FieldValue.arrayUnion(placeData),
        });
      } else {
        await planListRef.set({
          plan: [placeData],
        });
      }
      navigation.goBack();
    } catch (e) {
      console.error('🔥 LocationAddScreen error (handleAddPlace):', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackHeader navigation={navigation} />
      </View>
      <ScrollView>
        {/* 장소 정보 */}
        <View style={styles.placeInfoContainer}>
          <TouchableOpacity
            onPress={() => {
              setEmojiPickerVisible(true);
            }}
            style={styles.emojiButton}>
            {addPlace.selectedEmoji ? (
              <BText fontSize={24}>{addPlace.selectedEmoji}</BText>
            ) : (
              <DefaultIcon fill={fcolor.gray3} width={26} height={26} />
            )}
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <BText fontSize={28}>{place.locationTitle}</BText>
            <MText
              fontSize={14}
              color={fcolor.gray4}
              style={{flexWrap: 'wrap'}}>
              {place.location}
            </MText>
          </View>
        </View>

        {/* 지도 */}
        <View style={styles.mapContainer}>
          <MapView ref={mapRef} style={styles.map}>
            <Marker coordinate={place.locationMap}>
              <CustomMarker width={32} height={32} fill={fcolor.blue} />
            </Marker>
          </MapView>
        </View>

        {/* 장소 정보 입력 */}
        <View style={{padding: 30, gap: 26}}>
          {/* 날짜 설정 */}
          <View style={{flexDirection: 'column', gap: 10}}>
            <View style={{flexDirection: 'row', gap: 4}}>
              <BText fontSize={20}>날짜 설정</BText>
              <BText fontSize={16} color={fcolor.orange}>
                *
              </BText>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{flexDirection: 'row'}}>
              {dateList.map((date, idx) => {
                const isActive = date === addPlace.selectedDate;

                const month = date.split('-')[1];
                const day = date.split('-')[2];

                return (
                  <TouchableOpacity
                    key={`date-${idx}`}
                    style={{
                      backgroundColor: isActive ? fcolor.blue : fcolor.gray1,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderRadius: 8,
                      marginRight: 8,
                    }}
                    onPress={() =>
                      setAddPlace(prev => ({...prev, selectedDate: date}))
                    }>
                    <MText
                      fontSize={14}
                      color={isActive ? fcolor.white : fcolor.gray3}>
                      {`${month}.${day}`}
                    </MText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* 시간 설정 */}
          <View style={{flexDirection: 'column', gap: 10}}>
            <View style={{flexDirection: 'row', gap: 4}}>
              <BText fontSize={20}>시간 설정</BText>
            </View>
            <View style={{flexDirection: 'row', gap: 8}}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: addPlace.selectedTime
                    ? fcolor.blue
                    : fcolor.gray1,
                }}
                onPress={() => {
                  setTimePickerVisible(true);
                  setAddPlace(prev => ({
                    ...prev,
                    selectedTime: prev.selectedTime,
                  }));
                }}>
                <MText
                  fontSize={14}
                  color={addPlace.selectedTime ? fcolor.white : fcolor.gray3}>
                  {addPlace.selectedTime ? addPlace.selectedTime : '00:00'}
                </MText>
              </TouchableOpacity>
            </View>
          </View>

          {/* 예약 상태 설정 */}
          <View style={{flexDirection: 'column', gap: 10}}>
            <BText fontSize={20}>예약 표시</BText>
            <View style={{flexDirection: 'row', gap: 8}}>
              {stateList.map((state, idx) => {
                const isActive = state.value === addPlace.selectedState;

                return (
                  <TouchableOpacity
                    key={`state-${idx}`}
                    onPress={() =>
                      setAddPlace(prev => ({
                        ...prev,
                        selectedState: state.value,
                      }))
                    }
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderRadius: 8,
                      backgroundColor: isActive
                        ? state.value === 1
                          ? fcolor.orange2
                          : state.value === 2
                          ? fcolor.green2
                          : fcolor.gray2
                        : fcolor.gray1,
                      borderWidth: 2,
                      borderColor: isActive
                        ? state.value === 1
                          ? fcolor.orange
                          : state.value === 2
                          ? fcolor.green3
                          : fcolor.gray4
                        : fcolor.gray1,
                    }}>
                    <BText
                      fontSize={14}
                      color={
                        isActive
                          ? state.value === 1
                            ? fcolor.orange
                            : state.value === 2
                            ? fcolor.green3
                            : fcolor.gray4
                          : fcolor.gray3
                      }>
                      {state.name}
                    </BText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 링크 추가 */}
          <View style={{flexDirection: 'column', gap: 10}}>
            <BText fontSize={20}>링크 추가</BText>
            <View style={{flexDirection: 'row', gap: 8}}>
              {addPlace.referenceLink.length > 0 &&
                addPlace.referenceLink.map((link, idx) => (
                  <TouchableOpacity
                    key={`link-${idx}`}
                    onPress={() => {
                      if (deleteLinkModeIndex === idx) {
                        handleDeleteLink(idx);
                      } else {
                        Linking.openURL(link.url);
                      }
                    }}
                    onLongPress={() => {
                      if (deleteLinkModeIndex === idx) {
                        setDeleteLinkModeIndex(null);
                      } else {
                        setDeleteLinkModeIndex(idx);
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      gap: 4,
                      paddingHorizontal: 12,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      backgroundColor:
                        deleteLinkModeIndex === idx
                          ? fcolor.gray4
                          : fcolor.blue,
                    }}>
                    {deleteLinkModeIndex === idx ? (
                      <TrashIcon width={20} height={20} fill={fcolor.white} />
                    ) : (
                      <LinkIcon width={20} height={20} fill={fcolor.white} />
                    )}
                    <BText fontSize={14} color={fcolor.white}>
                      {deleteLinkModeIndex === idx ? '삭제하기' : link.title}
                    </BText>
                  </TouchableOpacity>
                ))}
              {addPlace.referenceLink.length < 3 && (
                <TouchableOpacity
                  onPress={() => {
                    setIsLinkModalVisible(true);
                  }}
                  style={{
                    flexDirection: 'row',
                    gap: 4,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    backgroundColor: fcolor.gray1,
                  }}>
                  <LinkIcon width={20} height={20} fill={fcolor.gray3} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* 메모 추가 */}
          <View style={{flexDirection: 'column', gap: 10}}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 4,
              }}>
              <BText fontSize={20}>메모 추가</BText>
              <MText fontSize={14} color={fcolor.gray4}>
                아이콘을 선택해야 메모가 저장됩니다.
              </MText>
            </View>
            {addPlace.memo.map((memo, idx) => (
              <MemoItem
                key={`memo-${idx}`}
                memo={memo}
                setAddPlace={setAddPlace}
                setSelectedMemoIconIndex={setSelectedMemoIconIndex}
                addPlace={addPlace}
                setIsMemoIconModalVisible={setIsMemoIconModalVisible}
                index={idx}
                deleteMemoModeIndex={deleteMemoModeIndex}
                setDeleteMemoModeIndex={setDeleteMemoModeIndex}
              />
            ))}
            {addPlace.memo.length === 0 ||
            (addPlace.memo.length < 3 &&
              addPlace.memo[addPlace.memo.length - 1].icon !== '' &&
              addPlace.memo[addPlace.memo.length - 1].content !== '') ? (
              <MemoItem
                memo={{icon: '', content: ''}}
                setAddPlace={setAddPlace}
                addPlace={addPlace}
                index={addPlace.memo.length}
                setIsMemoIconModalVisible={setIsMemoIconModalVisible}
                setSelectedMemoIconIndex={setSelectedMemoIconIndex}
                deleteMemoModeIndex={deleteMemoModeIndex}
                setDeleteMemoModeIndex={setDeleteMemoModeIndex}
              />
            ) : null}
          </View>

          {/* 교통 정보 추가 */}
          <View style={{flexDirection: 'column', gap: 10}}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 4,
              }}>
              <BText fontSize={20}>교통정보 추가</BText>
              <MText fontSize={14} color={fcolor.gray4}>
                아이콘을 선택해야 교통정보가 저장됩니다.
              </MText>
            </View>
            {addPlace.movePath.map((movePath, idx) => (
              <TrafficItem
                key={`traffic-${idx}`}
                movePath={movePath}
                setAddPlace={setAddPlace}
                addPlace={addPlace}
                index={idx}
                setIsTrafficIconModalVisible={setIsTrafficIconModalVisible}
                setSelectedTrafficIconIndex={setSelectedTrafficIconIndex}
                deleteTrafficModeIndex={deleteTrafficModeIndex}
                setDeleteTrafficModeIndex={setDeleteTrafficModeIndex}
              />
            ))}
            {addPlace.movePath.length === 0 ||
            (addPlace.movePath.length < 3 &&
              addPlace.movePath[addPlace.movePath.length - 1].icon !== '' &&
              addPlace.movePath[addPlace.movePath.length - 1].description !==
                '') ? (
              <TrafficItem
                movePath={{icon: '', description: ''}}
                setAddPlace={setAddPlace}
                addPlace={addPlace}
                index={addPlace.movePath.length}
                setIsTrafficIconModalVisible={setIsTrafficIconModalVisible}
                setSelectedTrafficIconIndex={setSelectedTrafficIconIndex}
                deleteTrafficModeIndex={deleteTrafficModeIndex}
                setDeleteTrafficModeIndex={setDeleteTrafficModeIndex}
              />
            ) : null}
          </View>

          {/* 장소 추가 버튼 */}
          <View
            style={{
              flex: 1,
              marginTop: 80,
              marginBottom: 30,
            }}>
            <TouchableOpacity
              style={[
                globalStyles.buttonBase,
                {
                  backgroundColor: fcolor.blue,
                  // isValidMemoAndTraffic
                  //   ? fcolor.blue
                  //   : fcolor.gray2,
                  flex: 1,
                },
              ]}
              // disabled={!isValidMemoAndTraffic}
              onPress={() => {
                handleAddPlace(addPlace, planItem);
              }}>
              <MText color={fcolor.white}>장소 추가</MText>
            </TouchableOpacity>
          </View>
        </View>

        {/* iOS에서는 Modal Time Picker 사용 */}
        {Platform.OS === 'ios' && (
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            date={
              addPlace.selectedTime
                ? new Date(
                    new Date().setHours(
                      parseInt(addPlace.selectedTime.split(':')[0], 10),
                      parseInt(addPlace.selectedTime.split(':')[1], 10),
                    ),
                  )
                : new Date()
            }
            onConfirm={handleConfirmTime}
            onCancel={() => setTimePickerVisible(false)}
            locale="ko_KR"
          />
        )}

        {/* Android에서는 DateTimePicker 사용 */}
        {Platform.OS === 'android' && isTimePickerVisible && (
          <DateTimePicker
            mode="time"
            display="spinner"
            value={
              addPlace.selectedTime
                ? new Date(
                    new Date().setHours(
                      parseInt(addPlace.selectedTime.split(':')[0], 10),
                      parseInt(addPlace.selectedTime.split(':')[1], 10),
                    ),
                  )
                : new Date()
            }
            onChange={(event, date) => {
              setTimePickerVisible(false);
              if (event.type === 'set' && date) {
                handleConfirmTime(date);
              }
            }}
          />
        )}
      </ScrollView>

      <EmojiPicker
        open={isEmojiPickerVisible}
        onEmojiSelected={emoji => {
          setAddPlace(prev => ({
            ...prev,
            selectedEmoji: emoji.emoji,
          }));
        }}
        onClose={() => {
          setEmojiPickerVisible(false);
        }}
      />

      {/* 링크 추가 모달 */}
      {isLinkModalVisible && (
        <>
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
              onPress={() => {
                console.log('링크 모달 닫기');
                // setIsLinkModalVisible(false);
              }}
            />
          </Animated.View>
          <LinkModal
            isLinkModalVisible={isLinkModalVisible}
            setIsLinkModalVisible={setIsLinkModalVisible}
            setAddPlace={setAddPlace}
          />
        </>
      )}

      {/* 메모 아이콘 모달 */}
      {isMemoIconModalVisible && (
        <>
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
              onPress={() => {
                console.log('아이콘 모달 닫기');
              }}
            />
          </Animated.View>
          <MemoIconModal
            isMemoIconModalVisible={isMemoIconModalVisible}
            setIsMemoIconModalVisible={setIsMemoIconModalVisible}
            setAddPlace={setAddPlace}
            index={selectedMemoIconIndex}
          />
        </>
      )}

      {isTrafficIconModalVisible && (
        <>
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
              onPress={() => {
                console.log('교통 아이콘 모달 닫기');
              }}
            />
          </Animated.View>
          <TrafficIconModal
            isTrafficIconModalVisible={isTrafficIconModalVisible}
            setIsTrafficIconModalVisible={setIsTrafficIconModalVisible}
            setAddPlace={setAddPlace}
            index={selectedTrafficIconIndex}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderColor: fcolor.gray1,
  },
  placeInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    gap: 10,
    marginBottom: 20,
  },
  mapContainer: {
    height: 240,
  },
  map: {
    flex: 1,
  },
  headerContent: {
    marginHorizontal: 20,
  },
  headerTop: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    gap: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    gap: 10,
    alignItems: 'center',
  },
  emojiButton: {
    width: 40,
    height: 40,
    backgroundColor: fcolor.gray1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 링크 추가모달
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  overlayTouchable: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '60%',
    backgroundColor: fcolor.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
});

export default LocationAddScreen;
