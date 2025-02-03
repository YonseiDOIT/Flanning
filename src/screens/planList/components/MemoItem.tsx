// @ts-nocheck
import {useState} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import globalStyles from 'src/assets/styles/globalStyles';
import fcolor from 'src/assets/colors/fcolors';
import MText from 'src/components/common/MText';
import DefaultIcon from 'src/components/common/DefaultIcon';
import {MemoIconList} from './MemoIconModal';
import BText from 'src/components/common/BText';
import TrashIcon from 'src/components/common/icons/TrashIcon';

// 메모 컴포넌트
const MemoItem = ({
  memo,
  setAddPlace,
  addPlace,
  index,
  setIsMemoIconModalVisible,
  setSelectedMemoIconIndex,
  deleteMemoModeIndex,
  setDeleteMemoModeIndex,
}) => {
  const handleTextChange = text => {
    setAddPlace(prev => {
      const updatedMemo = [...prev.memo];

      if (!updatedMemo[index]) {
        updatedMemo[index] = {icon: '', content: text};
      } else {
        updatedMemo[index] = {...updatedMemo[index], content: text}; // 기존 icon 유지
      }
      return {...prev, memo: updatedMemo};
    });
  };

  const handleDeleteMemo = index => {
    setAddPlace(prev => ({
      ...prev,
      memo: prev.memo.filter((_, idx) => idx !== index),
    }));
    setDeleteMemoModeIndex(null);
  };

  return (
    <View style={{flexDirection: 'row', gap: 8, alignItems: 'flex-start'}}>
      <TouchableOpacity
        onPress={() => {
          if (deleteMemoModeIndex === index && addPlace.memo.length > 0) {
            handleDeleteMemo(index);
          } else {
            setIsMemoIconModalVisible(true);
            setSelectedMemoIconIndex(index);
          }
        }}
        onLongPress={() => {
          if (deleteMemoModeIndex === index) {
            setDeleteMemoModeIndex(null);
          } else if (
            addPlace.memo.length > 0 &&
            memo.content !== '' &&
            memo.icon !== ''
          ) {
            setDeleteMemoModeIndex(index);
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
            deleteMemoModeIndex === index
              ? fcolor.gray4
              : memo.icon === ''
              ? fcolor.gray1
              : fcolor.blue,
        }}>
        {memo.icon === '' ? (
          <DefaultIcon width={26} height={26} fill={fcolor.gray3} />
        ) : (
          MemoIconList(26, fcolor.white).find(icon => icon.name === memo.icon)
            ?.icon
        )}
      </TouchableOpacity>

      <TouchableWithoutFeedback
        onPress={() => {
          if (deleteMemoModeIndex === index && addPlace.memo.length > 0) {
            handleDeleteMemo(index);
          }
        }}
        onLongPress={() => {
          if (deleteMemoModeIndex === index) {
            setDeleteMemoModeIndex(null);
          } else if (
            addPlace.memo.length > 0 &&
            memo.content !== '' &&
            memo.icon !== ''
          ) {
            setDeleteMemoModeIndex(index);
          }
        }}>
        <View
          style={{
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 10,
            backgroundColor:
              deleteMemoModeIndex === index
                ? fcolor.gray4
                : memo.content === ''
                ? fcolor.gray1
                : fcolor.blue,
            borderRadius: 8,
            minHeight: 40,
          }}>
          {deleteMemoModeIndex === index ? (
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
              placeholder="메모를 작성해주세요."
              placeholderTextColor={fcolor.gray3}
              value={memo.content}
              onChangeText={handleTextChange}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MemoItem;
