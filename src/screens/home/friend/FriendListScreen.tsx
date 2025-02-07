// @ts-nocheck
// @eslint-disable

import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import BText from 'src/components/common/BText';
import RText from 'src/components/common/RText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from 'src/assets/styles/globalStyles';
import FontASIcon from 'react-native-vector-icons/FontAwesome';
import {useCallback, useEffect, useState} from 'react';
import {deleteFriend, getFriend} from 'src/components/common/getFriend';
import {useAuth, useUser} from 'src/context';
import {useFocusEffect} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import MText from 'src/components/common/MText';
import {getUsercode} from 'src/components/common/getUserdata';

// 일정 상세 페이지
const FriendListScreen = ({navigation}) => {
  //유저코드 가져오기
  const [friendList, setFriendList] = useState('');

  const [userCode, setUserCode] = useState('');
  const {userData} = useUser();
  const {authData} = useAuth();

  useEffect(() => {
    const getUserCode = async () => {
      if (authData) {
        const userCodeResult = await getUsercode(authData.email);
        setUserCode(userCodeResult);
      }
    };
    getUserCode();
  }, [userData]);

  // 오른쪽 스와이프 시 동작할 요소
  const renderRightActions = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.rightAction}
        onPress={() => {
          [deleteFriend(item.code, userCode), getList()];
        }}>
        <MText fontSize={15} color={fcolor.white}>
          삭제하기
        </MText>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{backgroundColor: fcolor.white, marginVertical: 2}}>
        <Swipeable renderRightActions={() => renderRightActions({item})}>
          <View style={styles.friendBox}>
            <View style={{flexDirection: 'row', paddingHorizontal: 25}}>
              <Image
                source={{uri: item.userImage}}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 200,
                  marginRight: 25,
                }}
              />
              <View>
                <View style={{flexDirection: 'row'}}>
                  <BText fontSize={15} style={{marginBottom: 10}}>
                    {item.nickname}
                  </BText>
                  <MText
                    fontSize={13}
                    color={fcolor.gray3}
                    style={{marginLeft: 8}}>
                    {item.travelType}
                  </MText>
                </View>
                <RText fontSize={13} color={fcolor.gray3}>
                  {item.introduction}
                </RText>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
    );
  };

  const getList = async () => {
    try {
      const data = await getFriend(userCode);
      if (data) {
        setFriendList(data);
      } else {
        setFriendList([]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getList();
    }, [userCode, userData]),
  );

  return (
    <View style={globalStyles.backBase}>
      <View
        style={[
          {
            padding: 30,
            paddingTop: Platform.OS === 'ios' ? 30 : 0,
            paddingHorizontal: 25,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 40,
            paddingBottom: 24,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontASIcon name="angle-left" size={40} color={fcolor.gray4} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FriendAdd')}>
            <Icon name="group-add" size={25} color={fcolor.gray4} />
          </TouchableOpacity>
        </View>
        <RText fontSize={20} style={{fontWeight: 'bold'}}>
          친구 목록
        </RText>
      </View>
      <View style={{height: 3, backgroundColor: fcolor.gray1}} />
      <View style={{flex: 1}}>
        <FlatList
          data={friendList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  friendBox: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
  },
  rightAction: {
    backgroundColor: '#FF4A4A',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
});
export default FriendListScreen;
