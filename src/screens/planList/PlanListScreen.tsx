// @ts-check
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';
import BottomBar from 'src/components/common/BottomBar';
import BText from 'src/components/common/BText';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Font5Icon from 'react-native-vector-icons/FontAwesome5';
import MText from 'src/components/common/MText';
import RText from 'src/components/common/RText';
import plan from './plan.json';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import notplan from './notplan.json';
import notlocation from './notlocation.json';
import PlusButton from 'src/components/common/PlusButton';

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
  const [filter, setFilter] = useState(0);
  const [planList, setPlanList] = useState([]);

  useEffect(() => {
    let sortedPlans = [...plan];
    // if (filter === 0) {
    //   // 출발일 순
    //   sortedPlans.sort(
    //     (a, b) =>
    //       new Date(a.date.start).getTime() - new Date(b.date.start).getTime(),
    //   );
    // } else if (filter === 1) {
    //   // 최신 등록 순
    //   sortedPlans.sort(
    //     (a, b) =>
    //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    //   );
    // }
    setPlanList(plan);
  }, [filter]);

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
        {planList.length > 0 ? (
          planList.map((planItem, idx) => {
            const lastDateIdx = planItem.dayList.length - 1;
            return (
              <TouchableOpacity
                key={`plan-${planItem.date}-${idx}`}
                onPress={() => {
                  navigation.navigate('PlanDetail', {planItem});
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
                  <BText fontSize={20}>{planItem.title}</BText>
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
                        {planItem.dayList[0]}~ {planItem.dayList[lastDateIdx]}
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
          navigation.navigate('LocationAdd');
        }}
      />
      <BottomBar />
    </View>
  );
};

export default PlanListScreen;
