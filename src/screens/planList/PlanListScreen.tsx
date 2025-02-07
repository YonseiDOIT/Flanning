// @ts-check
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';
import BottomBar from 'src/components/common/BottomBar';
import BText from 'src/components/common/BText';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Font5Icon from 'react-native-vector-icons/FontAwesome5';
import OctionsIcon from 'react-native-vector-icons/Octicons';
import MText from 'src/components/common/MText';
import RText from 'src/components/common/RText';
import plan from './plan.json';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import notplan from './notplan.json';
import notlocation from './notlocation.json';
import PlusButton from 'src/components/common/PlusButton';
import {usePlan} from 'src/context';
import {useUser} from 'src/context';

import {useAuth} from 'src/context';
import {getUsercode} from 'src/components/common/getUserdata';

const filterList = [
  {
    id: 0,
    filterTitle: '출발일 순',
    filter: 'start',
  },
  {
    id: 1,
    filterTitle: '최신 등록 순',
    filter: 'new',
  },
];

// 일정 목록 페이지
const PlanListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {direction} = route.params;
  const [filter, setFilter] = useState(0);
  const {planListData} = usePlan();
  const [planData, setPlanData] = useState([]);
  const {userData} = useUser();
  const {authData} = useAuth();
  const [userCode, setUserCode] = useState(null);

  useEffect(() => {
    let sortedPlans = [...planListData];
    if (filter === 0) {
      // 출발일 순
      sortedPlans.sort(
        (a, b) =>
          new Date(a.dayList[0]).getTime() - new Date(b.dayList[0]).getTime(),
      );
    } else if (filter === 1) {
      // 최신 등록 순
      sortedPlans.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    setPlanData(sortedPlans);
  }, [filter, planListData]);

  useEffect(() => {
    const getUserCode = async () => {
      if (authData) {
        const userCodeResult = await getUsercode(authData.email);
        setUserCode(userCodeResult);

        if (direction) {
          navigation.navigate('PlanDetail', {
            planItem: planListData[0],
            userCode: userCodeResult,
          });
        }
      }
    };
    getUserCode();
  }, [userData]);

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? 80 : 20,
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 2,
          borderColor: fcolor.gray1,
        }}>
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
            }}>
            <BText style={{fontWeight: 'bold'}}>여행 목록</BText>
            <TouchableOpacity>
              <MaterialIcon name="search" size={32} color={fcolor.gray4} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              gap: 10,
            }}>
            {filterList.map(item => {
              return (
                <TouchableOpacity
                  key={`filter-${item.id}`}
                  onPress={() => setFilter(item.id)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    backgroundColor:
                      filter === item.id ? fcolor.blue : fcolor.gray1,
                    borderRadius: 100,
                  }}>
                  <RText
                    color={filter === item.id ? fcolor.white : fcolor.gray4}>
                    {item.filterTitle}
                  </RText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          marginBottom: 100,
        }}>
        {planData.length > 0 ? (
          planData.map((planItem, idx) => {
            const lastDateIdx = planItem?.dayList.length - 1;
            return (
              <TouchableOpacity
                key={`plan-${planItem.date}-${idx}`}
                onPress={() => {
                  navigation.navigate('PlanDetail', {planItem, userCode});
                }}
                style={{
                  backgroundColor: fcolor.white,
                  borderBottomWidth: 2,
                  borderColor: fcolor.gray1,
                }}>
                <View
                  style={{
                    paddingHorizontal: 40,
                    paddingVertical: 10,
                    gap: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <BText fontSize={20}>{planItem.title}</BText>
                    {planItem.creator === userCode ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 4,
                          width: 62,
                          height: 22,
                          backgroundColor: fcolor.orange2,
                          borderRadius: 4,
                        }}>
                        <OctionsIcon
                          name="person"
                          size={12}
                          color={fcolor.orange}
                        />
                        <BText fontSize={12} color={fcolor.orange}>
                          소유자
                        </BText>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 4,
                          width: 62,
                          height: 22,
                          backgroundColor: fcolor.lblue3,
                          borderRadius: 4,
                        }}>
                        <OctionsIcon
                          name="people"
                          size={12}
                          color={fcolor.lblue4}
                        />
                        <BText fontSize={12} color={fcolor.lblue4}>
                          참여자
                        </BText>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      flexDirection: 'column',
                      gap: 8,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 15,
                      }}>
                      <Font5Icon
                        name="map-marker-alt"
                        size={16}
                        color={fcolor.gray4}
                      />
                      <MText color={fcolor.gray4} fontSize={12}>
                        {planItem.area}
                      </MText>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 15,
                      }}>
                      <Font5Icon
                        name="calendar"
                        size={16}
                        color={fcolor.gray4}
                      />
                      <MText color={fcolor.gray4} fontSize={12}>
                        {planItem.dayList[0]} ~ {planItem.dayList[lastDateIdx]}
                      </MText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
            }}>
            <Image
              source={require('src/assets/images/common/pencil.png')}
              style={{
                width: 96,
                height: 96,
                resizeMode: 'contain',
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}>
              <MText color={fcolor.gray4}>아직 일정이 없어요</MText>
              <MText color={fcolor.gray4}>
                플래닝과 함께 여행을 떠나볼까요?
              </MText>
            </View>
          </View>
        )}
      </ScrollView>
      <PlusButton
        onPress={() => {
          navigation.navigate('PlanMake');
        }}
      />
      <BottomBar />
    </View>
  );
};

export default PlanListScreen;
