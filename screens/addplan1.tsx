import React, { useEffect, useRef, useState } from 'react';
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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};




// Item.bigicontyp(큰 아이콘)
// Item.smicontyp(작은 아이콘)
// Item.title(큰내용)
// Item.memo(메모)

const mycode = 'GPlyn';


export function AddPlan1() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  //지도
  const mapRef= useRef(null);


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

  //여행일자
  const [isdate, setdate] = useState();
  const onSubmit = (title: string) => {
    console.log('파이어베이스 데이터 입력 성공!');
    const usercode = createplan({ // 회원 프로필 생성
      title: title
    })

  }

  //
  const [islocation, setlocation] = useState({
    lat: 37.541,
    lng: 126.986
  })

  async function movelocation(latitude, longitude) {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.0082,
        longitudeDelta: 0.0041

      },
      2000,
    );
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('addplan')}><Icon name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
          <BText fontSize={18}>여행 추가하기</BText>
          <TouchableOpacity>
            <Icon name='check' size={24} color={fcolor.blue} />
          </TouchableOpacity>
        </View>
        <ScrollView>
        <View>       
          <View style={styles.boxset}>
            <BText fontSize={15} color={fcolor.gray4}>여행 소제목</BText>
            <TextInput style={styles.box}
              placeholder={"띄어쓰기 포함 12글자 이내로 작성해주세요"}
              placeholderTextColor={fcolor.gray3}
            />
          </View>
          <View style={styles.boxset}>
            <BText fontSize={15} color={fcolor.gray4}>여행 일자</BText>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.box, { width: 123 }]}>
                <RText fontSize={11} color={fcolor.gray4} style={{ marginRight: 10 }}>2024.06.05</RText>
                <Icon name='calendar-today' size={22} color={fcolor.blue} />
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 15 }}>
            <BText fontSize={15} color={fcolor.gray4}>여행 일정</BText>
            <View style={styles.imagebanner}>
              <MapView
              ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFill}
                initialRegion={{
                  latitude: islocation.lat,
                  longitude: islocation.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}

              />
              <GooglePlacesAutocomplete
                disableScroll={true}
                minLength={2}
                placeholder="여행 장소를 추가해주세요"
                query={{
                  key: 'AIzaSyASPm2BftJ_bVyceC7Yu20nuEQP7wIn2ho',
                  language: "ko",
                  components: "country:kr",
                }}
                keyboardShouldPersistTaps={"handled"}
                fetchDetails={true}
                onPress={(data, details) => {
                  console.log(details?.geometry.location.lat);
                  movelocation(details?.geometry.location.lat,details?.geometry.location.lng)
                  console.log(data.structured_formatting.main_text);
                }}
                onFail={(error) => console.log(error)}
                onNotFound={() => console.log("no results")}
                keepResultsAfterBlur={true}
                enablePoweredByContainer={false}
                styles={{
                  textInput:{
                    borderWidth:1,
                    borderColor:fcolor.skyblue
                  },
                  textInputContainer:{
                    padding:10
                  }
                }}
              ><TouchableOpacity><Icon name='search' size={24} color={fcolor.blue} /></TouchableOpacity></GooglePlacesAutocomplete>

            </View>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                <RText fontSize={11} color={fcolor.gray3} style={{ textDecorationLine: 'underline' }}>시간 입력</RText>
              </View>
              <View style={{ width: '80%' }}>
                <View style={styles.box}>
                  <TextInput placeholder={"여행 장소를 추가해주세요"}
                    placeholderTextColor={fcolor.gray3}
                    style={{ fontSize: 11 }}
                  />
                  <Icon name='search' size={24} color={fcolor.blue} />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

              </View>
              <View style={{ width: '80%' }}>
                <View style={styles.box}>
                  <TextInput placeholder={"여행 장소의 성격을 작성해주세요"}
                    placeholderTextColor={fcolor.gray3}
                    style={{ fontSize: 11 }}
                  />
                  <Icon name='check' size={24} color={fcolor.blue} />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='add-box' size={24} color={fcolor.gray3} />
              </View>
              <View style={{ width: '80%' }}>
                <View style={styles.box}>
                  <TextInput placeholder={"추가 내용을 작성해주세요 (예약, 교통 수단)"}
                    placeholderTextColor={fcolor.gray3}
                    style={{ fontSize: 11 }}
                  />
                  <Icon name='check' size={24} color={fcolor.blue} />
                </View>
              </View>

            </View>
            <View style={[styles.memobox, { marginBottom: 70 }]}>
              <RText color={fcolor.gray3} fontSize={10}>추가 내용 메모를 작성해주세요(선택)</RText>
            </View>

          </View>

        </View>
        </ScrollView>




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
    flexDirection: 'column'
  },
  boxset: {
    marginVertical: 15,
  },
  imagebanner: {
    height: 250,
    width: '100%',
    marginVertical: 10
  },
  box: {
    marginTop: 7,
    height: 40,
    borderWidth: 1,
    borderColor: fcolor.skyblue,
    borderRadius: 8,
    paddingLeft: 13,
    backgroundColor: fcolor.white,
    fontSize: 11,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 13
  },
  memobox: {
    marginLeft: 100,
    borderLeftWidth: 2,
    borderColor: fcolor.skyblue,
    marginVertical: 15,
    paddingLeft: 10,
    paddingVertical: 7

  }
})

export default AddPlan1;
