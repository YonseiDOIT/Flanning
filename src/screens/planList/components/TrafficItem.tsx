// @ts-nocheck
import {useState} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';
import DefaultIcon from 'src/components/common/DefaultIcon';
import {TrafficIconList} from './TrafficIconModal';
import TrashIcon from 'src/components/common/icons/TrashIcon';
import BText from 'src/components/common/BText';
// 교통정보 컴포넌트
const TrafficItem = ({
  movePath,
  setAddPlace,
  addPlace,
  index,
  setIsTrafficIconModalVisible,
  setSelectedTrafficIconIndex,
  deleteTrafficModeIndex,
  setDeleteTrafficModeIndex,
}) => {
  const handleTextChange = text => {
    setAddPlace(prev => {
      const updatedTraffic = [...prev.movePath];

      if (!updatedTraffic[index]) {
        updatedTraffic[index] = {icon: '', description: text};
      } else {
        updatedTraffic[index] = {...updatedTraffic[index], description: text}; // 기존 icon 유지
      }

      return {...prev, movePath: updatedTraffic};
    });
  };

  const handleDeleteTraffic = index => {
    setAddPlace(prev => ({
      ...prev,
      movePath: prev.movePath.filter((_, idx) => idx !== index),
    }));
    setDeleteTrafficModeIndex(null);
  };

  return (
    <View style={{flexDirection: 'row', gap: 8, alignItems: 'flex-start'}}>
      <TouchableOpacity
        onPress={() => {
          if (
            deleteTrafficModeIndex === index &&
            addPlace.movePath.length > 0
          ) {
            handleDeleteTraffic(index);
          } else {
            setIsTrafficIconModalVisible(true);
            setSelectedTrafficIconIndex(index);
          }
        }}
        onLongPress={() => {
          if (deleteTrafficModeIndex === index) {
            setDeleteTrafficModeIndex(null);
          } else if (
            addPlace.movePath.length > 0 &&
            movePath.description !== '' &&
            movePath.icon !== ''
          ) {
            setDeleteTrafficModeIndex(index);
          }
        }}
        style={{
          flexDirection: 'row',
          gap: 4,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          backgroundColor:
            deleteTrafficModeIndex === index
              ? fcolor.gray4
              : movePath.icon === ''
              ? fcolor.gray1
              : fcolor.blue,
        }}>
        {movePath.icon === '' ? (
          <DefaultIcon width={26} height={26} fill={fcolor.gray3} />
        ) : (
          TrafficIconList(26, fcolor.white).find(
            icon => icon.name === movePath.icon,
          )?.icon
        )}
      </TouchableOpacity>

      <TouchableWithoutFeedback
        onPress={() => {
          if (
            deleteTrafficModeIndex === index &&
            addPlace.movePath.length > 0
          ) {
            handleDeleteTraffic(index);
          }
        }}
        onLongPress={() => {
          if (deleteTrafficModeIndex === index) {
            setDeleteTrafficModeIndex(null);
          } else if (
            addPlace.movePath.length > 0 &&
            movePath.description !== '' &&
            movePath.icon !== ''
          ) {
            setDeleteTrafficModeIndex(index);
          }
        }}>
        <View
          style={{
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 10,
            backgroundColor:
              deleteTrafficModeIndex === index
                ? fcolor.gray4
                : movePath.description === ''
                ? fcolor.gray1
                : fcolor.blue,
            borderRadius: 8,
            minHeight: 40,
          }}>
          {deleteTrafficModeIndex === index ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}>
              <TrashIcon width={20} height={20} fill={fcolor.white} />
              <BText fontSize={14} color={fcolor.white}>
                삭제하기
              </BText>
            </View>
          ) : (
            <TextInput
              style={{
                paddingHorizontal: 0,
                paddingVertical: 0,
                fontSize: 14,
                backgroundColor: 'transparent',
                textAlignVertical: 'center',
                color: fcolor.white,
                fontFamily: 'Pretendard-Medium',
              }}
              multiline={true}
              placeholder="이 장소의 교통정보를 작성해주세요."
              placeholderTextColor={fcolor.gray3}
              value={movePath.description}
              onChangeText={handleTextChange}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TrafficItem;
