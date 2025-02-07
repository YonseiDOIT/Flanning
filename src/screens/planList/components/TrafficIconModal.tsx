// @ts-nocheck
import {StyleSheet, View, Modal, Animated} from 'react-native';
import BText from 'src/components/common/BText';
import fcolor from 'src/assets/colors/fcolors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AirplaneIcon from 'src/components/common/icons/traffic/AirplaneIcon';
import BusIcon from 'src/components/common/icons/traffic/BusIcon';
import WalkIcon from 'src/components/common/icons/traffic/WalkIcon';
import SubwayIcon from 'src/components/common/icons/traffic/SubwayIcon';
import CarIcon from 'src/components/common/icons/traffic/CarIcon';
import BikeIcon from 'src/components/common/icons/traffic/BikeIcon';
import globalStyles from 'src/assets/styles/globalStyles';
import MText from 'src/components/common/MText';

export const TrafficIconList = (size = 32, fillColor = fcolor.gray4) => [
  {
    name: 'airplane',
    icon: <AirplaneIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'bus',
    icon: <BusIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'bike',
    icon: <BikeIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'car',
    icon: <CarIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'subway',
    icon: <SubwayIcon width={size} height={size} fill={fillColor} />,
  },
  {
    name: 'walk',
    icon: <WalkIcon width={size} height={size} fill={fillColor} />,
  },
];

export const TrafficIconModal = ({
  isTrafficIconModalVisible,
  setIsTrafficIconModalVisible,
  setAddPlace,
  index,
}) => {
  const handleIconChange = icon => {
    setAddPlace(prev => {
      const updatedTraffic = [...prev.movePath];

      if (!updatedTraffic[index]) {
        updatedTraffic[index] = {icon: icon.name, description: ''};
      } else {
        updatedTraffic[index] = {...updatedTraffic[index], icon: icon.name}; // 기존 icon 유지
      }
      return {...prev, movePath: updatedTraffic};
    });

    setIsTrafficIconModalVisible(false);
  };

  return (
    <Modal
      transparent
      visible={isTrafficIconModalVisible}
      animationType="slide">
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
          {TrafficIconList(32, fcolor.gray4).map(icon => (
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
              setIsTrafficIconModalVisible(false);
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

export default TrafficIconModal;
