import React, { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import { usePlanM } from './PlanMakeProvider';

// 일정 상세 페이지
const PlanStep1Screen = () => {
  const { planMData, handleStepNext, setPlanMData } = usePlanM();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [title, setTitle] = useState('')

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleChange = (field, value) => {
    setPlanMData(prevData => ({
      ...prevData,
      step1: {
        ...prevData.step1,
        [field]: value,
      },
    }));
    
  };

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim, paddingHorizontal: 30, paddingBottom: 30 }}>

      <View style={{ marginTop: 0, gap: 9, marginBottom: 32 }}>
        <BText>
          여행 제목을 입력해주세요
        </BText>
        <MText color={fcolor.gray3} fontSize={14}>
          (선택) 공란으로 할 경우, 장소가 여행 제목이 됩니다.
        </MText>
      </View>

      <View>
        <TextInput
          style={[styles.box, { fontSize: 13 }]}
          value={planMData.step1.title}
          onChangeText={text => handleChange('title', text)}
          placeholder={'0~16자'}
          maxLength={16}
          placeholderTextColor={fcolor.gray3}
        />

      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 34 }}>
        <TouchableOpacity
          style={[
            globalStyles.buttonBase,
            globalStyles.centered, { backgroundColor: fcolor.blue }
          ]}
          onPress={handleStepNext}>
          <MText color={fcolor.white}>다음</MText>
        </TouchableOpacity>
      </View>
    </Animated.View>

  )
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 45,
    backgroundColor: fcolor.gray1,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row'
  }
});

export default PlanStep1Screen;
