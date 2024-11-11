import React, { useEffect, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, Image, TextInput, Platform, Pressable } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Star from 'react-native-vector-icons/AntDesign';
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
import { addplan, addreview } from '../src/lib/plans';
import { useUser } from '../src/components/common/UserContext';
import { usePlan } from '../src/components/common/PlanContext';
import { Marker } from 'react-native-maps';
import { launchImageLibrary } from 'react-native-image-picker';



export function AddReview({ navigation ,route }) {

  const { plancode } = route.params;

  //페이지
  const [form, setForm] = useState({
    title: "",
    id: 0,
    date: "",
    photo:"",
    star:[0],
    rv_cont:""
  });

  //메인 계획 코드 가져오기
  // const { plancode } = usePlan();

  //데이터 파이베이스에 넘기기
  const onSubmit = () => {
    console.log('Firebase 데이터 입력 시작!');

    // 각 장소 정보를 반복하여 Firebase에 저장
    console.log(response.assets[0].base64)
    addreview({
      codename:plancode,
      title:form.title,
      date:form.date,
      photo:response.assets[0].base64,
      star:form.star,
      rv_cont:form.rv_cont}, true)

  };




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


  //사진 가져오기
  const [response, setResponse] = useState("");
  const [imageFile, setImageFile] = useState("");
  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      (res) => {
        
        // console.log(response.assets[0].base64)
        if (res.didCancel) {
          return;
          
        }else if(res.errorCode){
            console.log("Image Error : " + res.errorCode);
          }

          setResponse(res);
          setImageFile(res.assets[0].base64);
      
      },
      

    )
  }

  //별점주기
  const [isclick, setclick] = useState([]);

  const handle = (clickbox) => {
    setclick(prevState => {
        let starlist=[]
        for (let i = 0; i <= clickbox; i++){
          starlist.push(i)
        }
        console.log(starlist)
        setForm({ ...form, star: starlist})
        return starlist
        
    });
    


    //setsave(prevState => ({...prevState, trvtg: isclick.includes(clickbox) ? prevState.trvtg.filter((element) => element !== clickbox) : [...prevState.trvtg, clickbox]}))
};



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 25, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('reviewlist')}><Icon name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
          <BText fontSize={18}>리뷰 작성</BText>
          <TouchableOpacity
            onPress={() => [onSubmit(),navigation.navigate('reviewp', { plancode: plancode })]}>
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
                  <BText fontSize={15}>여행 일자</BText>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.box, { width: 123 }]}>
                      <RText fontSize={11} color={fcolor.gray4} style={{ marginRight: 10 }}>{form.date}</RText>
                      <Icon name='calendar-today' size={22} color={fcolor.blue} />
                    </View>
                  </View>
                </View>
                <View style={{ marginVertical: 15 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <NeonGr><BText fontSize={18}>DAY1</BText></NeonGr>
                    <View style={{ marginLeft: 10 }}><RText fontSize={18} color={fcolor.gray4}>24.08.05</RText></View>
                  </View>
                </View>
              </View>

              <Pressable onPress={onSelectImage}>
              <View style={styles.imagebanner} >
                
                {response ? (
                  <>
                    <Image style={styles.imagebanner} source={{ uri: response?.assets[0]?.uri }} />
                  </>
                ) : (
                  
                    <Icon name='image' size={30} color={fcolor.gray4} />
                )}
                
              </View>
              </Pressable>

              <View style={{ paddingVertical: 20, paddingHorizontal: 30 }}>
                <View style={{ flexDirection: 'row' }}>
                  <BText fontSize={15}>여행 별점</BText><RText fontSize={10} style={{ marginTop: 5, marginLeft: 5 }}>선택</RText>
                </View>

                <View style={{ marginTop: 10, flexDirection: 'row', }}>
                  {[0,1,2,3,4].map(id=>(
                      <TouchableOpacity key={id} 
                      onPress={()=>[handle(id)]}>
                          {isclick.includes(id) ? 
                          <Star name='star' size={24} color={fcolor.blue} style={{ marginRight: 5 }} /> :
                          <Star name='staro' size={24} color={fcolor.blue} style={{ marginRight: 5 }} />}
                      </TouchableOpacity>
                      ))}
                </View>
              </View>

              <View style={{ paddingVertical: 20, paddingHorizontal: 30, marginBottom: 80 }}>
                <View style={{ flexDirection: 'row' }}>
                  <BText fontSize={15}>여행 평가</BText><RText fontSize={10} style={{ marginTop: 5, marginLeft: 5 }}>선택</RText>
                </View>
                <TextInput style={styles.reviewbox}
                  onChangeText={(text) => setForm({ ...form, rv_cont: text })}
                  placeholder={""}
                  placeholderTextColor={fcolor.gray3}
                  multiline={true}
                />
              </View>


            </View>



          }
        />
      </View>
      <BottomBar reviewcolor={fcolor.blue}></BottomBar>
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
    height: 200,
    width: '100%',
    marginVertical: 10,
    backgroundColor: fcolor.gray2,
    justifyContent: 'center',
    alignItems: 'center'
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
  memobox: {
    marginLeft: 100,
    borderLeftWidth: 2,
    borderColor: fcolor.lblue1,
    marginVertical: 15,
    paddingLeft: 10,
    paddingVertical: 7
  },
  reviewbox: {
    width: '100%',
    height: 147,
    borderColor: fcolor.lblue1,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 8,
    textAlignVertical: "top",
    paddingHorizontal:14,
    paddingVertical:19
  }
})

export default AddReview;
