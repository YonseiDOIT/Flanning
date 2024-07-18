import React, { memo, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import RText from '../src/components/common/RText';
import BText from '../src/components/common/BText';
import MText from '../src/components/common/MText';
import fcolor from '../src/assets/colors/fcolors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NeonGr from '../src/components/neongr';
import BottomBar from '../src/components/common/BottomBar';
import LinearGradient from 'react-native-linear-gradient';

import firestore, { FieldValue } from "@react-native-firebase/firestore";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { createplan } from '../src/lib/plans';
import { useUser } from '../src/components/common/UserContext';
import { usePlan } from '../src/components/common/PlanContext';



export function AddPlan({ navigation: { navigate } }) {
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

  //변수
  const [selected, setSelected] = useState({ start: '', end: '' });
  const [selecttwo, setSelecttwo] = useState(0);
  //const [selectdays, setSelectdays] = useState<string[]>([]);



  //날짜 선택 함수
  const daysclick = (day) => {
    console.log(day)
    console.log(selecttwo)
    if (selecttwo == 0) {
      setSelecttwo(selecttwo + 1)
      setSelected(prevState => ({ start: day, end: prevState.end }))
      setDates([day, '']);
      handleDayPress([day, '']);
    }
    else if (selecttwo == 1) {
      console.log('와...')
      console.log(dates[0])
      setSelecttwo(selecttwo + 1)
      setSelected(prevState => ({ start: prevState.start, end: day }))
      createDateRange(dates[0], day)

    } else {
      setSelecttwo(0)
      setDates([''])
      handleDayPress([''])
      setSelected({ start: '', end: '' })
    }


  }

  //기간
  const createDateRange = (start, end) => {
    const startday = new Date(start);
    const endday = new Date(end);
    console.log(end)
    let diff = Math.abs(startday.getTime() - endday.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    console.log(diff);

    //하나씩 더하기
    let ary = [];
    ary.push(start)
    for (let i = 0; i < diff; i++) {
      startday.setDate(startday.getDate() + 1)
      ary.push(startday.toISOString().substring(0, 10))
    }
    ary.push(end)

    console.log(ary)
    setDates(ary);
    handleDayPress(ary)
  }

  const [markedDates, setMarkedDates] = React.useState(null);
  const [dates, setDates] = React.useState(['']);


  const handleDayPress = (datearray) => {
    console.log('핸들프레스')
    console.log(datearray)

    if (datearray.length === 0) return;

    const firstDate = datearray[0];
    const lastDate = datearray[datearray.length - 1];

    let obj = datearray.reduce((c, v) => {
      if (firstDate === lastDate) {
        return Object.assign(c, {
          [v]: { startingDay: true, endingDay: true, color: fcolor.blue, textColor: fcolor.white }
        });
      } else if (v === firstDate) {
        return Object.assign(c, {
          [v]: { selected: true, startingDay: true, color: fcolor.blue, textColor: fcolor.white }
        });
      } else if (v === lastDate) {
        return Object.assign(c, {
          [v]: { selected: true, endingDay: true, color: fcolor.blue, textColor: fcolor.white }
        });
      }
      else {
        return Object.assign(c, {
          [v]: { selected: true, color: fcolor.blue, textColor: fcolor.white }
        });
      }
    }, {});

    console.log(obj);
    setMarkedDates(obj);
  }

  //페이지
  const [form, setForm] = useState({
    title: "",
    memo: ''
  });

  //메인계획 코드
  const { plancode, setPlancode } = usePlan();

  const onSubmit = (title: string, date1: string, date2: string, memo: string, userid: undefined) => {
    console.log('파이어베이스 데이터 입력 성공!');
    const plancode = createplan({ // 회원 프로필 생성
      title: title,
      date1: date1,
      date2: date2,
      memo: memo,
      userid: userid
    })


    setPlancode(plancode)
    users.forEach((item) => {
      const usersCollection1 = firestore().collection("users").doc(item.code);
      usersCollection1.update("plan", FieldValue.arrayUnion(plancode));
    }
    )


    return plancode
  }

  //여행 친구
  const [users, setUsers] = useState([]);
  const [useradd, setUseradd] = useState('');

  // 친구 ID 가져오기
  const get_frdid = async () => {
    const usersCollection = await firestore().collection('users').doc(usercode).get();
    const db = usersCollection.data();
    console.log(db.friend);
    return db.friend;
  };

  // 친구 목록 불러와서 해당 친구 이름이 같으면 여행 친구로 추가
  const frd_info = async (name) => {
    try {
      console.log('돌아감');
      let frdid = await get_frdid();
      console.log('친구 :', frdid);
      for (let id = 0; id < frdid.length; id++) {
        const usersCollection = await firestore().collection('users').doc(frdid[id]).get();
        const db = usersCollection.data();
        console.log('친구 정보 :', db);
        if (db.nickname == name)
          setUsers(prevState => [...prevState, { nickname: db.nickname, id: prevState.length + 1, code: frdid[id] }]); ``


        console.log('있음');
        console.log(users);

      }


    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({ item }) => {
    console.log(users)
    return (
      <View style={styles.friendbox}>
        {/* 친구 프사 */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../src/assets/images/userframe.png')}
            style={{
              width: 47,
              height: 47,
              marginRight: 20
            }}
          />
          <BText fontSize={12}>{item.nickname}</BText>
        </View>
      </View>
    );

  }


  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: fcolor.white }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigate('main')}><Icon name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
          <BText fontSize={18}>여행 떠나기</BText>
          <TouchableOpacity onPress={() => [navigate('addplan1'), onSubmit(form.title, selected.start, selected.end, form.memo, usercode)]}>
            <Icon name='arrow-forward' size={24} color={fcolor.blue} />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={[]}
            renderItem={null}
            ListEmptyComponent={
              <View>
                <View style={styles.boxset}>
                  <BText fontSize={15} color={fcolor.gray4}>여행 제목</BText>
                  <TextInput style={styles.box}
                    onChangeText={(text) => setForm({ ...form, title: text })}
                    placeholder={"띄어쓰기 포함 12글자 이내로 작성해주세요"}
                    placeholderTextColor={fcolor.gray3}
                  />
                </View>
                <View style={styles.boxset}>
                  <BText fontSize={15} color={fcolor.gray4}>여행 기간</BText>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.box, { width: 123 }]}>
                      <RText fontSize={11} color={fcolor.gray4} style={{ marginRight: 10 }}>{selected.start}</RText>
                      <Icon name='calendar-today' size={22} color={fcolor.blue} />
                    </View>
                    <MText fontSize={16} color={fcolor.blue} style={{ marginHorizontal: 10 }}>~</MText>
                    <View style={[styles.box, { width: 123 }]}>
                      <RText fontSize={11} color={fcolor.gray4} style={{ marginRight: 10 }}>{selected.end}</RText>
                      <Icon name='calendar-today' size={22} color={fcolor.blue} />
                    </View>
                  </View>
                  <Calendar style={{ marginVertical: 20 }}
                    theme={{
                      backgroundColor: '#ffffff',
                      calendarBackground: '#ffffff',
                      textSectionTitleColor: '#b6c1cd',
                      selectedDayBackgroundColor: fcolor.blue,
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: fcolor.blue,
                      dayTextColor: '#2d4150',
                      arrowColor: fcolor.skyblue
                    }}
                    markingType={'period'}

                    markedDates={markedDates}
                    onDayPress={day => {
                      daysclick(day.dateString)
                    }}

                  />

                </View>

                <View style={styles.boxset}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BText fontSize={15} color={fcolor.gray4}>여행 메모</BText>
                    <RText fontSize={10} color={fcolor.gray4} style={{ marginLeft: 10 }}>선택</RText>
                  </View>
                  <TextInput style={styles.box}
                    onChangeText={(text) => setForm({ ...form, memo: text })}
                    placeholder={"여행 메모를 추가해주세요 (선택)"}
                    placeholderTextColor={fcolor.gray3}
                  />
                </View>

                <View style={styles.boxset}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BText fontSize={15} color={fcolor.gray4}>여행 친구</BText>
                    <RText fontSize={10} color={fcolor.gray4} style={{ marginLeft: 10 }}>선택</RText>
                  </View>
                  <View style={styles.box}>
                    <TextInput placeholder={"함께 여행을 떠날 친구를 추가해주세요 (선택)"}
                      onChangeText={(text) => (setUseradd(text))}
                      placeholderTextColor={fcolor.gray3}
                      style={{ fontSize: 11 }}
                    />
                    <TouchableOpacity
                      onPress={() => frd_info(useradd)}>
                      <Icon name='search' size={24} color={fcolor.blue} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <FlatList
                      style={styles.frdbox}
                      data={users}
                      renderItem={renderItem} // 인덱스를 함께 전달
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </View>

                  <View style={[styles.boxset, { marginBottom: 80 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <BText fontSize={15} color={fcolor.gray4}>여행 예산</BText>
                      <RText fontSize={10} color={fcolor.gray4} style={{ marginLeft: 10 }}>선택</RText>
                    </View>
                    <View style={styles.box}>
                      <TextInput placeholder={"여행의 예산을 작성해주세요"}
                        placeholderTextColor={fcolor.gray3}
                        style={{ fontSize: 11 }}
                      />
                      <Icon name='check' size={24} color={fcolor.blue} />
                    </View>
                  </View>
                </View>
              </View>

            }
          />



        </View>

      </View>
      <BottomBar></BottomBar>

    </GestureHandlerRootView>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: fcolor.white,
    flexDirection: 'column',
    marginBottom: 50
  },
  friendbox: {
    width: '100%',
    height: 65,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  frdbox:{
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: fcolor.skyblue,
    justifyContent:'center'
    
  },
  boxset: {
    marginVertical: 15,
  },
  box: {
    marginTop: 7,
    height: 40,
    borderWidth: 1,
    borderColor: fcolor.skyblue,
    borderRadius: 8,
    paddingLeft: 17,
    backgroundColor: fcolor.white,
    fontSize: 11,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 13
  },
  calendar: {
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 20
  }
})

export default AddPlan;
