// @ts-nocheck
import {StyleSheet, View, Modal, Animated} from 'react-native';
import BText from 'src/components/common/BText';
import fcolor from 'src/assets/colors/fcolors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ArticleIcon from 'src/components/common/icons/memo/ArticleIcon';
import BagIcon from 'src/components/common/icons/memo/BagIcon';
import CalendarIcon from 'src/components/common/icons/memo/CalendarIcon';
import CameraIcon from 'src/components/common/icons/memo/CameraIcon';
import CardIcon from 'src/components/common/icons/memo/CardIcon';
import CartIcon from 'src/components/common/icons/memo/CartIcon';
import CheckBoxIcon from 'src/components/common/icons/memo/CheckBoxIcon';
import globalStyles from 'src/assets/styles/globalStyles';
import MText from 'src/components/common/MText';

export const MemoIconList = (size = 32, fillColor = fcolor.gray4) => [
  {
    name: 'article',
    icon: <ArticleIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'bag',
    icon: <BagIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'calendar',
    icon: <CalendarIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'camera',
    icon: <CameraIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'card',
    icon: <CardIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'cart',
    icon: <CartIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'check-box',
    icon: <CheckBoxIcon width={size} height={size} fill={fillColor} />,
  },
];

export const MemoIconModal = ({
  isMemoIconModalVisible,
  setIsMemoIconModalVisible,
  setAddPlace,
  index,
}) => {
  const handleIconChange = icon => {
    setAddPlace(prev => {
      const updatedMemo = [...prev.memo];

      if (!updatedMemo[index]) {
        updatedMemo[index] = {icon: icon.name, content: ''};
      } else {
        updatedMemo[index] = {...updatedMemo[index], icon: icon.name}; // 기존 icon 유지
      }
      return {...prev, memo: updatedMemo};
    });

    setIsMemoIconModalVisible(false);
  };

  return (
    <Modal transparent visible={isMemoIconModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={{alignItems: 'center'}}>
          <BText fontSize={16}>아이콘 선택</BText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'flex-start',
            flex: 1,
            flexWrap: 'wrap',
          }}>
          {MemoIconList(32, fcolor.gray4).map(icon => (
            <TouchableOpacity
              onPress={() => handleIconChange(icon)}
              key={`memo-${icon.name}`}>
              {icon.icon}
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <TouchableOpacity
            style={[globalStyles.buttonBase, {backgroundColor: fcolor.gray4}]}
            onPress={() => {
              setIsMemoIconModalVisible(false);
            }}>
            <MText color={fcolor.white}>닫기</MText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '40%',
    backgroundColor: fcolor.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    paddingVertical: 40,
    paddingTop: 20,
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default MemoIconModal;
