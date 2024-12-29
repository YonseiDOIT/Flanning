// @ts-nocheck
import {View, StyleSheet, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';
import {useSignup} from './SignupProvider';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import NeonGr from 'src/components/neongr';
import RText from 'src/components/common/RText';

const Step4Screen = () => {
  const {handleStepNext, signupData, setSignupData} = useSignup();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const questionList = [
    // 1. 어떤 유형의 여행을 선호하시나요?
    // 여행 스타일 유형 선호도 파악
    {
      title1: '어떤 ',
      title2: '유형의 여행',
      title3: '을 선호하시나요?',
      questionTheme: 'tripType',
      answer1: '활동적인 여행',
      answer2: '쉼이 있는 여행',
    },
    // 2. 여행을 따나는 주된 이유는 무엇인가요?
    // 여행 이유 파악
    {
      title1: '',
      title2: '여행을 떠나는 주된 이유',
      title3: '는 무엇인가요?',
      questionTheme: 'tripReason',
      answer1: '동행자와의 관계 형성',
      answer2: '새로운 경험 추구',
    },
    // 3. 주로 어떤 여행지를 선호하시나요?
    // 여행지 선호도 파악
    {
      title1: '주로 어떤 ',
      title2: '여행지',
      title3: '를 선호하시나요?',
      questionTheme: 'tripDestinationType',
      answer1: '활기찬 도시',
      answer2: '평화로운 시골',
    },
    // 4. 어떤 유형의 장소를 선호하시나요?
    // 여행지 유형 선호도 파악
    {
      title1: '어떤 유형의 ',
      title2: '장소',
      title3: '를 선호하시나요?',
      questionTheme: 'tripLocationType',
      answer1: '핫플레이스',
      answer2: '숨겨진 로컬 장소',
    },
    // 5. 보통 여행할 때 몇 명과 함께 하시나요?
    // 여행 인원 파악
    {
      title1: '보통 여행할 때 ',
      title2: '몇 명',
      title3: '과 함께 하시나요?',
      questionTheme: 'tripCompanionsType',
      answer1: '혼자 여행',
      answer2: '단체 여행',
    },
    // 6. 여행 중 주로 어떻게 움직이시나요?
    // 여행 관광 스타일
    {
      title1: '여행 중 주로 어떻게 ',
      title2: '움직이시나요?',
      title3: '',
      questionTheme: 'tripActivityType',
      answer1: '수동적으로',
      answer2: '주도적으로',
    },
    // 7. 여행 계획은 어떻게 세우시는 편인가요?
    // 여행 계획 스타일
    {
      title1: '',
      title2: '여행 계획',
      title3: '은 어떻게 세우시는 편인가요?',
      questionTheme: 'tripPlanningType',
      answer1: '철저하게',
      answer2: '즉흥적으로',
    },
    // 8. 하루 일정은 어떻게 보내시길 원하시나요?
    // 하루 일정 스타일
    {
      title1: '',
      title2: '하루 일정',
      title3: '은 어떻게 보내시길 원하시나요?',
      questionTheme: 'tripScheduleType',
      answer1: '알차게',
      answer2: '여유롭게',
    },
    // 9. 여행지에서의 식사 메뉴 선호도는 어떻게 되나요?
    // 여행지 음식 선호도 스타일
    {
      title1: '여행지에서의 ',
      title2: '식사 메뉴 선호도',
      title3: '는 어떻게 되나요?',
      questionTheme: 'tripFoodType',
      answer1: '새로운 현지 음식',
      answer2: '익숙한 음식',
    },
    // 10. 여행 중 새로운 사람들과의 만남에 어떤 자세를 갖고 계시나요?
    // 여행에서 새로운 만남 추구 스타일
    {
      title1: '여행 중 새로운 ',
      title2: '사람들과의 만남',
      title3: '에 어떤 자세를 갖고 계시나요?',
      questionTheme: 'tripNewPerson',
      answer1: '소극적',
      answer2: '적극적',
    },
  ];

  const handleSelect = (field, value) => {
    setSignupData(prevData => ({
      ...prevData,
      step4: {
        ...prevData.step4,
        [field]: value,
      },
    }));
  };

  const validationNext = () => {
    const {
      tripType,
      tripReason,
      tripDestinationType,
      tripLocationType,
      tripCompanionsType,
      tripActivityType,
      tripPlanningType,
      tripScheduleType,
      tripFoodType,
      tripNewPerson,
    } = signupData.step4;

    const allValues = [
      tripType,
      tripReason,
      tripDestinationType,
      tripLocationType,
      tripCompanionsType,
      tripActivityType,
      tripPlanningType,
      tripScheduleType,
      tripFoodType,
      tripNewPerson,
    ];

    return allValues.every(value => value !== 0);
  };

  return (
    <Animated.ScrollView
      style={{flex: 1, opacity: fadeAnim}}
      showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 0, gap: 9}}>
        <BText>
          <BText color={fcolor.blue}>여행 스타일</BText>을 알려주세요
        </BText>
        <MText color={fcolor.gray3}>
          동행인이 여러분의 여행 성향에 대해 알 수 있도록 해주세요
        </MText>
      </View>

      <View style={styles.tripStyleContainer}>
        {questionList.map((question, idx) => (
          <View style={styles.styleGroup} key={`question-${idx}`}>
            <View style={styles.styleText}>
              <RText fontSize={15}>{question.title1}</RText>
              <NeonGr>
                <BText fontSize={15}>{question.title2}</BText>
              </NeonGr>
              <RText fontSize={15}>{question.title3}</RText>
            </View>
            <View style={styles.checkboxGroup}>
              {[1, 2, 3, 4, 5].map(value => (
                <TouchableOpacity
                  key={`${question.questionTheme}-${value}`}
                  style={[
                    styles.checkbox,
                    globalStyles.centered,
                    signupData.step4?.[question.questionTheme] === value &&
                      styles.check,
                  ]}
                  onPress={() => handleSelect(question.questionTheme, value)}>
                  {signupData.step4?.[question.questionTheme] === value && (
                    <MaterialIcon name="check" size={18} color={fcolor.white} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={[styles.styleText, {justifyContent: 'space-between'}]}>
              <RText fontSize={13} color={fcolor.gray4}>
                {question.answer1}
              </RText>
              <RText fontSize={13} color={fcolor.gray4}>
                {question.answer2}
              </RText>
            </View>
          </View>
        ))}
      </View>

      <View style={{flex: 1}}>
        <TouchableOpacity
          style={[
            globalStyles.buttonBase,
            globalStyles.centered,
            {
              marginBottom: 60,
            },
            validationNext()
              ? {backgroundColor: fcolor.blue}
              : {backgroundColor: fcolor.gray4},
          ]}
          disabled={!validationNext()}
          onPress={handleStepNext}>
          <MText color={fcolor.white}>회원가입하기</MText>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  tripStyleContainer: {
    marginTop: 40,
    marginBottom: 40,
    gap: 30,
  },
  styleGroup: {},
  styleText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 8,
  },
  checkbox: {
    borderColor: fcolor.gray3,
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    backgroundColor: fcolor.white,
  },
  check: {
    backgroundColor: fcolor.blue,
    borderColor: fcolor.gray3,
  },
});

export default Step4Screen;
