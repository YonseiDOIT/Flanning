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

// 일정 상세 페이지
const PlanStep2Screen = () => {
  const {planMData, handleStepNext, setPlanMData} = usePlanM();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  let planMContext = usePlanM();

  const [place, setPlace] = useState('');

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

    handleStepNext();
  };

  return (
    <Animated.View style={{flex: 1, opacity: fadeAnim}}>
      <View style={{marginTop: 0, gap: 9, paddingHorizontal: 30}}>
        <View style={{flexDirection: 'row'}}>
          <BText>여행 장소를 알려주세요</BText>
          <MText color={fcolor.orange}>*</MText>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 190,
          backgroundColor: fcolor.gray3,
          marginTop: 16,
        }}
      />

      <View style={{flex: 1, paddingHorizontal: 30, paddingBottom: 30}}>
        <View style={styles.box}>
          <TextInput
            style={{fontSize: 13}}
            onChangeText={text => setPlace(text)}
            placeholder={'지역을 검색해보세요'}
            placeholderTextColor={fcolor.gray3}
          />
          <TouchableOpacity>
            <Mt_Icon name="search" size={24} color={fcolor.blue} />
          </TouchableOpacity>
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
                place
                  ? {backgroundColor: fcolor.blue}
                  : {backgroundColor: fcolor.gray4},
              ]}
              disabled={!place}
              onPress={() => handleChange(place)}>
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
    flexDirection: 'row',
    marginTop: 47,
    justifyContent: 'space-between',
  },
});

export default PlanStep2Screen;
