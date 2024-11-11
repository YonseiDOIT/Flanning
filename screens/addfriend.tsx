import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, Alert, Animated, Image, TextInput } from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
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
import MText from '../src/components/common/MText';



function Addfriend({ navigation }) {
  const [isMore, setMore] = useState(false);
  const [users, setUsers] = useState([]);
  const [showaddf, setshowaddf] = useState(false);
  const [form, setForm] = useState('');
  const [nickname,setNickname]= useState('');
  //유저코드 가져오기
  const { usercode } = useUser();

  // 친구 ID 가져오기
  const get_nickname = async () => {
    const usersCollection = await firestore().collection('users').doc(usercode).get();
    const db = usersCollection.data();
    console.log(db.nickname);
    setNickname(db.nickname)
  };

  // 친구 추가 코드
  async function add_frd(frdcode) {
    // 해당 친구가 있는지 확인
    console.log(frdcode)
    const usersCollection = await firestore().collection('users').doc(frdcode).get();
    const db = usersCollection.data();
    if (db) {
      console.log("있는뎁쇼");
      // 추가
      const userCollection = firestore().collection("users").doc(usercode);
      userCollection.update("friend", FieldValue.arrayUnion(frdcode));

      //상대 쪽에도 추가
      const userCollection1 = firestore().collection("users").doc(frdcode);
      userCollection1.update("friend", FieldValue.arrayUnion(usercode));

      // 새 친구를 추가하고 상태를 업데이트
      setUsers(prevState => [...prevState, { ...db, id: prevState.length + 1, code: frdcode }]);
      navigation.navigate('friend')

    } else {
      console.log("없음");
      Alert.alert('', '해당 친구코드는 없는 코드입니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      get_nickname();
    }, [])
  );
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('friend')}><Icon name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
          <BText fontSize={18}>친구 추가</BText>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity>
            <Icon name='share' size={24} color="#717171" />
          </TouchableOpacity>
          </View>
          
        </View>

        <View style={{marginTop:28}}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <View style={{ backgroundColor: '#F1F1F1', height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Icons name='person-sharp' size={45} color='#D9D9D9' />
              </View>
            </View>

            <View style={{alignItems:'flex-end'}}>
                <RText fontSize={10} color={fcolor.gray3}>닉네임 수정하기{'>'}</RText>
            </View>

            <View style={styles.box}>
                <View style={{width:'30%'}}>
                    <MText>내 코드</MText>
                </View>
                <View>
                    <MText color={fcolor.gray4}>{nickname}</MText>
                </View> 
            </View>
            <View style={[styles.box,{backgroundColor:fcolor.gray1}]}>
                <View style={{width:'30%'}}>
                    <MText>친구 코드</MText>
                </View>
                <TextInput
                    onChangeText={(text)=>{setForm(text)}}
                    placeholder={"친구코드를 입력해주세요"}
                    placeholderTextColor={fcolor.gray3}
                    />
            </View>
            <View style={{alignItems:'center',marginTop:10}}>
              <TouchableOpacity style={styles.addbox} onPress={()=>add_frd(form)}>
                  <MText fontSize={12} color={fcolor.white}>확인</MText>
              </TouchableOpacity>
            </View>
        </View>
      </View>
      <BottomBar homecolor={fcolor.blue}></BottomBar>

      
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: fcolor.white,
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
  box:{
    width:'100%',
    height:55,
    backgroundColor:fcolor.lblue3,
    borderRadius:10,
    marginVertical:15,
    paddingHorizontal:20,
    alignItems:'center',
    flexDirection:'row'

  },
  addbox:{
    width:142,
    height:40,
    backgroundColor:fcolor.blue,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default Addfriend;
