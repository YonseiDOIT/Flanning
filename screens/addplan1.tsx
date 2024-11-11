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
import DatePicker from 'react-native-date-picker';


export function AddPlan1({ navigation,route }) {

  //지도==========
  const mapRef = useRef(null);

  //지도 초기 위치
  const [islocation, setlocation] = useState({
    lat: 37.541,
    lng: 126.986
  })

  //지도 업데이트
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
        1000,
      );
    }
  }

  //장소
  const [locationname, setlocationname] = useState('')
  const [isadd, setadd] = useState([])

  //time picker=============
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [istime, settime] = useState({})
   
   //timepicker 표시
   const time_p = (index,time) => {
    const time_f=time.toLocaleTimeString("ko-KR",{ hour: "numeric", minute: "numeric",hour12: false })
    settime((prevState) => ({
      ...prevState,
      [index]: time_f, 
    }));
    const updatedtime = [...form.time]; 
    updatedtime[index] = time_f; 
    setForm({ ...form, time: updatedtime });
  };

  //timepicker
  const handleOpenPicker = (index) => {
    setSelectedIndex(index); // 현재 인덱스 설정
    setOpen(true); // DatePicker 열기

  };

  //아이콘 선택==========
  const [smallboxVisible, setSmallboxVisible] = useState({});
  const [isicon, seticon] = useState({})
  const [selectedIndex, setSelectedIndex] = useState(null);

  //아이콘 선택 함수
  const toggleMenu = (index) => {
    setSmallboxVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 현재 아이템의 상태를 토글
    }));
  };
  const select_icon = (index,item) => {
    seticon((prevState) => ({
      ...prevState,
      [index]: item
    }));
  };

  //장소 추가
  const renderItem = (location, index) => {

    return (
      <View style={{ backgroundColor: fcolor.lblue2, marginVertical: 10, paddingVertical:10,paddingHorizontal:20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleOpenPicker(index)}>
              <RText fontSize={11} color={fcolor.gray3} style={{ textDecorationLine: 'underline' }}>{istime[index] || '시간 선택'}</RText>
            </TouchableOpacity>
          </View>
          <View style={{ width: '80%' }}>
            <View style={styles.box}>
              <RText>여행 장소 : {location}</RText>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
          <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}></View>
          <View style={{ width: '80%' }}>
            <View style={styles.box}>
              <TextInput
                placeholder={"여행 장소의 성격을 작성해주세요"}
                onChangeText={(text) => {
                  const updatedLocationtyps = [...form.locationtyps];
                  updatedLocationtyps[index] = text; // 해당 인덱스 업데이트
                  setForm({ ...form, locationtyps: updatedLocationtyps });
                }}
                placeholderTextColor={fcolor.gray3}
                style={{ fontSize: 11 }}
                value={form.locationtyps[index]} // 현재 인덱스 값 사용
              />
              <Icon name='check' size={24} color={fcolor.blue} />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
          <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>{toggleMenu(index)}}>
              <Icons name={isicon[index]||'plus-box'} size={24} color={isicon[index]? fcolor.blue:fcolor.gray3} />
            </TouchableOpacity>
            
          </View>
          <View style={{ width: '80%' }}>
            <View style={styles.box}>
              <TextInput
                placeholder={"추가 내용을 작성해주세요 (예약, 교통 수단)"}
                onChangeText={(text) => {
                  const updatedContents = [...form.contents];
                  updatedContents[index] = text; // 해당 인덱스 업데이트
                  setForm({ ...form, contents: updatedContents });
                }}
                placeholderTextColor={fcolor.gray3}
                style={{ fontSize: 11 }}
                value={form.contents[index]} // 현재 인덱스 값 사용
              />
              <Icon name='check' size={24} color={fcolor.blue} />
            </View>
          </View>
        </View>
        {smallboxVisible[index] && ( // 각 아이템에 대한 smallboxVisible 상태를 확인
          <>
            <View style={styles.iconbox}>
            {['bus','subway','airplane','taxi','car','run','calendar','account'].map(id=>(
                    <TouchableOpacity key={id} 
                      onPress={()=>{
                        toggleMenu(index); 
                        select_icon(index,id);
                        const updatedIcons = [...form.icons]; 
                        updatedIcons[index] = id; 
                        setForm({ ...form, icons: updatedIcons }); 
                      }}>
                      <Icons name={id} size={24} color={fcolor.gray3} style={{marginRight:5}}/>
                    </TouchableOpacity>
                ))}        
              

            </View>
          </>
        )}

        <TextInput placeholder={"추가 내용 메모를 작성해주세요(선택)"}
                onChangeText={(text) => {
                  const updatedContents = [...form.subcont];
                  updatedContents[index] = text; // 해당 인덱스 업데이트
                  setForm({ ...form, subcont: updatedContents });
                }}
                placeholderTextColor={fcolor.gray3}
                style={[styles.memobox, {fontSize:10 }]}
                multiline={true}
              />
  
      </View>
    );
  };


  //장소
  const handleAddLocation = () => {
    const newLocation = {
      name: locationname, // 추가할 장소 이름
      locationtyp: form.locationtyps[form.id] || '', // 장소 유형
      icon: form.icons[form.id] || '', // 아이콘
      content: form.contents[form.id] || '', // 내용
      lat: islocation.lat || '', // 위도
      lng: islocation.lng || '' // 경도
    };

    setForm(prevForm => ({
      ...prevForm,
      id: prevForm.id + 1,
      locations: [...prevForm.locations, newLocation.name],
      locationtyps: [...prevForm.locationtyps, newLocation.locationtyp],
      icons: [...prevForm.icons, newLocation.icon],
      contents: [...prevForm.contents, newLocation.content],
      lat: [...prevForm.lat, newLocation.lat],
      lng: [...prevForm.lng, newLocation.lng]
    }));
  };

  //페이지
  const [form, setForm] = useState({
    title: "",
    id: 0,
    date: "",
    locations: [], // 장소 배열
    locationtyps: [], // 장소 유형 배열
    icons: [], // 아이콘 배열
    contents: [], // 내용 배열
    lat: [],
    lng: [],
    subcont:[],
    time:[]
  });

  //메인 계획 코드 가져오기
  const { plancode } = usePlan();

  //데이터 파이베이스에 넘기기
  const onSubmit = () => {
    console.log('Firebase 데이터 입력 시작!');

    // 각 장소 정보를 반복하여 Firebase에 저장
    form.locations.forEach((location, index) => {
      console.log('title : ', form.title)
      console.log('index : ', form.contents[index])
      console.log('icon : ', form.icons[index])
      console.log('subcont : ', form.subcont[index])
      console.log('time:',form.time[index])


      addplan({
        codename: plancode,
        title: form.title,
        location: location,
        locationtyp: form.locationtyps[index],
        icon: form.icons[index],
        content: form.contents[index],
        date: form.date,
        lat: form.lat[index],
        lng: form.lng[index],
        subcont:form.subcont[index],
        time:form.time[index]
      }, index === 0)
    });

  };




  //날짜 가져오기
  // const get_date = async () => {
  //   const planDoc = await firestore().collection('plan').doc(plancode).get();
  //   const planData = planDoc.data();
  //   console.log(planData)

  //   return planData.startday;
  // };

  const [daysarrupdate,setdaysarrupdate]= useState()

  //화면 넘어오면 바로 로딩되는 부분
  useEffect(() => {
    const plan_info = async () => {
      try {
        const day = route.params.days[route.params.day]

        //가져온 날짜에서 지금 날짜만 삭제
        setdaysarrupdate(route.params.days)
        console.log("DAY"+ (route.params.day+1))
        setForm({ ...form, title: "DAY"+ (route.params.day+1), date: day})

      } catch (error) {
        console.error(error);
      }
    };
    plan_info();
  }, []);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 25, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {route.params.day-1<0? navigation.navigate('addplan'):navigation.push('addplan1',{days:route.params.days,day:route.params.day-1})}}><Icon name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
          <BText fontSize={18}>여행 떠나기</BText>
          <TouchableOpacity
            onPress={() =>{route.params.day+1<route.params.days.length? [navigation.push('addplan1',{days:route.params.days,day:route.params.day+1}),onSubmit()]:[navigation.navigate('main1'),onSubmit()]}}>
            {route.params.day+1 == route.params.days.length?
              <Icon name='check' size={24} color={fcolor.blue} />
              :
              <Icon name='arrow-forward' size={24} color={fcolor.blue} />
            }
      
            
          </TouchableOpacity>
        </View>
        <FlatList
          data={[]}
          renderItem={null}
          style={{marginBottom:60}}
          ListEmptyComponent={
            <View>
              <View style={{ paddingHorizontal: 25 }}>
                <View style={styles.boxset}>
                  <BText fontSize={15} color={fcolor.gray4}>여행 일자</BText>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.box, { width: 123 }]}>
                      <RText fontSize={11} color={fcolor.gray4} style={{ marginRight: 10 }}>{form.date}</RText>
                      <Icon name='calendar-today' size={22} color={fcolor.blue} />
                    </View>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
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
                  debounce={300}
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
                      setForm((prevForm) => ({ ...prevForm, location: data.structured_formatting.main_text, }));
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
                      borderColor: fcolor.lblue1,
                    },
                    textInputContainer: {
                      padding: 10,
                    },
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:10 }}>
                <View style={[styles.box, { width: 200, marginRight: 10 }]}>
                  <RText>{form.location}</RText>
                </View>
                <TouchableOpacity onPress={handleAddLocation}>
                  <Icon name='add' size={24} color={fcolor.blue} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={form.locations}
                renderItem={({ item, index }) => renderItem(item, index)} // 인덱스를 함께 전달
                keyExtractor={(item, index) => index.toString()}
              />
              <DatePicker
                modal
                open={open}
                date={date}
                mode='time'
                is24hourSource='locale'
                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                  console.log(date)
                  time_p(selectedIndex,date)
                  
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
              
            </View>

          }
        />
      </View>
      <BottomBar checkcolor={fcolor.blue}></BottomBar>
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
    borderColor: fcolor.lblue1,
    borderRadius: 8,
    paddingLeft: 13,
    backgroundColor: fcolor.white,
    fontSize: 11,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 13
  },
  iconbox:{
    marginVertical:5,
    padding:10,
    borderWidth:1,
    borderColor:fcolor.lblue1,
    borderRadius: 8,
    backgroundColor:fcolor.white,
    flexDirection:'row'
  },
  memobox: {
    marginLeft: 100,
    borderLeftWidth: 2,
    borderColor: fcolor.lblue1,
    marginVertical: 15,
    paddingLeft: 10,
    paddingVertical: 7
  }
})

export default AddPlan1;
