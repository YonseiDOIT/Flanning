// @ts-nocheck
import {useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import BText from 'src/components/common/BText';
import globalStyles from 'src/assets/styles/globalStyles';
import fcolor from 'src/assets/colors/fcolors';
import MText from 'src/components/common/MText';

// 링크 추가 모달
export const LinkModal = ({
  isLinkModalVisible,
  setIsLinkModalVisible,
  setAddPlace,
}) => {
  const [link, setLink] = useState({
    title: '',
    url: '',
  });

  const handleChange = (text, type) => {
    setLink(prev => ({...prev, [type]: text}));
  };

  const handleSave = () => {
    if (!link.title.trim() || !link.url.trim()) {
      return; // 제목 또는 URL이 비어 있으면 저장하지 않음
    }
    setIsLinkModalVisible(false);
    setAddPlace(prev => ({
      ...prev,
      referenceLink: [...prev.referenceLink, link],
    }));
  };

  return (
    <Modal transparent visible={isLinkModalVisible} animationType="slide">
      {/* 배경 애니메이션 */}
      <View style={styles.modalContainer}>
        <View style={{flex: 1, gap: 30}}>
          <View>
            <BText>장소와 관련된</BText>
            <BText>링크를 추가해보세요</BText>
          </View>
          <View style={{flex: 1, gap: 20}}>
            {/* 링크 제목 */}
            <View style={{flexDirection: 'column', gap: 8}}>
              <BText fontSize={20}>링크 제목</BText>
              <TextInput
                style={[globalStyles.inputBase]}
                onChangeText={text => handleChange(text, 'title')}
                placeholder={'최대 4글자까지 가능해요'}
                placeholderTextColor={fcolor.gray3}
                maxLength={4}
                value={link.title}
              />
            </View>

            {/* 링크 추가 */}
            <View style={{flexDirection: 'column', gap: 8}}>
              <BText fontSize={20}>URL 주소</BText>
              <TextInput
                style={[globalStyles.inputBase]}
                onChangeText={text => handleChange(text, 'url')}
                placeholder={'주소를 추가해주세요'}
                placeholderTextColor={fcolor.gray3}
                value={link.url}
              />
            </View>
          </View>
        </View>

        {/* 버튼 */}
        <View
          style={{
            gap: 10,
          }}>
          <TouchableOpacity
            style={[
              globalStyles.buttonBase,
              {
                backgroundColor:
                  !link.title.trim() || !link.url.trim()
                    ? fcolor.gray2
                    : fcolor.blue,
              },
            ]}
            disabled={!link.title.trim() || !link.url.trim()}
            onPress={() => handleSave()}>
            <MText color={fcolor.white}>링크 추가</MText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.buttonBase, {backgroundColor: fcolor.gray4}]}
            onPress={() => {
              setIsLinkModalVisible(false);
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
    height: '60%',
    backgroundColor: fcolor.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
});

export default LinkModal;
