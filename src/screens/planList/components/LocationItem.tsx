// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BText from 'src/components/common/BText';
import fcolor from 'src/assets/colors/fcolors';
import RText from 'src/components/common/RText';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinkIcon from 'src/components/common/icons/LinkIcon';
import MText from 'src/components/common/MText';
import AirplaneIcon from 'src/components/common/icons/traffic/AirplaneIcon';
import BikeIcon from 'src/components/common/icons/traffic/BikeIcon';
import CarIcon from 'src/components/common/icons/traffic/CarIcon';
import WalkIcon from 'src/components/common/icons/traffic/WalkIcon';
import BusIcon from 'src/components/common/icons/traffic/BusIcon';
import SubwayIcon from 'src/components/common/icons/traffic/SubwayIcon';

import ArticleIcon from 'src/components/common/icons/memo/ArticleIcon';
import BagIcon from 'src/components/common/icons/memo/BagIcon';
import CalendarIcon from 'src/components/common/icons/memo/CalendarIcon';
import CameraIcon from 'src/components/common/icons/memo/CameraIcon';
import CardIcon from 'src/components/common/icons/memo/CardIcon';
import CheckBoxIcon from 'src/components/common/icons/memo/CheckBoxIcon';
import CartIcon from 'src/components/common/icons/memo/CartIcon';
import {usePlan} from 'src/context/PlanContext';
import {useRoute} from '@react-navigation/native';

const trafficIcons = {
  bus: <BusIcon width={24} height={24} fill={fcolor.gray3} />,
  subway: <SubwayIcon width={24} height={24} fill={fcolor.gray3} />,
  bike: <BikeIcon width={24} height={24} fill={fcolor.gray3} />,
  walk: <WalkIcon width={24} height={24} fill={fcolor.gray3} />,
  car: <CarIcon width={24} height={24} fill={fcolor.gray3} />,
  airplane: <AirplaneIcon width={24} height={24} fill={fcolor.gray3} />,
};

const memoIcons = {
  article: <ArticleIcon width={24} height={24} fill={fcolor.lblue5} />,
  bag: <BagIcon width={24} height={24} fill={fcolor.lblue5} />,
  calendar: <CalendarIcon width={24} height={24} fill={fcolor.lblue5} />,
  camera: <CameraIcon width={24} height={24} fill={fcolor.lblue5} />,
  card: <CardIcon width={24} height={24} fill={fcolor.lblue5} />,
  cart: <CartIcon width={24} height={24} fill={fcolor.lblue5} />,
  'check-box': <CheckBoxIcon width={24} height={24} fill={fcolor.lblue5} />,
};

const LocationItem = ({
  location,
  idx,
  selectedDate,
  lastLocationIdx,
  isActive,
  onPress,
  isExpanded,
  onToggle,
  planItemId,
}) => {
  const [isItemExpanded, setIsItemExpanded] = useState(isExpanded);
  const {updatePlanState} = usePlan();
  const route = useRoute();

  const [isStateModalVisible, setIsStateModalVisible] = useState(false);

  // 외부에서 전체 토글 상태 변경 시, 내부 상태 반영
  useEffect(() => {
    setIsItemExpanded(isExpanded);
  }, [isExpanded]);

  const handleToggle = () => {
    const newState = !isItemExpanded;
    setIsItemExpanded(newState);
    onToggle(newState); // 부모 컴포넌트(LocationList)에게 상태 전달
  };

  return (
    <View style={styles.locationItemContainer}>
      <View style={styles.locationItemHeaderContainer}>
        <TouchableOpacity
          onPress={onPress}
          style={styles.locationIndexContainer}>
          <View
            style={[
              styles.locationIndexCircle,
              {
                backgroundColor: isActive ? fcolor.blue : fcolor.lblue4,
              },
            ]}>
            <BText fontSize={14} color={fcolor.white}>
              {idx}
            </BText>
          </View>
          {location.time ? (
            <RText color={fcolor.gray4} fontSize={9} style={{}}>
              {location.time}
            </RText>
          ) : null}
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <View style={styles.locationHeaderContainer}>
            <View style={styles.locationTitleContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 4,
                }}>
                <BText fontSize={18}>{location?.locationIcon}</BText>
                <View style={{}}>
                  <BText fontSize={18}>{location.locationTitle}</BText>
                </View>
              </View>
              <View style={styles.locationTypeContainer}>
                <RText color={fcolor.lblue4}>{location.locationType}</RText>
              </View>
            </View>
            {location.state === 0 ? null : (
              <TouchableOpacity
                onPress={
                  route.name === 'PlanDetail'
                    ? () => setIsStateModalVisible(true)
                    : () => {}
                }
                style={[
                  styles.stateButton,
                  {
                    backgroundColor:
                      location.state === 1 ? fcolor.orange2 : fcolor.green2,
                    borderColor:
                      location.state === 1 ? fcolor.orange : fcolor.green3,
                  },
                ]}>
                <BText
                  fontSize={13}
                  color={location.state === 1 ? fcolor.orange : fcolor.green3}>
                  {location.state === 1 ? '예약 전' : '예약 완료'}
                </BText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={styles.locationItemContentContainer}>
        <View style={styles.locationLineContainer}>
          {lastLocationIdx !== idx ? (
            <>
              <View style={styles.locationLine} />
              <View style={styles.locationDistanceText}>
                <Text
                  style={{
                    fontSize: 7,
                    color: fcolor.lblue4,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="clip">
                  {location.distanceToNext}
                </Text>
              </View>
            </>
          ) : null}
        </View>
        <View style={{flexDirection: 'column', flex: 1, minHeight: 30}}>
          {location.referenceLink?.length > 0 && (
            <View style={{marginBottom: 8}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                {location.referenceLink.map((link, idx) => (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(link.url);
                    }}
                    key={`link-${idx}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: fcolor.lblue4,
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      borderRadius: 6,
                      gap: 4,
                    }}>
                    <LinkIcon width={18} height={18} fill={fcolor.white} />
                    <MText fontSize={14} color={fcolor.white}>
                      {link.title}
                    </MText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {location.memo?.length > 0 && (
            <View
              style={{
                marginBottom: 8,
                gap: 8,
                flexDirection: 'column',
              }}>
              {location.memo.map((memo, memoIdx) => (
                <View
                  key={`memo-${memoIdx}`}
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                  }}>
                  {memoIcons[memo.icon]}
                  <RText
                    fontSize={13}
                    color={fcolor.gray4}
                    style={{
                      flex: 1,
                      paddingTop: Platform.OS === 'ios' ? 5 : 2,
                    }}>
                    {memo.content}
                  </RText>
                </View>
              ))}
            </View>
          )}

          {location.movePath?.length > 0 && (
            <TouchableOpacity
              style={[
                styles.locationMovePathContainer,
                {gap: location.movePath.length > 1 ? 8 : 0},
              ]}
              onPress={() => location.movePath.length > 1 && handleToggle()}>
              {location.movePath.map((move, moveIdx) => {
                if (!isItemExpanded && moveIdx > 0) {
                  return null;
                }
                return (
                  <View
                    key={`move-${moveIdx}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: 5,
                    }}>
                    {trafficIcons[move.icon]}
                    <View
                      style={{
                        flex: 1,
                        paddingTop: Platform.OS === 'ios' ? 5 : 3,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <RText fontSize={13} color={fcolor.gray4}>
                        {move.description}
                      </RText>
                    </View>
                  </View>
                );
              })}
              {location.movePath.length > 1 && (
                <View style={{alignItems: 'center', marginTop: 6}}>
                  <AntDesignIcon
                    name={isItemExpanded ? 'caretup' : 'caretdown'}
                    size={10}
                    color={fcolor.gray2}
                  />
                </View>
              )}
            </TouchableOpacity>
          )}

          <Modal
            transparent={true}
            visible={isStateModalVisible}
            animationType="fade"
            onRequestClose={() => {
              setIsStateModalVisible(false);
            }}>
            <View
              style={[
                styles.modalContainer,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <View style={styles.modalContent}>
                <View
                  style={{
                    justifyContent: 'center',
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                  }}>
                  {location.state === 1 ? (
                    <BText fontSize={17}>예약 완료로 변경하시겠습니까?</BText>
                  ) : (
                    <BText fontSize={17}>예약 전으로 변경하시겠습니까?</BText>
                  )}
                </View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      const result = updatePlanState(
                        planItemId,
                        selectedDate,
                        idx,
                      );
                      if (result) {
                        setIsStateModalVisible(false);
                      }
                    }}>
                    <BText fontSize={17} color={fcolor.blue}>
                      변경
                    </BText>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 1,
                      height: '100%',
                      backgroundColor: fcolor.gray1,
                    }}
                  />
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setIsStateModalVisible(false)}>
                    <BText fontSize={17} color={fcolor.blue}>
                      취소
                    </BText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationItemContainer: {
    marginHorizontal: 20,
    flexDirection: 'column',
    marginBottom: 20,
    gap: 5,
  },
  locationItemHeaderContainer: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 8,
  },
  locationItemContentContainer: {
    flexDirection: 'row',
    gap: 14,
    marginLeft: 8,
  },
  locationIndexContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  locationLineContainer: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  locationLine: {
    backgroundColor: fcolor.lblue1,
    width: 1,
    flex: 1,
  },
  locationDistanceText: {
    position: 'absolute',
    backgroundColor: fcolor.white,
  },
  locationMovePathContainer: {
    backgroundColor: fcolor.gray5,
    borderColor: fcolor.gray1,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  stateButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 10,
  },
  locationIndexCircle: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  locationHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  locationTitleContainer: {
    // flex: 1,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  locationTypeContainer: {
    alignItems: 'center',
    backgroundColor: fcolor.lblue2,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '60%',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.3,
    borderColor: fcolor.gray2,
  },
});

export default LocationItem;
