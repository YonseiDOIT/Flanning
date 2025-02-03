// @ts-nocheck
import {Link, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Keyboard,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import BText from 'src/components/common/BText';
import FontASIcon from 'react-native-vector-icons/FontAwesome';
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
import {usePlan} from 'src/context';
import {firestore} from 'src/utils/firebase';
import placeType from 'src/assets/json/placeType.json';

const emojiList = ['🍽️', '🍕', '☕', '🏨', '🛒', '🏝️', '🎡', '🚗'];
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
  const {planDetailData} = usePlan();
  const {place, dateList, planItem} = route.params;
  // const place = {
  //   location: '대한민국 강원특별자치도 원주시 중앙로 28',
  //   locationMap: {latitude: 37.3463543, longitude: 127.9540423},
  //   locationTitle: '금성식당',
  //   locationType: 'restaurant',
  // };
  // const dateList = ['2025-01-21', '2025-01-22', '2025-01-23'];
  // 선택된 이모지 저장
  const [selectedEmoji, setSelectedEmoji] = useState(null);
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
  const [deleteLinkModeIndex, setDeleteLinkModeIndex] = useState(null);

  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (isLinkModalVisible) {
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
  }, [isLinkModalVisible]);

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

  const handleAddPlace = async (place, planItem) => {
    const planId = planItem.id;

    const filteredType = placeType[place.locationType];

    const placeData = {
      locationTitle: place.locationTitle,
      location: place.location,
      locationType: filteredType,
      locationMap: place.locationMap,
      locationIcon: place.selectedEmoji,
      time: place.selectedTime,
      state: place.selectedState,
      referenceLink: place.referenceLink,
      memo: place.memo,
      movePath: place.movePath,
    };

    const planListRef = firestore()
      .collection('plan')
      .doc(planId)
      .collection('planList')
      .doc(place.selectedDate);

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
          <TouchableOpacity onPress={() => {}} style={styles.emojiButton}>
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
                addPlace={addPlace}
                index={idx}
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
                  flex: 1,
                },
              ]}
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
                setIsLinkModalVisible(false);
              }}
            />
          </Animated.View>
          <LinkModal
            isLinkModalVisible={isLinkModalVisible}
            setIsLinkModalVisible={setIsLinkModalVisible}
            backgroundOpacity={backgroundOpacity}
            modalTranslateY={modalTranslateY}
            setAddPlace={setAddPlace}
          />
        </>
      )}
    </View>
  );
};

// 링크 추가 모달
const LinkModal = ({
  isLinkModalVisible,
  setIsLinkModalVisible,
  backgroundOpacity,
  modalTranslateY,
  setAddPlace,
}) => {
  const [link, setLink] = useState({
    title: '',
    url: '',
  });

  if (!isLinkModalVisible) {
    return null;
  }

  const handleChange = (text, type) => {
    setLink(prev => ({...prev, [type]: text}));
  };

  const handleSave = () => {
    if (!link.title.trim() || !link.url.trim()) {
      return; // 제목 또는 URL이 비어 있으면 저장하지 않음
    }
    setIsLinkModalVisible(false);
    setAddPlace(prev => ({
      ...prev,
      referenceLink: [...prev.referenceLink, link],
    }));
  };

  return (
    <Modal transparent visible={isLinkModalVisible} animationType="slide">
      {/* 배경 애니메이션 */}

      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{translateY: modalTranslateY}],
          },
        ]}>
        <View style={{flex: 1, gap: 30}}>
          <View>
            <BText>장소와 관련된</BText>
            <BText>링크를 추가해보세요</BText>
          </View>
          <View style={{flex: 1, gap: 20}}>
            {/* 링크 제목 */}
            <View style={{flexDirection: 'column', gap: 8}}>
              <BText fontSize={20}>링크 제목</BText>
              <TextInput
                style={[globalStyles.inputBase]}
                onChangeText={text => handleChange(text, 'title')}
                placeholder={'최대 4글자까지 가능해요'}
                placeholderTextColor={fcolor.gray3}
                maxLength={4}
                value={link.title}
              />
            </View>

            {/* 링크 추가 */}
            <View style={{flexDirection: 'column', gap: 8}}>
              <BText fontSize={20}>URL 주소</BText>
              <TextInput
                style={[globalStyles.inputBase]}
                onChangeText={text => handleChange(text, 'url')}
                placeholder={'주소를 추가해주세요'}
                placeholderTextColor={fcolor.gray3}
                value={link.url}
              />
            </View>
          </View>
        </View>

        {/* 버튼 */}
        <View
          style={{
            gap: 10,
          }}>
          <TouchableOpacity
            style={[
              globalStyles.buttonBase,
              {
                backgroundColor:
                  !link.title.trim() || !link.url.trim()
                    ? fcolor.gray2
                    : fcolor.blue,
              },
            ]}
            disabled={!link.title.trim() || !link.url.trim()}
            onPress={() => handleSave()}>
            <MText color={fcolor.white}>장소 추가</MText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.buttonBase, {backgroundColor: fcolor.gray4}]}
            onPress={() => {
              setIsLinkModalVisible(false);
            }}>
            <MText color={fcolor.white}>닫기</MText>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

// 메모 컴포넌트
const MemoItem = ({memo, setAddPlace, addPlace, index}) => {
  const [memoContent, setMemoContent] = useState(memo.content);
  const [memoIcon, setMemoIcon] = useState(memo.icon);

  const handleTextChange = text => {
    setAddPlace(prev => {
      const updatedMemo = [...prev.memo];

      if (!updatedMemo[index]) {
        updatedMemo[index] = {icon: '', content: text};
      } else {
        updatedMemo[index] = {...updatedMemo[index], content: text}; // 기존 icon 유지
      }

      return {...prev, memo: updatedMemo};
    });
  };

  const handleIconChange = () => {
    setAddPlace(prev => {
      const updatedMemo = [...prev.memo];

      if (!updatedMemo[index]) {
        updatedMemo[index] = {icon: 'article', content: ''};
      } else {
        updatedMemo[index] = {...updatedMemo[index], icon: 'article'}; // 기존 content 유지
      }

      return {...prev, memo: updatedMemo};
    });
  };

  return (
    <View style={{flexDirection: 'row', gap: 8, alignItems: 'flex-start'}}>
      <TouchableOpacity
        onPress={handleIconChange}
        // TODO: 메모 아이콘 추가 기능 구현 예정
        style={{
          flexDirection: 'row',
          gap: 4,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          backgroundColor: memo.icon === '' ? fcolor.gray1 : fcolor.blue,
        }}>
        <DefaultIcon width={26} height={26} fill={fcolor.gray3} />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          paddingVertical: 8,
          paddingHorizontal: 10,
          backgroundColor: memo.content === '' ? fcolor.gray1 : fcolor.blue,
          borderRadius: 8,
          minHeight: 40,
        }}>
        <TextInput
          style={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            fontSize: 14,
            backgroundColor: 'transparent',
            textAlignVertical: 'center',
            color: fcolor.white,
            fontFamily: 'Pretendard-Medium',
          }}
          multiline={true}
          placeholder="메모를 작성해주세요."
          placeholderTextColor={fcolor.gray3}
          value={memo.content}
          onChangeText={handleTextChange}
        />
      </View>
    </View>
  );
};

// 교통정보 컴포넌트
const TrafficItem = ({movePath, setAddPlace, addPlace, index}) => {
  const [trafficIcon, setTrafficIcon] = useState(movePath.icon);
  const [trafficDescription, setTrafficDescription] = useState(
    movePath.description,
  );

  const handleTextChange = text => {
    setAddPlace(prev => {
      const updatedTraffic = [...prev.movePath];

      if (!updatedTraffic[index]) {
        updatedTraffic[index] = {icon: '', description: text};
      } else {
        updatedTraffic[index] = {...updatedTraffic[index], description: text}; // 기존 icon 유지
      }

      return {...prev, movePath: updatedTraffic};
    });
  };

  const handleIconChange = () => {
    setAddPlace(prev => {
      const updatedTraffic = [...prev.movePath];

      if (!updatedTraffic[index]) {
        updatedTraffic[index] = {icon: 'article', description: ''};
      } else {
        updatedTraffic[index] = {...updatedTraffic[index], icon: 'article'}; // 기존 content 유지
      }

      return {...prev, movePath: updatedTraffic};
    });
  };

  return (
    <View style={{flexDirection: 'row', gap: 8, alignItems: 'flex-start'}}>
      <TouchableOpacity
        onPress={handleIconChange}
        // TODO: 메모 아이콘 추가 기능 구현 예정
        style={{
          flexDirection: 'row',
          gap: 4,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          backgroundColor: movePath.icon === '' ? fcolor.gray1 : fcolor.blue,
        }}>
        <DefaultIcon width={26} height={26} fill={fcolor.gray3} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          paddingVertical: 8,
          paddingHorizontal: 10,
          backgroundColor:
            movePath.description === '' ? fcolor.gray1 : fcolor.blue,
          borderRadius: 8,
          minHeight: 40,
        }}>
        <TextInput
          style={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            fontSize: 14,
            textAlignVertical: 'center',
            color: fcolor.white,
            fontFamily: 'Pretendard-Medium',
          }}
          multiline={true}
          placeholder="이 장소의 교통정보를 작성해주세요."
          placeholderTextColor={fcolor.gray3}
          value={movePath.description}
          onChangeText={handleTextChange}
        />
      </View>
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
  modalContent: {
    // flex: 1,
  },
});

export default LocationAddScreen;
