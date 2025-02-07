// @ts-nocheck
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';
import MText from 'src/components/common/MText';
import NeonBl from 'src/components/neonbl';
import {Animated} from 'react-native';

const PlanDay = ({
  selectedDate,
  setSelectedDate,
  dateList,
  planDayOpacity,
  planDayHeight,
  planDayMarginBottom,
}) => {
  return (
    <Animated.View
      style={{
        flexDirection: 'column',
        marginBottom: planDayMarginBottom,
        marginHorizontal: 10,
        gap: 14,
        opacity: planDayOpacity,
        height: 'auto',
        maxHeight: planDayHeight,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <NeonBl>
          <MText fontSize={16}>{`DAY ${
            dateList.indexOf(selectedDate) + 1
          }`}</MText>
        </NeonBl>
        <MText color={fcolor.gray4}>{`${selectedDate} (${new Date(
          selectedDate,
        ).toLocaleDateString('ko-KR', {
          weekday: 'short',
        })})`}</MText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexDirection: 'row',
        }}>
        {dateList.map((date, idx) => {
          const isActive = date === selectedDate;
          const month = date.split('-')[1];
          const day = date.split('-')[2];

          return (
            <TouchableOpacity
              key={`date-${idx}`}
              onPress={() => setSelectedDate(date)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: isActive ? fcolor.blue : fcolor.gray1,
                borderRadius: 100,
                marginRight: 8,
              }}>
              <MText
                fontSize={14}
                color={isActive ? fcolor.white : fcolor.gray4}>
                {`${month}.${day}`}
              </MText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default PlanDay;
