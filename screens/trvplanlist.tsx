import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, Image, Pressable, ImageBackground } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import RText from '../src/components/common/RText';
import BText from '../src/components/common/BText';
import MText from '../src/components/common/MText';
import fcolor from '../src/assets/colors/fcolors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NeonGr from '../src/components/neongr';
import BottomBar from '../src/components/common/BottomBar';
import LinearGradient from 'react-native-linear-gradient';

import firestore, { FieldValue } from "@react-native-firebase/firestore";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useUser } from '../src/components/common/UserContext';


export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};




// Item.bigicontyp(큰 아이콘)
// Item.smicontyp(작은 아이콘)
// Item.title(큰내용)
// Item.memo(메모)


export function Trvplanlist({ navigation: { navigate } }) {

  //유저코드 가져오기
  const { usercode } = useUser();

  //여행태그
  const [isclick, setclick] = useState();

  //여행태그 클릭
  const handle = (clickbox) => {
    setclick(prevState => prevState === clickbox ? null : clickbox);

  };

  //목록 가져오기
  const [planTitle, setPlanTitle] = useState([]);

  const get_plan = async (plan_id) => {
    const usersCollection = firestore().collection('plan').doc(plan_id).get();
    const db = (await usersCollection).data();
    console.log(db.title);
    return db.title;
  };

  const plan_info = async () => {
    try {
      const usersCollection = firestore().collection('users').doc(usercode).get();
      let db = (await usersCollection).data();

      const list = db.plan
      console.log('뭐임')
      console.log(list)

      let updateplan = [];
      for (let id = 0; id < list.length; id++) {
        console.log(list[id])
        const usersCollection1 = firestore().collection('plan').doc(list[id]).get();
        const db1 = (await usersCollection1).data();
        console.log('돌아감1')
        console.log(db1)
        let title = db1.title
        let photo = db1.photo
        var have = false

        if (db1.photo) {
          have = true
        } else {
          console.log('사진 없어')
        }
        updateplan.push({ ...db1, title: title, id: id + 1, plancode: list[id], have_p: have, photo: photo })
        console.log('돌아감2')
        console.log(db1.title)
      }
      setPlanTitle(updateplan)


      // setplanlist(db)

    } catch (error) {
      console.log('안돌아감');
    }
  };

  // 여행 목록 불러오기
  useFocusEffect(
    useCallback(() => {
      plan_info();
    }, [])
  );


  // 일정 삭제 코드
  const delete_plan = async (p_code) => {
    try {
      // Firestore에서 데이터 삭제
      await firestore().collection("plan").doc(p_code).delete();
      await firestore().collection("users").doc(usercode).update({
        plan: FieldValue.arrayRemove(p_code),
      });

      // 상태 업데이트
      plan_info()
    } catch (error) {
      console.log('Error deleting plan:', error);
    }
  };

  // 친구 정보 더 보기 버튼 이벤트
  const [moreview, setmoreview] = useState(null);
  const more_set = (id) => {
    setmoreview(moreview === id ? null : id);
  };


  //여행 박스
  const renderItem = ({ item }) => {
    const isExpanded = item.id === moreview;

    return (
      <View style={{borderRadius: 10}}>
        {item.have_p ? (
          <ImageBackground
            source={{ uri: `data:image/jpeg;base64,${item.photo}` }}
            style={{ width: "100%", height: 158, zIndex: 1,
              marginVertical: 10,justifyContent: 'space-between',
            }}
            imageStyle={{borderRadius: 15}}
            resizeMode="cover"
          ><View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
              <TouchableOpacity onPress={() => more_set(item.id)} style={{ marginRight: 10 }}>
                <Icon name='more-vert' size={24} color={fcolor.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.planebox1}>
              {isExpanded && ( // 각 아이템에 대한 smallboxVisible 상태를 확인
                <>
                  <TouchableOpacity style={styles.smallbox1} onPress={() => { }}>
                    <RText color={fcolor.blue} fontSize={12}>사진 수정하기</RText>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.smallbox} onPress={() => { delete_plan(item.plancode) }}>
                    <RText color={fcolor.blue} fontSize={12}>일정 삭제하기</RText>
                  </TouchableOpacity>
                </>
              )}
              <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                <TouchableOpacity onPress={() => navigate('plande')}>
                  <NeonGr><BText fontSize={16}>{item.title}</BText></NeonGr>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }}>
                  <Icon name='location-on' size={24} style={{ marginRight: 5 }} />
                  <RText color={fcolor.gray4}>여행지</RText>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }}>
                  <Icon name='calendar-today' size={24} style={{ marginRight: 5 }} />
                  <RText color={fcolor.gray4}>여행일자</RText>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20 }}>
                  <Icon name='share' size={24} />
                </View>
              </View>
            </View>

          </ImageBackground>


        ) : (
          <LinearGradient style={styles.planebox} colors={['#EDF5FF', '#C5DCFF']} start={{ x: 0, y: 0 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
              <TouchableOpacity onPress={() => more_set(item.id)} style={{ marginRight: 10 }}>
                <Icon name='more-vert' size={24} color={fcolor.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.planebox1}>
              {isExpanded && ( // 각 아이템에 대한 smallboxVisible 상태를 확인
                <>
                  <TouchableOpacity style={styles.smallbox1} onPress={() => { }}>
                    <RText color={fcolor.blue} fontSize={12}>사진 수정하기</RText>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.smallbox} onPress={() => { delete_plan(item.plancode) }}>
                    <RText color={fcolor.blue} fontSize={12}>일정 삭제하기</RText>
                  </TouchableOpacity>
                </>
              )}
              <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                <TouchableOpacity onPress={() => navigate('plande')}>
                  <NeonGr><BText fontSize={16}>{item.title}</BText></NeonGr>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }}>
                  <Icon name='location-on' size={24} style={{ marginRight: 5 }} />
                  <RText color={fcolor.gray4}>출발지 {'>'} 도착지</RText>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }}>
                  <Icon name='calendar-today' size={24} style={{ marginRight: 5 }} />
                  <RText color={fcolor.gray4}>여행일자</RText>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20 }}>
                  <Icon name='share' size={24} />
                </View>
              </View>
            </View>
          </LinearGradient>

        )}
      </View>




    )
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40 }}>
          <View style={{ width: 66 }}></View>
          <BText style={{ alignItems: 'center' }} fontSize={18}>여행 목록</BText>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <TouchableOpacity>
              <Icon style={{ marginRight: 18 }} name='search' size={24} color={fcolor.gray4} />
            </TouchableOpacity>

            <Icons name='tune-vertical' size={24} color={fcolor.gray4} />
          </View>

        </View>
        <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}>
          {['최신 날짜 순', '최근 수정 순', '최근 조회 순'].map(id => (
            <TouchableOpacity key={id}
              style={[styles.clickbox1, isclick === id ? { backgroundColor: fcolor.blue, borderColor: fcolor.blue } : null]}
              onPress={() => handle(id)}>
              {isclick === id ?
                <RText fontSize={13} color={fcolor.white}>{id}</RText> :
                <RText fontSize={13} color={fcolor.gray4}>{id}</RText>}
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          style={{ marginBottom: 80 }}
          data={planTitle}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <Pressable
          style={({ pressed }) => pressed ? [styles.fab, { transform: [{ scale: 0.9 }] }] : [styles.fab]}
          onPress={() => navigate("addplan")}>
          <Icon name='edit' size={24} color={fcolor.white} />
        </Pressable>

      </View>

      <BottomBar checkcolor={fcolor.blue}></BottomBar>

    </GestureHandlerRootView>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fcolor.white,
    paddingHorizontal: 16

  },
  header: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: fcolor.blue

  },
  white: {
    width: '100%',
    height: 550,
    backgroundColor: fcolor.white,
    justifyContent: 'center',
    elevation: 30,

  },
  travelplane: {
    height: 500,
    padding: 20,
    margin: 20,

  },
  clickbox1: {
    width: 82,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
    marginRight: 9,
    borderColor: fcolor.gray2
  },
  smallbox: {
    width: 82,
    height: 30,
    position: 'absolute',
    right: 10,
    top: -15,
    backgroundColor: fcolor.lblue1,
    padding: 7,
    borderRadius: 8,
    zIndex: 2,
    elevation: 4
  },
  smallbox1: {
    width: 82,
    height: 30,
    position: 'absolute',
    right: 10,
    top: -55,
    backgroundColor: fcolor.lblue1,
    padding: 7,
    borderRadius: 8,
    zIndex: 4,
    elevation: 4
  },
  //일정내용
  planecontent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 30
  },
  planeline: {
    width: 1,
    height: 100,
    backgroundColor: fcolor.gray4
  },
  planebox: {
    width: '100%',
    height: 158,
    backgroundColor: fcolor.lblue1,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginVertical: 10
  },
  planebox1: {
    height: 74,
    backgroundColor: fcolor.gray1,
    paddingTop: 9,
    paddingLeft: 20,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    zIndex: 0
  },
  //플로팅 버튼
  fab: {
    width: 40,
    height: 40,
    backgroundColor: fcolor.blue,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    bottom: 90,
    elevation: 2
  }
})

export default Trvplanlist;
