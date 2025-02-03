import React, {useCallback, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import MText from 'src/components/common/MText';
import RText from 'src/components/common/RText';
import fcolor from 'src/assets/colors/fcolors';
import {FlatList} from 'react-native-gesture-handler';
import FontASIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BText from 'src/components/common/BText';
import globalStyles from 'src/assets/styles/globalStyles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getUsercode, getUserdata} from 'src/components/common/getUserdata';
import {useUser} from 'src/context';
import {addFriend} from 'src/components/common/getFriend';
import {
  addNotification,
  updateNotificationState,
} from 'src/components/common/addNotification';

// 알림 페이지
const NotificationScreen = () => {
  //유저코드 가져오기
  const {usercode} = useUser();
  const navigation = useNavigation();

  //태그
  const [isclick, setclick] = useState();

  //태그 클릭
  const handle = clickbox => {
    setclick(prevState => (prevState === clickbox ? null : clickbox));
  };

  //알림데이터
  const [notification, setNotificationList] = useState('');

  //알림
  const renderItem = ({item, index}) => {
    console.log(index);
    return (
      <View
        style={[
          styles.alarmbox,
          item.state ? null : {backgroundColor: fcolor.white},
        ]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <MText fontSize={11} color={item.state ? fcolor.blue : fcolor.lblue4}>
            {item.title}
          </MText>
          <MText fontSize={11} color={fcolor.gray4}>
            {item.date}
          </MText>
        </View>

        {item.contents.includes('친구신청') && item.state ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 11,
            }}>
            <MText fontSize={14}>{item.contents}</MText>

            <View style={{gap: 8, flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={async () => {
                  await acceptFriend(item.contents, index);
                }}>
                <MText fontSize={14} color={fcolor.white}>
                  수락
                </MText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.acceptButton, {backgroundColor: fcolor.gray2}]}
                onPress={async () => {
                  await refusalFriend(item.contents, index);
                }}>
                <MText fontSize={14} color={fcolor.gray4}>
                  거절
                </MText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <MText fontSize={14}>{item.contents}</MText>
          </View>
        )}
      </View>
    );
  };

  //친구신청 수락
  const acceptFriend = async (words, id) => {
    const nickname = words.split('님');
    console.log(nickname[0]);
    const friendcode = await getUsercode(nickname[0]);
    //양쪽에 서로 추가
    addFriend(friendcode, usercode);

    const data = await getUserdata(usercode);

    Alert.alert(
      data.nickname,
      '친구 요청을 수락했어요!\n함께 여행할 준비가 되었어요 🎉',
    );
    await updateNotificationState(usercode, id);

    await getList();
  };

  const refusalFriend = async (words, id) => {
    const nickname = words.split('님');
    console.log(nickname[0]);
    const friendcode = await getUsercode(nickname[0]);

    const dateNow = new Date();
    const numYear = dateNow.getFullYear();
    let year = numYear.toString();
    year = year.slice(2);
    const date =
      year + '년 ' + dateNow.getMonth() + '월 ' + dateNow.getDay() + '일';

    const data = await getUserdata(usercode);

    addNotification(
      friendcode,
      '친구',
      '친구신청',
      data.nickname + '님이 친구 요청을 거절했어요',
      date,
      1,
    );
    await updateNotificationState(usercode, id);

    await getList();
  };

  const getList = async () => {
    try {
      const data = await getUserdata(usercode);
      setNotificationList(data.notification);
    } catch (error) {
      console.log(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getList();
    }, []),
  );

  return (
    <View style={globalStyles.backBase}>
      <View style={globalStyles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 40,
            marginBottom: 16,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontASIcon name="angle-left" size={40} color={fcolor.gray4} />
          </TouchableOpacity>
          <View />
          <View style={{width: 20}} />
        </View>
        <BText fontSize={20} style={{marginLeft: 5}}>
          알림
        </BText>
        <View style={{flexDirection: 'row', marginTop: 16, marginLeft: 5}}>
          {['전체알림', '친구', '여행', '리뷰'].map(id => (
            <TouchableOpacity
              key={id}
              style={[
                styles.clickbox,
                isclick === id
                  ? {backgroundColor: fcolor.blue, borderColor: fcolor.blue}
                  : null,
              ]}
              onPress={() => handle(id)}>
              {isclick === id ? (
                <RText fontSize={13} color={fcolor.white}>
                  {id}
                </RText>
              ) : (
                <RText fontSize={13} color={fcolor.gray4}>
                  {id}
                </RText>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{flex: 3.7}}>
        <FlatList
          data={notification}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clickbox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginRight: 9,
    backgroundColor: fcolor.gray1,
  },
  alarmbox: {
    height: 88,
    backgroundColor: fcolor.lblue3,
    paddingHorizontal: 36,
    paddingVertical: 15,
    flex: 1,
    marginVertical: 1,
  },
  acceptButton: {
    width: 55,
    height: 28,
    backgroundColor: fcolor.lblue4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationScreen;
