import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import {usePlanM} from './PlanMakeProvider';
import Calendar from './components/Calendar';
import MonthPicker from 'react-native-month-year-picker';

// 일정 상세 페이지
const PlanStep3Screen = () => {
  const {planMData, handleStepNext, setPlanMData} = usePlanM();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  let planMContext = usePlanM();

  const showPicker = useCallback(value => setShow(value), []);

  // const [dayList, setDayList] = useState([]);

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
      step3: {
        ...prevData.step3,
        ['dayList']: value,
      },
    }));
  };

  const onValueChange = useCallback(
    (event, newDate) => {
      if (!newDate) {
        showPicker(false); // ✅ MonthPicker 닫기만 수행 (취소된 경우)
        return;
      }

      setDate(newDate);
      setCurrentMonth(newDate); // ✅ MonthPicker에서 선택한 월로 이동
      showPicker(false);
    },
    [date],
  );

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
      }}>
      <View style={{flex: 1, paddingBottom: 30}}>
        <View style={{marginTop: 0, gap: 9}}>
          <View style={{flexDirection: 'row', gap: 4, paddingHorizontal: 30}}>
            <BText>여행 일자를 선택해주세요</BText>
            <MText color={fcolor.orange}>*</MText>
          </View>
        </View>

        <Calendar
          handleChange={handleChange}
          planMData={planMData}
          setCurrentMonth={setCurrentMonth}
          currentMonth={currentMonth}
          setShow={setShow}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 30,
            justifyContent: 'flex-end',
            marginBottom: 34,
          }}>
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
                planMData.step3.dayList.length > 0
                  ? {backgroundColor: fcolor.blue}
                  : {backgroundColor: fcolor.gray4},
              ]}
              disabled={planMData.step3.dayList.length <= 0}
              onPress={() => handleStepNext()}>
              <MText color={fcolor.white}>다음</MText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={currentMonth}
          locale="ko"
          style={{width: '100%', position: 'absolute', bottom: 0}}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: 60,
    marginBottom: 40,
    borderColor: fcolor.gray1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
    gap: 14,
    backgroundColor: fcolor.gray1,
  },
  line: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    borderColor: fcolor.gray3,
    borderWidth: 1,
    borderRadius: 50,
    height: 24,
    width: 24,
    backgroundColor: fcolor.white,
  },
  check: {
    backgroundColor: fcolor.blue,
    borderColor: fcolor.gray3,
  },
});

export default PlanStep3Screen;
