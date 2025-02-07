// @ts-nocheck
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import {
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
} from 'react-native';
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
import {usePlan} from 'src/context';
import {useUser} from 'src/context';
import {useAuth} from 'src/context';
import globalStyles from 'src/assets/styles/globalStyles';
import BText from 'src/components/common/BText';

// 일정 상세 페이지
const PlanDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {planItem, userCode} = route.params;

  const {fetchPlanDetailData, planDetailData, deletePlanData, planListData} =
    usePlan();
  const [selectedDate, setSelectedDate] = useState(planItem?.dayList[0]);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeletedModalVisible, setIsDeletedModalVisible] = useState(false);

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
    const loadPlanDetail = async () => {
      if (!planDetailData[planItem?.id]) {
        await fetchPlanDetailData(planItem?.id);
      }
    };

    loadPlanDetail();
  }, [planItem?.id, planDetailData]); // ✅ planItem.id 만 의존성으로 설정 (첫 실행)

  // useEffect(() => {
  //   if (planDetailData[planItem?.id]) {

  //   }
  // }, [planDetailData, planListData]);

  useEffect(() => {
    if (!planListData || !planItem?.id) {
      return;
    }
    // planListData가 배열이라고 가정하고, 해당 id가 존재하는지 확인
    const exists = planListData.some(plan => plan.id === planItem.id);
    if (!exists) {
      // plan이 존재하지 않으면 삭제된 것으로 판단하여 모달 띄움
      setIsDeletedModalVisible(true);
    }
    setLoading(false);
  }, [planListData, planItem?.id]);

  if (loading || !planDetailData[planItem?.id]) {
    return (
      <View style={styles.loadingContainer}>
        <MText fontSize={16} color={fcolor.gray4}>
          로딩 중...
        </MText>
      </View>
    );
  }

  const editPlan = () => {
    const planData = planDetailData[planItem?.id];
    navigation.navigate('PlanEdit', {planItem, planData});
    setIsMoreModalVisible(false);
  };

  const sharePlan = () => {
    console.log('여행 공유하기');
  };

  const handleDeletePlan = () => {
    const deletePlan = async () => {
      try {
        await deletePlanData(planItem.id);
        navigation.goBack();
      } catch (error) {
        console.error('여행 삭제 실패', error);
      }
    };

    deletePlan();
  };

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
            <TouchableOpacity onPress={() => setIsMoreModalVisible(true)}>
              <MaterialIcon name="more-vert" size={28} color={fcolor.gray4} />
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

      {/* 장소 목록 */}
      <LocationList
        selectedDate={selectedDate}
        planItemId={planItem.id}
        locationList={planDetailData[planItem?.id]}
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
        dateList={planItem?.dayList}
        planItem={planItem}
        onClose={() => setIsLocationModalVisible(false)}
        navigation={navigation}
      />

      {/* 햄버거 버튼 클릭시 떠야하는 모달 */}
      <Modal
        transparent={true}
        visible={isMoreModalVisible}
        animationType="fade"
        onRequestClose={() => setIsMoreModalVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsMoreModalVisible(false)}
        />
        <View style={styles.moreModal}>
          <TouchableOpacity onPress={editPlan} style={styles.modalItem}>
            <MText>일정 수정하기</MText>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={sharePlan} style={styles.modalItem}>
            <MText>여행 공유하기</MText>
          </TouchableOpacity>

          {userCode === planItem.creator && (
            <>
              <View style={styles.divider} />
              <TouchableOpacity
                onPress={handleDeletePlan}
                style={styles.modalItem}>
                <MText>여행 삭제하기</MText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isDeletedModalVisible}
        animationType="fade"
        onRequestClose={() => {
          setIsDeletedModalVisible(false);
          navigation.goBack();
        }}>
        <View
          style={[
            styles.deletedModalContainer,
            {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <View style={styles.deletedModalContent}>
            <BText
              fontSize={17}
              style={{fontWeight: 'bold', paddingVertical: 40}}>
              소유자가 일정을 삭제하였습니다.
            </BText>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setIsDeletedModalVisible(false);
                navigation.goBack();
              }}>
              <BText fontSize={17} color={fcolor.blue}>
                확인
              </BText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  divider: {
    height: 1,
    backgroundColor: fcolor.gray2,
  },

  deletedModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  deletedModalContent: {
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.3,
    borderColor: fcolor.gray2,
  },
});
