// @ts-nocheck
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Platform, TouchableOpacity, View, StyleSheet} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import FontASIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MText from 'src/components/common/MText';
import NeonBl from 'src/components/neonbl';
import {Animated} from 'react-native';
import PlanDay from './components/PlanDay';
import LocationList from './components/LocationList';
import PlusButton from 'src/components/common/PlusButton';
import LocationAddModal from './components/LocationAddModal';

// 일정 상세 페이지
const PlanDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {planItem} = route.params;
  const [selectedDate, setSelectedDate] = useState(
    Object.keys(planItem.planList)[0] || null,
  );
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const planDayHeight = scrollY.interpolate({
    inputRange: [120, 170],
    outputRange: [Platform.OS === 'ios' ? 70 : 76, 0],
    extrapolate: 'clamp',
  });

  const planDayOpacity = scrollY.interpolate({
    inputRange: [120, 170],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const titlePosition = scrollY.interpolate({
    inputRange: [120, 170],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });

  const titleFontSize = scrollY.interpolate({
    inputRange: [120, 170],
    outputRange: [20, 16],
    extrapolate: 'clamp',
  });

  const dayInfoOpacity = scrollY.interpolate({
    inputRange: [120, 170],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const planDayMarginBottom = scrollY.interpolate({
    inputRange: [120, 170],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });

  const dateKeys = Object.keys(planItem.planList);
  console.log('planItem', dateKeys);

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <FontASIcon name="angle-left" size={40} color={fcolor.gray4} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Animated.View
                style={[styles.animatedTitle, {top: titlePosition}]}>
                <Animated.Text
                  style={[styles.titleText, {fontSize: titleFontSize}]}>
                  {planItem.title}
                </Animated.Text>
              </Animated.View>
              <Animated.View
                style={[styles.dayInfoContainer, {opacity: dayInfoOpacity}]}>
                <NeonBl>
                  <MText fontSize={14}>{`DAY ${
                    dateKeys.indexOf(selectedDate) + 1
                  }`}</MText>
                </NeonBl>
                <MText fontSize={14} color={fcolor.gray4}>
                  {`${selectedDate} (${new Date(
                    selectedDate,
                  ).toLocaleDateString('ko-KR', {weekday: 'short'})})`}
                </MText>
              </Animated.View>
            </View>
            <TouchableOpacity>
              <MaterialIcon name="more-vert" size={28} color={fcolor.gray4} />
            </TouchableOpacity>
          </View>
          <PlanDay
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            locationList={planItem.planList}
            planDayOpacity={planDayOpacity}
            planDayHeight={planDayHeight}
            planDayMarginBottom={planDayMarginBottom}
          />
        </View>
      </View>

      {/* 장소 목록 */}
      <LocationList
        selectedDate={selectedDate}
        locationList={planItem.planList}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
      />

      {/* 장소 추가 버튼 */}
      <PlusButton onPress={() => setIsLocationModalVisible(true)} />

      {/* 장소 추가 모달 */}
      <LocationAddModal
        isVisible={isLocationModalVisible}
        dateList={dateKeys}
        onClose={() => setIsLocationModalVisible(false)}
        navigation={navigation}
      />
    </View>
  );
};

export default PlanDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderColor: fcolor.gray1,
  },
  headerContent: {
    marginHorizontal: 20,
  },
  headerTop: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 4,
  },
  animatedTitle: {
    position: 'relative',
  },
  titleText: {
    fontFamily: 'Pretendard-Medium',
    color: fcolor.black,
  },
  dayInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
