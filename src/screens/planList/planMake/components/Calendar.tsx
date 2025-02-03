// @ts-nocheck
import React, {useCallback, useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import Mt_Icon from 'react-native-vector-icons/MaterialIcons';
import MonthPicker from 'react-native-month-year-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

function Calendar({handleChange, planMData}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const showPicker = useCallback(value => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      if (!newDate) {
        showPicker(false); // ✅ MonthPicker 닫기만 수행 (취소된 경우)
        return;
      }

      showPicker(false);
      setDate(newDate);
      setCurrentMonth(newDate); // ✅ MonthPicker에서 선택한 월로 이동
    },
    [showPicker],
  );

  const formatDate = date => date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식 변환

  const handleDayPress = (day, month, year) => {
    if (!day) {
      return;
    }

    // 선택한 날짜로 new Date() 객체 생성
    const selectedDate = new Date(year, month - 1, day);
    selectedDate.setHours(12, 0, 0, 0); // 시간 제거

    const formattedDate = formatDate(selectedDate); // "YYYY-MM-DD" 형식

    // 선택한 날짜 기준으로 캘린더 업데이트
    setCurrentMonth(new Date(year, month - 1, 1)); // ✅ 선택한 날짜의 월로 이동

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(formattedDate);
      setSelectedEnd(null);
      setSelectedDates([formattedDate]);
    } else {
      setSelectedEnd(formattedDate);
      let tempDates = [];
      let currentDate = new Date(selectedStart);
      currentDate.setHours(12, 0, 0, 0);

      while (currentDate <= selectedDate) {
        tempDates.push(formatDate(new Date(currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setSelectedDates(tempDates);
      handleChange(tempDates);
    }
  };

  const generateMatrix = () => {
    let matrix = [];
    matrix[0] = days;
    let year = currentMonth.getFullYear();
    let month = currentMonth.getMonth();
    let firstDay = new Date(year, month, 1).getDay();
    let maxDays = new Date(year, month + 1, 0).getDate();

    let counter = 1 - firstDay;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        let day = counter;
        let isCurrentMonth = day > 0 && day <= maxDays;
        let displayMonth = isCurrentMonth
          ? month + 1
          : day <= 0
          ? month
          : month + 2;
        matrix[row][col] = {
          day: day > 0 && day <= maxDays ? day : null,
          month: displayMonth,
          year,
        };
        counter++;
      }
    }
    return matrix;
  };

  useEffect(() => {
    if (planMData.step3.dayList.length > 0) {
      setCurrentMonth(new Date(planMData.step3.dayList[0]));
      setSelectedStart(planMData.step3.dayList[0]);
      setSelectedEnd(
        planMData.step3.dayList[planMData.step3.dayList.length - 1],
      );
      setSelectedDates(planMData.step3.dayList);
    }
  }, [planMData.step3.dayList]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <BText color={fcolor.black} fontSize={16} style={styles.monthLabel}>
            {currentMonth.getFullYear()}년 {months[currentMonth.getMonth()]}월
          </BText>
          <Mt_Icon name="keyboard-arrow-down" size={20} color={fcolor.blue} />
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>
        <View style={{flexDirection: 'row'}}>
          {days.map((day, index) => (
            <View style={styles.cell} key={index}>
              <BText fontSize={11} style={{opacity: 0.3}}>
                {day}
              </BText>
            </View>
          ))}
        </View>
        {generateMatrix()
          .slice(1)
          .map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              {row.map((item, colIndex) => (
                <TouchableOpacity
                  style={styles.cell}
                  key={colIndex}
                  onPress={() => {
                    handleDayPress(item.day, item.month, item.year);
                  }}>
                  <View
                    style={
                      selectedDates.includes(
                        `${item.year}-${String(item.month).padStart(
                          2,
                          '0',
                        )}-${String(item.day).padStart(2, '0')}`,
                      )
                        ? styles.rangeDay
                        : null
                    }>
                    <View
                      style={
                        selectedStart ===
                          `${item.year}-${String(item.month).padStart(
                            2,
                            '0',
                          )}-${String(item.day).padStart(2, '0')}` ||
                        selectedEnd ===
                          `${item.year}-${String(item.month).padStart(
                            2,
                            '0',
                          )}-${String(item.day).padStart(2, '0')}`
                          ? styles.selectedDay
                          : null
                      }>
                      <MText
                        fontSize={17}
                        color={
                          selectedStart ===
                            `${item.year}-${String(item.month).padStart(
                              2,
                              '0',
                            )}-${String(item.day).padStart(2, '0')}` ||
                          selectedEnd ===
                            `${item.year}-${String(item.month).padStart(
                              2,
                              '0',
                            )}-${String(item.day).padStart(2, '0')}`
                            ? fcolor.white
                            : fcolor.black
                        }>
                        {item.day}
                      </MText>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
      </View>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={currentMonth}
          locale="ko"
          style={{width: '100%', position: 'absolute', bottom: 0}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  calendar: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  monthLabel: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  cell: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    width: 40,
    height: 40,
    backgroundColor: fcolor.blue,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rangeDay: {
    backgroundColor: fcolor.lblue3,
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Calendar;
