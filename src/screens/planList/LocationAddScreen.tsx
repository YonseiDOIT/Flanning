// @ts-nocheck
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  FlatList,
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
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
import globalStyles from 'src/assets/styles/globalStyles';

const emojiList = ['🍽️', '🍕', '☕', '🏨', '🛒', '🏝️', '🎡', '🚗'];
const stateList = [
  {
    name: '예약 전',
    value: 0,
  },
  {
    name: '예약 완료',
    value: 1,
  },
];

const LocationAddScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {place, dateList} = route.params;
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
    selectedState: null,
    referenceLink: [],
  });
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

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

  const handleConfirmTime = date => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    setAddPlace(prev => ({...prev, selectedTime: `${hours}:${minutes}`}));
    setTimePickerVisible(false);
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
            <BText fontSize={20}>날짜 설정</BText>
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
            <BText fontSize={20}>시간 설정</BText>
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
                        ? state.value === 0
                          ? fcolor.orange2
                          : fcolor.green2
                        : fcolor.gray1,
                      borderWidth: 2,
                      borderColor: isActive
                        ? state.value === 0
                          ? fcolor.orange
                          : fcolor.green3
                        : fcolor.gray1,
                    }}>
                    <BText
                      fontSize={14}
                      color={
                        isActive
                          ? state.value === 0
                            ? fcolor.orange
                            : fcolor.green3
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
              <TouchableOpacity
                onPress={() => {
                  console.log('링크 추가');
                }}
                // onPress={() =>
                //   setAddPlace(prev => ({
                //     ...prev,
                //     referenceLink: [
                //       ...prev.referenceLink,
                //     ],
                //   }))
                // }
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  width: 40,
                  // paddingHorizontal: 12,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  backgroundColor: fcolor.gray1,
                }}>
                <LinkIcon width={20} height={20} fill={fcolor.gray3} />
                {/* <BText fontSize={14} color={fcolor.gray3}>
                  숙소 위치
                </BText> */}
              </TouchableOpacity>
            </View>
          </View>

          {/* 메모 추가 */}
          <View style={{flexDirection: 'column', gap: 10}}>
            <BText fontSize={20}>메모 추가</BText>
            <View
              style={{flexDirection: 'row', gap: 8, alignItems: 'flex-start'}}>
              <TouchableOpacity
                onPress={() => {
                  console.log('메모 추가');
                }}
                // TODO: 메모 아이콘 추가 기능 구현 예정
                // onPress={() =>
                //   setAddPlace(prev => ({
                //     ...prev,
                //     referenceLink: [
                //       ...prev.referenceLink,
                //     ],
                //   }))
                // }
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
                <DefaultIcon width={26} height={26} fill={fcolor.gray3} />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  backgroundColor: fcolor.gray1,
                  borderRadius: 8,
                  minHeight: 40,
                }}>
                <TextInput
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    fontSize: 14,
                    backgroundColor: fcolor.gray1,
                    textAlignVertical: 'center',
                  }}
                  multiline={true}
                  placeholder="메모를 작성해주세요."
                  placeholderTextColor={fcolor.gray3}
                />
              </View>
            </View>
          </View>

          {/* 교통 정보 추가 */}
          <View style={{flexDirection: 'column', gap: 10}}>
            <BText fontSize={20}>교통정보 추가</BText>
            <View
              style={{flexDirection: 'row', gap: 8, alignItems: 'flex-start'}}>
              <TouchableOpacity
                onPress={() => {
                  console.log('교통정보 추가');
                }}
                // TODO: 메모 아이콘 추가 기능 구현 예정
                // onPress={() =>
                //   setAddPlace(prev => ({
                //     ...prev,
                //     referenceLink: [
                //       ...prev.referenceLink,
                //     ],
                //   }))
                // }
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
                <DefaultIcon width={26} height={26} fill={fcolor.gray3} />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  backgroundColor: fcolor.gray1,
                  borderRadius: 8,
                  minHeight: 40,
                }}>
                <TextInput
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    fontSize: 14,
                    backgroundColor: fcolor.gray1,
                    textAlignVertical: 'center',
                  }}
                  multiline={true}
                  placeholder="이 장소의 교통정보를 작성해주세요."
                  placeholderTextColor={fcolor.gray3}
                />
              </View>
            </View>
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
                {backgroundColor: fcolor.blue, flex: 1},
              ]}
              onPress={() => {
                console.log('addPlace', addPlace);
              }}
              // onPress={() => {
              //   // onClose();
              //   if (isAddType === 'plan') {
              //     navigation.navigate('LocationAdd', {
              //       place,
              //       navigation,
              //       dateList,
              //     });
              //   } else {
              //     console.log('place', place);
              //   }
              // }}
            >
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
});

export default LocationAddScreen;
