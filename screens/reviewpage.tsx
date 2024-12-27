// import React, { useEffect, useRef, useState } from 'react';
// import { Animated, Button, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
// import database from '@react-native-firebase/database';
// import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icons from 'react-native-vector-icons/MaterialIcons';
// import Star from 'react-native-vector-icons/AntDesign'
// import AppText from '../src/components/common/RText';
// import BoldText from '../src/components/common/BText';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import fcolor from '../src/assets/colors/fcolors';
// import RText from '../src/components/common/RText';
// import BText from '../src/components/common/BText';
// import MapView, { Circle, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
// import NeonGr from '../src/components/neongr';
// import MText from '../src/components/common/MText';
// import BottomBar from '../src/components/common/BottomBar';
// import BoxGr from '../src/components/common/BoxGr';
// import { usePlan } from '../src/components/common/PlanContext';

// import firestore from '@react-native-firebase/firestore';

// export function Reviewpage({ navigation, route }) {
//     //메인 계획 코드 가져오기
//     const { plancode } = route.params;

//     //여행 제목
//     const get_plan = async () => {
//         const planDoc = await firestore().collection('plan').doc(plancode).get();
//         const planData = planDoc.data();
//         return { title: planData?.title, memo: planData?.memo };
//     };

//     //리뷰
//     const get_review = async () => {
//         const planListCollection = await firestore().collection('plan').doc(plancode).collection('reviewlist').get();
//         let planList = [];
//         planListCollection.forEach(doc => {
//             planList.push({ id: doc.id, ...doc.data() });
//         });
//         return planList;
//     };

//     const [planTitle, setPlanTitle] = useState({ title: '', memo: '' });
//     const [plan, setPlan] = useState({ title: '', id: '' }); // 큰 계획
//     const [planList, setPlanList] = useState([]); // 작은 계획
//     const [isOpend, setOpend] = useState(false);

//     useEffect(() => {
//         const plan_info = async () => {
//             try {
//                 const plan = await get_plan();
//                 console.log('아')
//                 console.log(plan)
//                 setPlanTitle(plan);

//                 const planList = await get_review();
//                 console.log('아2')
//                 console.log(planList)
//                 let s_date = planList[0].id.split('-')
//                 let start_d = s_date[0].slice(2, 4) + '.' + s_date[1] + '.' + s_date[2]

//                 // setPlan을 호출할 때 planList[0]의 각 item을 변환하여 설정
//                 setPlan({ title: planList[0].title, id: planList[0].id });

//                 // planList[0]만을 사용하여 fullPlanList를 구성
//                 let id1 = 0;
//                 let fullPlanList = [];
//                 planList[0].plantext.forEach(planItem => {
//                     fullPlanList.push({ ...planItem, id: id1 += 1, date: planList[0].id, day: start_d });
//                 });

//                 setPlanList(fullPlanList);

//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         plan_info();
//     }, []);

//     const renderItem = ({ item }) => (
//         <View>
//             <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, marginBottom: 20 }}>
//                 <NeonGr><BText fontSize={18}>DAY1</BText></NeonGr>
//                 <View style={{ marginLeft: 10 }}><RText fontSize={18} color={fcolor.gray4}>{item.day}</RText></View>
//             </View>

//             <View style={styles.imagebanner}>
//                 <View style={{ width: '100%', height: 200, backgroundColor: fcolor.gray2 }}>
//                     <Image
//                         source={{ uri: `data:image/jpeg;base64,${item.photo}` }}
//                         style={{ width: '100%', height: 200, }}
//                     />
//                 </View>
//             </View>

//             <View style={{ paddingVertical: 20, paddingHorizontal: 30 }}>
//                 <View style={{ flexDirection: 'row' }}>
//                     <BText fontSize={15}>여행 별점</BText><RText fontSize={10} style={{ marginTop: 5, marginLeft: 5 }}>선택</RText>
//                 </View>

//                 <View style={{ marginTop: 10, flexDirection: 'row', }}>
//                     {[0, 1, 2, 3, 4].map((id) => (
//                         (item.star[id] === id ?
//                             <Star key={id} name='star' size={24} color={fcolor.blue} style={{ marginRight: 5 }} /> :
//                             <Star key={id} name='staro' size={24} color={fcolor.blue} style={{ marginRight: 5 }} />
//                         )
//                     ))}

//                 </View>
//             </View>

//             <View style={{ paddingVertical: 20, paddingHorizontal: 30 }}>
//                 <View style={{ flexDirection: 'row' }}>
//                     <BText fontSize={15}>여행 평가</BText><RText fontSize={10} style={{ marginTop: 5, marginLeft: 5 }}>선택</RText>
//                 </View>
//                 <View style={styles.reviewbox}>
//                     <RText>{item.rv_cont}</RText>

//                 </View>
//             </View>

//         </View>

//     );

//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             <View style={styles.container}>
//                 <View style={{ paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 10, alignItems: 'center' }}>
//                     <TouchableOpacity onPress={() => navigation.navigate('reviewlist')}><Icons name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
//                     <BText fontSize={18}>{planTitle.title}</BText>
//                     <Icons name='more-vert' size={24} color="#717171" />
//                 </View>

//                 <FlatList
//                     data={planList.filter(dplan => dplan.date === plan.id)}
//                     renderItem={renderItem}
//                     keyExtractor={(item) => String(item.id)}
//                 />

//             </View>

//             <BottomBar homecolor={fcolor.gray3} reviewcolor={fcolor.blue}></BottomBar>
//         </GestureHandlerRootView>

//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         height: 550,
//         paddingTop: 20,
//         backgroundColor: fcolor.white,
//     },
//     statebox: {
//         backgroundColor: fcolor.lblue2,
//         height: 50,
//         borderRadius: 10,
//         padding: 17,
//         paddingLeft: 22
//     },

//     white: {
//         width: '100%',
//         padding: 30,
//         paddingTop: 20,
//         backgroundColor: fcolor.white,
//         elevation: 30,
//     },
//     imagebanner: {
//         height: 200,
//         width: '100%'
//     },

//     reviewbox: {
//         width: '100%',
//         height: 147,
//         borderColor: fcolor.lblue1,
//         borderWidth: 1,
//         marginTop: 10,
//         borderRadius: 8,
//         textAlignVertical: "top",
//         paddingHorizontal: 14,
//         paddingVertical: 19
//     }

// })

// export default Reviewpage;
