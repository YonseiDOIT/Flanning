import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import {usePlanM} from './PlanMakeProvider';
import {TextInput} from 'react-native-gesture-handler';
// import MapView from 'react-native-maps';
import Mt_Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {Polygon} from 'react-native-maps';
import regionData from 'src/assets/json/regions.json';
import RNPickerSelect from 'react-native-picker-select';

const WonjuCoordinates = [
  {latitude: 37.373, longitude: 127.92},
  {latitude: 37.4, longitude: 127.95},
  {latitude: 37.45, longitude: 127.93},
  {latitude: 37.42, longitude: 127.88},
  {latitude: 37.373, longitude: 127.92}, // 닫힘 (첫 좌표와 동일하게)
];

// 일정 상세 페이지
const PlanStep2Screen = () => {
  const {planMData, handleStepNext, setPlanMData} = usePlanM();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  let planMContext = usePlanM();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleChange = value => {
    setPlanMData(prevData => ({
      ...prevData,
      step2: {
        ...prevData.step2,
        ['place']: value,
      },
    }));
  };

  return (
    <Animated.View style={{flex: 1, opacity: fadeAnim}}>
      <View style={{marginTop: 0, gap: 9, paddingHorizontal: 30}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <BText>여행 장소를 알려주세요</BText>
          <MText color={fcolor.orange}>*</MText>
        </View>
      </View>
      {/* TODO: 추후에 지역을 picker로 선택했을 때 coordinates에 따른 영역이 지도에 표시되도록 수정 */}
      {/* <View
        style={{
          width: '100%',
          height: 240,
        }}>
        <MapView
          style={{
            flex: 1,
          }}
          initialRegion={{
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Polygon
            coordinates={WonjuCoordinates}
            strokeWidth={2}
            strokeColor={fcolor.blue}
            fillColor="rgba(0, 0, 255, 0.3)"
          />
        </MapView>
      </View> */}

      <View style={{flex: 1, paddingHorizontal: 30, paddingBottom: 30}}>
        <View style={styles.box}>
          <TextInput
            style={{fontSize: 13}}
            onChangeText={text => handleChange(text)}
            placeholder={'지역을 검색해보세요'}
            placeholderTextColor={fcolor.gray3}
            value={planMData.step2.place}
          />
          {/* <TouchableOpacity>
            <Mt_Icon name="search" size={24} color={fcolor.blue} />
          </TouchableOpacity> */}
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 34}}>
          <View style={{flexDirection: 'row', gap: 21}}>
            <TouchableOpacity
              style={[
                globalStyles.buttonBase,
                {flex: 1, backgroundColor: fcolor.lblue3},
              ]}
              onPress={() =>
                planMContext.setPlanMStep(planMContext.planMStep - 1)
              }>
              <MText color={fcolor.lblue4}>이전</MText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.buttonBase,
                {flex: 1},
                planMData.step2.place
                  ? {backgroundColor: fcolor.blue}
                  : {backgroundColor: fcolor.gray4},
              ]}
              disabled={!planMData.step2.place}
              onPress={() => handleStepNext()}>
              <MText color={fcolor.white}>다음</MText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 45,
    backgroundColor: fcolor.gray1,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PlanStep2Screen;
