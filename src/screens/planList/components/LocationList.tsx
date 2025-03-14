// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {Platform, View, Animated, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BText from 'src/components/common/BText';
import fcolor from 'src/assets/colors/fcolors';
import MText from 'src/components/common/MText';
import SwitchToggle from 'react-native-switch-toggle';
import MapView, {Marker} from 'react-native-maps';
import CustomMarker from 'src/components/common/CustomMarker';
import LocationItem from './LocationItem';

const LocationList = ({selectedDate, locationList, onScroll, planItemId}) => {
  const currentLocationList = locationList[selectedDate] || [];
  const lastLocationIdx = currentLocationList.length;
  const [isToggleAllEnabled, setIsToggleAllEnabled] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    if (currentLocationList.length > 0) {
      setActiveIdx(0);
    }
  }, [selectedDate, currentLocationList]);

  useEffect(() => {
    if (mapRef.current) {
      if (currentLocationList.length === 0) {
        // ✅ 장소가 없으면 전체 지도 범위 설정
        mapRef.current.animateToRegion(
          {
            latitude: 37.5665, // 서울 기준 (또는 중심 좌표)
            longitude: 126.978,
            latitudeDelta: 10, // 더 넓은 범위로 설정
            longitudeDelta: 10,
          },
          500,
        );
      } else if (currentLocationList.length > 0 && activeIdx !== null) {
        // ✅ 특정 장소가 있을 때는 해당 장소로 이동
        const {latitude, longitude} =
          currentLocationList[activeIdx].locationMap;
        mapRef.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          },
          500,
        );
      }
    }
  }, [activeIdx, currentLocationList]);

  // ✅ 전체 토글 변경 핸들러
  const handleToggleAll = () => {
    const newToggleState = !isToggleAllEnabled;
    setIsToggleAllEnabled(newToggleState);

    // 모든 LocationItem의 토글 상태 변경
    const updatedExpandedItems = {};
    currentLocationList.forEach((_, idx) => {
      updatedExpandedItems[idx] = newToggleState;
    });
    setExpandedItems(updatedExpandedItems);
  };

  // ✅ 개별 토글 변경 시 전체 토글 상태 업데이트
  const handleItemToggle = (idx, state) => {
    const updatedExpandedItems = {...expandedItems, [idx]: state};
    setExpandedItems(updatedExpandedItems);

    // 전체 항목이 모두 열려있는지 확인 후 전체 토글 상태 변경
    const allExpanded = Object.values(updatedExpandedItems).every(
      v => v === true,
    );
    setIsToggleAllEnabled(allExpanded);
  };

  return (
    <View style={styles.container}>
      {/* 지도 영역 */}
      <Animated.View style={styles.mapContainer}>
        {currentLocationList.length > 0 ? (
          <MapView ref={mapRef} style={styles.map}>
            {currentLocationList.map((location, idx) => (
              <Marker
                key={`marker-${idx}`}
                // 마커가 겹쳐졌을 때 활성화 된 마커 우선으로 앞에 표시
                style={{
                  zIndex: activeIdx === idx ? 2 : 1,
                }}
                coordinate={location.locationMap}
                onPress={() => setActiveIdx(idx)}>
                <View style={styles.markerNumber}>
                  <BText fontSize={12} color={fcolor.white}>
                    {idx + 1}
                  </BText>
                </View>
                <CustomMarker
                  width={32}
                  height={32} // 높이를 더 크게 설정하여 잘리지 않도록 함
                  fill={activeIdx === idx ? fcolor.blue : fcolor.lblue4}
                />
              </Marker>
            ))}
          </MapView>
        ) : (
          <View style={styles.mapPlaceholder}>
            <BText fontSize={18} color={fcolor.white}>
              장소를 추가하면 지도가 생성됩니다
            </BText>
          </View>
        )}
      </Animated.View>

      {/* 토글 버튼 */}
      <View style={styles.toggleContainer}>
        <MText color={fcolor.gray4}>전체 토글 활성화</MText>
        <SwitchToggle
          switchOn={isToggleAllEnabled}
          onPress={handleToggleAll}
          circleColorOff={fcolor.white}
          backgroundColorOn={fcolor.lblue4}
          backgroundColorOff={fcolor.gray2}
          containerStyle={styles.switchContainer}
          circleStyle={styles.switchCircle}
        />
      </View>

      {/* 장소 리스트 */}
      {currentLocationList.length > 0 ? (
        <ScrollView
          style={styles.scrollView}
          onScroll={onScroll}
          scrollEventThrottle={16}>
          <View style={styles.listSpacing} />
          {currentLocationList.map((location, idx) => (
            <LocationItem
              key={`location-${idx}`}
              lastLocationIdx={lastLocationIdx}
              planItemId={planItemId}
              isExpanded={expandedItems[idx]}
              selectedDate={selectedDate}
              location={location}
              idx={idx + 1}
              isActive={activeIdx === idx}
              onPress={() => setActiveIdx(idx)}
              onToggle={handleItemToggle}
            />
          ))}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      ) : (
        <View style={styles.emptyListContainer}>
          <MText color={fcolor.gray4}>아직 추가한 장소가 없어요</MText>
          <MText color={fcolor.gray4}>
            장소를 추가하여 일정을 계획해보세요!
          </MText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fcolor.white,
  },
  mapContainer: {
    height: 240,
    width: '100%',
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: fcolor.black,
  },
  markerNumber: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 4 : 3,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    transform: [{translateY: Platform.OS === 'ios' ? -16 : 0}],
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    gap: 16,
    marginVertical: 10,
  },
  switchContainer: {
    width: 52,
    height: 30,
    borderRadius: 24,
    padding: 4,
  },
  switchCircle: {
    width: 24,
    height: 24,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  listSpacing: {
    height: 20,
  },
  bottomSpacing: {
    height: 240,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginTop: -50,
  },
});

export default LocationList;
