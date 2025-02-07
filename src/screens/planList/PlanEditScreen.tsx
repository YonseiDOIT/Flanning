import {useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Platform, StyleSheet, View, LogBox} from 'react-native';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import NeonBl from 'src/components/neonbl';
import PlanDay from './components/PlanDay';
import globalStyles from 'src/assets/styles/globalStyles';
import FontASIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import RText from 'src/components/common/RText';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {useSharedValue} from 'react-native-reanimated';
import {usePlan} from 'src/context';
import {getDistance} from 'src/utils/distance';

// 일정 수정하는 페이지
const PlanEditScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {planItem, planData} = route.params;
  const {updatePlanData} = usePlan();
  LogBox.ignoreLogs(['[Reanimated]']);

  const [locationList, setLocationList] = useState([]);
  const locationListRef = useRef({});

  const [selectedDate, setSelectedDate] = useState(planItem?.dayList[0]);

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

  useEffect(() => {
    if (!locationListRef.current[selectedDate]) {
      locationListRef.current[selectedDate] = planData[selectedDate] || [];
    }
    setLocationList(locationListRef.current[selectedDate]);
  }, [planData, selectedDate]);

  const handleDeleteLocation = locationIndex => {
    console.log(locationIndex);
    const updatedList = locationList.filter(
      (item, index) => index !== locationIndex,
    );
    // console.log(updatedList);
    locationListRef.current[selectedDate] = updatedList;

    planItem.dayList.forEach(date => {
      const plan = locationListRef?.current[date] || [];
      plan.forEach((location, index) => {
        if (index > 0) {
          let distanceToNext = '';

          const distanceResult = getDistance(
            plan[index - 1]?.locationMap.latitude,
            plan[index - 1]?.locationMap.longitude,
            location.locationMap.latitude,
            location.locationMap.longitude,
          );

          if (distanceResult.distanceKm < 1) {
            distanceToNext = distanceResult.distanceM.toFixed(0) + 'm';
          } else if (distanceResult.distanceKm.toFixed(1) < 9.9) {
            distanceToNext = distanceResult.distanceKm.toFixed(1) + 'km';
          } else {
            distanceToNext = distanceResult.distanceKm.toFixed(0) + 'km';
          }

          plan[index - 1] = {
            ...plan[index - 1],
            distanceToNext: distanceToNext,
          };
        }
      });
    });

    const updateLocationList = async () => {
      await updatePlanData(planItem.id, locationListRef.current);
    };

    setLocationList([...updatedList]);

    updateLocationList();
  };

  const handleChangeLocationOrder = () => {
    planItem.dayList.forEach(date => {
      const plan = locationListRef?.current[date] || [];
      plan.forEach((location, index) => {
        if (index > 0) {
          let distanceToNext = '';

          const distanceResult = getDistance(
            plan[index - 1]?.locationMap.latitude,
            plan[index - 1]?.locationMap.longitude,
            location.locationMap.latitude,
            location.locationMap.longitude,
          );

          if (distanceResult.distanceKm < 1) {
            distanceToNext = distanceResult.distanceM.toFixed(0) + 'm';
          } else if (distanceResult.distanceKm.toFixed(1) < 9.9) {
            distanceToNext = distanceResult.distanceKm.toFixed(1) + 'km';
          } else {
            distanceToNext = distanceResult.distanceKm.toFixed(0) + 'km';
          }

          plan[index - 1] = {
            ...plan[index - 1],
            distanceToNext: distanceToNext,
          };
        }
      });
    });
    const updateLocationList = async () => {
      await updatePlanData(planItem.id, locationListRef.current);
    };

    updateLocationList();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={handleChangeLocationOrder}
              style={styles.backButton}>
              <FontASIcon name="angle-left" size={40} color={fcolor.gray4} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Animated.View
                style={[styles.animatedTitle, {top: titlePosition}]}>
                <Animated.Text
                  style={[styles.titleText, {fontSize: titleFontSize}]}>
                  {planItem?.title}
                </Animated.Text>
              </Animated.View>
              <Animated.View
                style={[styles.dayInfoContainer, {opacity: dayInfoOpacity}]}>
                <NeonBl>
                  <MText fontSize={14}>{`DAY ${
                    planItem?.dayList.indexOf(selectedDate) + 1
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
              <MaterialIcon name="more-vert" size={28} color={fcolor.white} />
            </TouchableOpacity>
          </View>
          <PlanDay
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dateList={planItem?.dayList}
            planDayOpacity={planDayOpacity}
            planDayHeight={planDayHeight}
            planDayMarginBottom={planDayMarginBottom}
          />
        </View>
      </View>

      <View style={{flex: 1}}>
        <DraggableFlatList
          style={{height: '100%'}}
          data={locationList ?? []}
          keyExtractor={(item, index) =>
            `draggable-item-${item.locationId}-${index}`
          }
          onDragEnd={({data}) => {
            locationListRef.current[selectedDate] = data;
            setLocationList([...data]);
          }}
          renderItem={({item, getIndex, drag, isActive, onDelete}) => (
            <LocationOrderItem
              item={item}
              drag={drag}
              isActive={isActive}
              index={getIndex() ?? 0}
              onDelete={handleDeleteLocation}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{height: 2, backgroundColor: fcolor.gray1}} />
          )}
        />
      </View>
    </View>
  );
};

const LocationOrderItem = ({item, drag, isActive, index, onDelete}) => {
  const swipeableRef = useRef(null);

  const handleDelete = () => {
    swipeableRef.current?.close();
    onDelete(index);
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <BText fontSize={12} color={fcolor.white}>
          삭제하기
        </BText>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={[
          styles.locationOrderContainer,
          isActive && globalStyles.shadowOrderItem,
        ]}
        onLongPress={drag}
        activeOpacity={0.8}>
        <View style={styles.locationContainer}>
          <View style={styles.locationOrderNumberContainer}>
            <BText fontSize={14} color={fcolor.white}>
              {index + 1}
            </BText>
          </View>
          <View style={styles.locationTitleContainer}>
            <BText fontSize={18} color={fcolor.black}>
              {item.locationTitle}
            </BText>
            <View style={styles.locationTypeContainer}>
              <RText color={fcolor.lblue4}>{item.locationType}</RText>
            </View>
          </View>
        </View>
        <TouchableOpacity onPressIn={drag}>
          <MaterialIcon name="menu" size={28} color={fcolor.gray3} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  deleteButton: {
    flex: 1,
    backgroundColor: fcolor.red,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  divider: {
    height: 2,
    backgroundColor: fcolor.gray1,
  },

  locationOrderContainer: {
    backgroundColor: fcolor.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    paddingHorizontal: 25,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationTitleContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationTypeContainer: {
    alignItems: 'center',
    backgroundColor: fcolor.lblue2,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  locationOrderNumberContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: fcolor.gray3,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 🔹 반투명한 배경
  },
  moreModal: {
    position: 'absolute',
    right: 25,
    top: Platform.OS === 'ios' ? 110 : 70,
    backgroundColor: fcolor.white,
    borderRadius: 10,
    ...globalStyles.shadowBase,
    zIndex: 20,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
});

export default PlanEditScreen;
