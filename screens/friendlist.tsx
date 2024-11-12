import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, Alert, Animated, Image } from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GestureHandlerRootView, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import fcolor from '../src/assets/colors/fcolors';
import BText from '../src/components/common/BText';
import RText from '../src/components/common/RText';
import NeonGr from '../src/components/neongr';
import LinearGradient from 'react-native-linear-gradient';
import firestore, { FieldValue } from "@react-native-firebase/firestore";
import DialogInput from 'react-native-dialog-input';
import BottomBar from '../src/components/common/BottomBar';
import { useUser } from '../src/components/common/UserContext';
import { FadeDownView } from '../src/components/common/buttonAnimation';
import { getMain } from '../src/lib/users';


function FriendList({ navigation: { navigate } }) {
  const [isMore, setMore] = useState(false);
  const [users, setUsers] = useState([]);
  const [showaddf, setshowaddf] = useState(false);

  //유저코드 가져오기
  const { usercode } = useUser();
  const [main, setmain] = useState('');

  // 친구 삭제 코드
  function delete_frd(frdcode) {
    const userCollection = firestore().collection("users").doc(usercode);
    userCollection.update({
      friend: FieldValue.arrayRemove(frdcode)
    });
  };

  // 친구 ID 가져오기
  const get_frdid = async () => {
    const usersCollection = await firestore().collection('users').doc(usercode).get();
    const db = usersCollection.data();
    console.log(db.friend);
    return db.friend;
  };

  // 친구 목록 불러오기
  const frd_info = async () => {
    try {
      console.log('돌아감');
      let frdid = await get_frdid();
      console.log(frdid);
      let updatedUsers = [];
      for (let id = 0; id < frdid.length; id++) {
        const usersCollection = await firestore().collection('users').doc(frdid[id]).get();
        const db = usersCollection.data();
        updatedUsers.push({ ...db, id: id + 1, code: frdid[id] });
        console.log(db);
      }
      setUsers(updatedUsers);
      setmain(await getMain(usercode))
      
    } catch (error) {
      console.log(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      frd_info();
    }, [])
  );

  const [collapsed, setCollapsed] = useState(true);

  const rotateAnimValueRef = useRef(new Animated.Value(0));



  // 친구 목록
  const renderItem = ({ item }) => {
    const isExpanded = item.id === moreview;
    console.log(item);

    const toggleExpand = () => {
        const newValue = collapsed ? 1 : 0;
        Animated.timing(rotateAnimValueRef.current, {
            toValue: newValue,
            duration: 300,
            useNativeDriver: true,
        }).start();

        more_frd(item.id);
        setCollapsed(!collapsed);
    };

    return (
      <View style={[styles.friendbox, isExpanded ? { height: 196 } : null]}>
        {/* 친구 프사 */}
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../src/assets/images/userframe.png')}
            style={{
              width: 47,
              height: 47,
              marginRight: 20
            }}
          />

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{marginBottom:5, flexDirection:'row'}}>
                <NeonGr><BText fontSize={16}>{item.nickname}</BText></NeonGr>
              </View>
              
              <RText color={fcolor.gray4}>{item.intro}</RText>
            </View>
            <View style={{ position: 'absolute', left: 210, top: -5 }}>
              <TouchableOpacity onPress={toggleExpand}>
                  <Icon name='expand-more' size={30} color={isExpanded ? fcolor.blue : fcolor.gray2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 추가되는 내용 */}
        {isExpanded && (
          <>
            <View style={{ marginTop: 15, flexDirection: 'row', flexWrap: 'wrap' }}>
              {item.trvtg.map((ele) => (
                <View style={styles.tgbox} key={ele}>
                  <RText fontSize={13}>{ele}</RText>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    )
  };

  // 친구추가 버튼 이벤트
  const [smallboxVisible, setSmallboxVisible] = useState(false);

  const toggleMenu = () => {
    setSmallboxVisible(!smallboxVisible);
  };

  // 친구 정보 더 보기 버튼 이벤트
  const [moreview, setmoreview] = useState(null);

  const more_frd = (id) => {
    setmoreview(moreview === id ? null : id);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {if (main){navigate('main1')}else{navigate('main')}}}><Icon name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
          <BText fontSize={18} style={{marginLeft:35}}>친구 목록</BText>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={toggleMenu} style={{marginRight:10}}>
            <Icon name='group-add' size={24} color="#717171" />
          </TouchableOpacity>
          <TouchableOpacity >
            <Icon name='person-remove' size={24} color="#717171" />
          </TouchableOpacity>

          </View>
          
        </View>

        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />

        {smallboxVisible && (
          <>
          <FadeDownView duration={200}>
            {/* onpress 옆에 setshowaddf(true)넣었었ㅇ므 */}
            <TouchableOpacity style={styles.smallbox1} onPress={() => navigate('addfriend')}>
              <Text style={{ color: fcolor.blue }}>친구 추가하기</Text>
            </TouchableOpacity>
          </FadeDownView>
          <FadeDownView duration={200}>
            <TouchableOpacity style={styles.smallbox} onPress={() => {}}>
              <Text style={{ color: fcolor.blue }}>친구 초대하기</Text>
            </TouchableOpacity>
          </FadeDownView>
            
          </>
        )}
      </View>
      <BottomBar homecolor={fcolor.blue}></BottomBar>

      
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: fcolor.lblue2,
    flexDirection: 'column'
  },
  friendbox: {
    width: '100%',
    height: 74,
    borderRadius: 10,
    backgroundColor: fcolor.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 10,
    zIndex: 1
  },
  tgbox: {
    height: 34,
    backgroundColor: fcolor.lblue2,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 10,
    marginRight: 15,
    marginVertical: 9,
  },
  friendbox1: {
    width: '100%',
    height: 196,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: fcolor.lblue2,
    padding: 20,
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
  frd_delet: {
    width: 76,
    height: 74,
    backgroundColor: fcolor.orange,
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallbox: {
    position: 'absolute',
    right: -10,
    top: -630,
    backgroundColor: fcolor.lblue1,
    padding: 8,
    borderRadius: 10,
    zIndex: 10,
    elevation: 4
  },
  smallbox1: {
    position: 'absolute',
    right: -10,
    top: -680,
    backgroundColor: fcolor.lblue1,
    padding: 8,
    borderRadius: 10,
    zIndex: 11,
    elevation: 4
  }
});

export default FriendList;
