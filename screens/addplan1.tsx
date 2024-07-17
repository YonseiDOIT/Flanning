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
import { addplan } from '../src/lib/plans';
import { useUser } from '../src/components/common/UserContext';
import { usePlan } from '../src/components/common/PlanContext';
import { Marker } from 'react-native-maps';



// Item.bigicontyp(큰 아이콘)
// Item.smicontyp(작은 아이콘)
// Item.title(큰내용)
// Item.memo(메모)


export function AddPlan1({ navigation: { navigate } }) {


  //지도
  const [islocation, setlocation] = useState({
    lat: 37.541,
    lng: 126.986
  })

  //지도
  const mapRef = useRef(null);
  
  async function movelocation(latitude, longitude) {
    setlocation({ lat: latitude, lng: longitude }); // 위치 상태 업데이트
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0011
        },
        2000,
      );
    }
  }

  //장소
  const [locationname, setlocationname] = useState('')
  const [isadd, setadd] = useState([])

  //장소 추가
  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: fcolor.lblue, marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', }}>
          <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
            <RText fontSize={11} color={fcolor.gray3} style={{ textDecorationLine: 'underline' }}>시간 입력</RText>
          </View>
          <View style={{ width: '80%' }}>
            <View style={styles.box}>
              <RText>여행 장소 : {item.name}</RText>
            </View>

          </View>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
          <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
          </View>
          <View style={{ width: '80%' }}>
            <View style={styles.box}>
              <TextInput placeholder={"여행 장소의 성격을 작성해주세요"}
                onChangeText={(text) => setForm({ ...form, locationtyp: text })}
                placeholderTextColor={fcolor.gray3}
                style={{ fontSize: 11 }}
              />
              <Icon name='check' size={24} color={fcolor.blue} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
          <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.box}>
              <TextInput placeholder={"아이콘"}
                onChangeText={(text) => setForm({ ...form, icon: text })}
                placeholderTextColor={fcolor.gray3}
                style={{ fontSize: 11 }}
              />
            </View>
          </View>
          <View style={{ width: '80%' }}>
            <View style={styles.box}>
              <TextInput placeholder={"추가 내용을 작성해주세요 (예약, 교통 수단)"}
                onChangeText={(text) => setForm({ ...form, content: text })}
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
                onChangeText={(text) => setForm({ ...form, content: text })}
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
    )
  };




  //장소
  const handleAddLocation = () => {

    const newLocation = {
      id: form.id + 1, // 간단한 고유 ID 생성
      name: locationname
    };
    setForm({ ...form, id: form.id + 1 })
    setadd(prevAdd => [...prevAdd, newLocation]);
  };
  //페이지
  const [form, setForm] = useState({
    title: "",
    id: 0,
    date: "",
    location: '',
    locationtyp: '',
    icon: '',
    content: ''
  });
  //메인 계획 코드 가져오기
  const { plancode } = usePlan();

  //데이터 파이베이스에 넘기기
  const onSubmit = (title: string, location: any, locationtyp: string, icon: string, content: any, date: string) => {
    console.log('파이어베이스 데이터 입력 성공!');
    addplan({ // 회원 프로필 생성
      codename: plancode,
      title: title,
      location: location,
      locationtyp: locationtyp,
      icon: icon,
      content: content,
      date: date

    })
  }



  //날짜 가져오기
  const get_date = async () => {
    const planDoc = await firestore().collection('plan').doc(plancode).get();
    const planData = planDoc.data();
    console.log(planData)

    return planData.startday;
  };

  useEffect(() => {
    const plan_info = async () => {
      try {
        const day = await get_date()

        setForm({ ...form, date: day })

      } catch (error) {
        console.error(error);
      }
    };
    plan_info();
  }, []);



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 25, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigate('addplan')}><Icon name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
          <BText fontSize={18}>여행 떠나기</BText>
          <TouchableOpacity
            onPress={() => [onSubmit(form.title, form.location, form.locationtyp, form.icon, form.content, form.date)]}>
            <Icon name='check' size={24} color={fcolor.blue} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={[]}
          renderItem={null}
          ListEmptyComponent={
            <View>
              <View style={{ paddingHorizontal: 25 }}>
                <View style={styles.boxset}>
                  <BText fontSize={15} color={fcolor.gray4}>여행 소제목</BText>
                  <TextInput style={styles.box}
                    onChangeText={(text) => setForm({ ...form, title: text })}
                    placeholder={"띄어쓰기 포함 12글자 이내로 작성해주세요"}
                    placeholderTextColor={fcolor.gray3}
                  />
                </View>
                <View style={styles.boxset}>
                  <BText fontSize={15} color={fcolor.gray4}>여행 일자</BText>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.box, { width: 123 }]}>
                      <RText fontSize={11} color={fcolor.gray4} style={{ marginRight: 10 }}>{form.date}</RText>
                      <Icon name='calendar-today' size={22} color={fcolor.blue} />
                    </View>
                  </View>
                </View>
                <View style={{ marginVertical: 15 }}>
                  <BText fontSize={15} color={fcolor.gray4}>여행 일정</BText>
                </View>
              </View>

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
                  }}>
                  <Marker
                    coordinate={{
                      latitude: islocation.lat,
                      longitude: islocation.lng
                    }}
                    pinColor={fcolor.blue}
                  />
                </MapView>
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
                  onPress={(data, details = null) => {
                    if (details) {
                      console.log(details.geometry.location.lat);
                      movelocation(details.geometry.location.lat, details.geometry.location.lng);
                      console.log(data.structured_formatting.main_text);
                      setForm((prevForm) => ({ ...prevForm, location: data.structured_formatting.main_text }));
                      setlocationname(data.structured_formatting.main_text);
                    }
                  }}
                  onFail={(error) => console.log('Google Places Autocomplete error:', error)}
                  onNotFound={() => console.log("no results")}
                  keepResultsAfterBlur={false} // 수정: false로 변경
                  enablePoweredByContainer={false}
                  styles={{
                    textInput: {
                      borderWidth: 1,
                      borderColor: fcolor.skyblue,
                    },
                    textInputContainer: {
                      padding: 10,
                    },
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={[styles.box, { width: 200, marginRight: 10 }]}>
                  <RText>{form.location}</RText>
                </View>
                <TouchableOpacity onPress={handleAddLocation}>
                  <Icon name='add' size={24} color={fcolor.blue} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={isadd}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>



          }
        />
      </View>
      <BottomBar></BottomBar>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
