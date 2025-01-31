import React, {useCallback, useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import Mt_Icon from 'react-native-vector-icons/MaterialIcons';
import MonthPicker from 'react-native-month-year-picker';

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

function Calendar({setDayList}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback(value => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
      setCurrentMonth(newDate);
    },
    [date, showPicker],
  );

  const formatDate = date => date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식 변환

  const handleDayPress = (day, month, year) => {
    console.log(selectedDates);
    const selectedDate = new Date(year, month - 1, day);
    selectedDate.setHours(0, 0, 0, 0); // 시간 제거

    const formattedDate = formatDate(selectedDate); // "YYYY-MM-DD" 형식

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(formattedDate);
      setSelectedEnd(null);
      setSelectedDates([formattedDate]);
    } else {
      setSelectedEnd(formattedDate);
      let tempDates = [];
      let currentDate = new Date(selectedStart);
      currentDate.setHours(0, 0, 0, 0);

      while (currentDate <= selectedDate) {
        tempDates.push(formatDate(new Date(currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setSelectedDates(tempDates);
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
    setDayList(selectedDates); // 🔹 selectedDates가 변경될 때마다 setDayList 호출
  }, [selectedDates, setDayList]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BText color={fcolor.black} fontSize={16} style={styles.monthLabel}>
          {currentMonth.getFullYear()}년 {months[currentMonth.getMonth()]}월
        </BText>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Mt_Icon name="keyboard-arrow-down" size={20} color={fcolor.blue} />
        </TouchableOpacity>
        {show && (
          <MonthPicker
            onChange={onValueChange}
            value={currentMonth}
            locale="ko"
          />
        )}
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
                  onPress={() =>
                    handleDayPress(item.day, item.month, item.year)
                  }>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  calendar: {
    width: '100%',
    height: 220,
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
