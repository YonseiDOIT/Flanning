// @ts-nocheck
import {Animated, StyleSheet, View} from 'react-native';
import {useSignup} from './SignupProvider';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import fcolor from 'src/assets/colors/fcolors';
import NeonGr from 'src/components/neongr';
import globalStyles from 'src/assets/styles/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useEffect, useRef, useState} from 'react';

const questionList = [
  // 1. 어떤 유형의 여행을 선호하시나요?
  {
    questionType: '1. 선호하는 활동 유형',
    title1: '어떤 ',
    title2: '유형의 여행',
    title3: '을 더 선호하시나요?',
    questionTheme: 'tripType',
    type: 'row',
    answerSelect: 5,
    answer1: '활동적인 여행',
    answer2: '쉼이 있는 여행',
  },
  // 2. 여행에서 더 중요하게 생각하는 것은 무엇인가요?
  {
    questionType: '2. 여행의 주요 동기',
    title1: '여행에서 더 ',
    title2: '중요하게 생각하는 것',
    title3: '은 무엇인가요?',
    questionTheme: 'tripReason',
    type: 'row',
    answerSelect: 5,
    answer1: '동행자와의 관계 강화',
    answer2: '여행을 통한 활력과 재충전',
  },
  // 3. 어떤 유형의 장소를 더 선호하시나요?
  {
    questionType: '3. 선호하는 장소 유형',
    title1: '어떤 유형의 ',
    title2: '장소',
    title3: '를 더 선호하시나요?',
    questionTheme: 'tripLocationType',
    type: 'row',
    answerSelect: 5,
    answer1: '인기 명소',
    answer2: '숨겨진 로컬 장소',
  },
  // 4. 보통 여행할 때 몇 명과 함께 하시나요?
  {
    questionType: '4. 평소 여행 동행 인원',
    title1: '보통 여행할 때 ',
    title2: '몇 명',
    title3: '과 함께 하시나요?',
    questionTheme: 'tripCompanionsType',
    type: 'col',
    answerSelect: 4,
    answer1: ['혼자 여행', '2-3인 여행', '단체 여행', '매번 다름'],
  },
  // 5. 여행할 때 얼마나 주도적으로 움직이시나요?
  {
    questionType: '5. 여행 주도성',
    title1: '여행 중 주로 ',
    title2: '어떻게 움직',
    title3: '이시나요?',
    questionTheme: 'tripActivityType',
    type: 'row',
    answerSelect: 5,
    answer1: '수동적으로',
    answer2: '주도적으로',
  },
  // 6. 여행 계획은 어떻게 세우는 편인가요?
  {
    questionType: '6. 여행 계획 방식',
    title1: '',
    title2: '여행 계획',
    title3: '은 어떻게 세우시는 편인가요?',
    questionTheme: 'tripPlanningType',
    type: 'row',
    answerSelect: 5,
    answer1: '철저하게',
    answer2: '즉흥적으로',
  },
  // 7. 하루 일정은 어떻게 보내시길 원하시나요?
  {
    questionType: '7. 선호하는 활동량',
    title1: '',
    title2: '하루 일정',
    title3: '은 어떻게 보내시길 원하시나요?',
    questionTheme: 'tripScheduleType',
    type: 'row',
    answerSelect: 5,
    answer1: '알차게',
    answer2: '여유롭게',
  },
  // 7. 하루 일정은 어떻게 보내시길 원하시나요?
  {
    questionType: '8. 새로운 만남에 대한 적극도',
    title1: '여행 중 ',
    title2: '새로운 사람들과의 만남',
    title3: '을 어떻게 즐기시나요?',
    questionTheme: 'tripNewPerson',
    type: 'row',
    answerSelect: 5,
    answer1: '소극적',
    answer2: '적극적',
  },
];

const Step5Screen = () => {
  const {handleStepNext, signupData, setSignupData} = useSignup();
  const [surveyStep, setSurveyStep] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const currentQuestion = questionList[surveyStep];

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
      tripLocationType,
      tripCompanionsType,
      tripActivityType,
      tripPlanningType,
      tripScheduleType,
      tripNewPerson,
    } = signupData.step4;

    switch (surveyStep) {
      case 0:
        return tripType !== 0;
      case 1:
        return tripReason !== 0;
      case 2:
        return tripLocationType !== 0;
      case 3:
        return tripCompanionsType !== 0;
      case 4:
        return tripActivityType !== 0;
      case 5:
        return tripPlanningType !== 0;
      case 6:
        return tripScheduleType !== 0;
      case 7:
        return tripNewPerson !== 0;
    }
  };

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (surveyStep + 1) / questionList.length,
      duration: 300, // 애니메이션 지속 시간 (ms)
      useNativeDriver: false, // width 애니메이션에는 false 설정
    }).start();
  }, [surveyStep]);

  const onClickPrevStep = () => {
    if (surveyStep > 0) {
      setSurveyStep(prev => prev - 1);
    } else {
      return;
    }
  };

  const onClickNextStep = () => {
    if (surveyStep < questionList.length - 1) {
      setSurveyStep(prev => prev + 1);
    } else {
      handleStepNext();
    }
  };

  return (
    <Animated.View style={{flex: 1}}>
      {/* 설문 유형 */}
      <View style={{marginTop: 5, paddingHorizontal: 30}}>
        <MText color={fcolor.lblue4}>{currentQuestion.questionType}</MText>
      </View>

      {/* 설문 Progress바 */}
      <View
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: fcolor.gray1,
          height: 3,
          marginVertical: 12,
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: fcolor.lblue4,
            height: 3,
          }}
        />
      </View>

      {/* 질문 */}
      <View style={{paddingHorizontal: 30}}>
        <SurveyItem
          question={currentQuestion}
          selectedValue={signupData.step4?.[currentQuestion.questionTheme]}
          surveyStep={surveyStep}
          handleSelect={handleSelect}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          paddingHorizontal: 30,
          flexDirection: 'row',
          gap: 20,
          bottom: 100,
        }}>
        {surveyStep > 0 ? (
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={[
                globalStyles.buttonBase,
                globalStyles.centered,
                {
                  flex: 1,
                  backgroundColor: fcolor.lblue3,
                },
              ]}
              onPress={onClickPrevStep}>
              <MText color={fcolor.lblue4}>이전</MText>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{flex: 1}}>
          <TouchableOpacity
            style={[
              globalStyles.buttonBase,
              globalStyles.centered,
              {
                flex: 1,
                backgroundColor: validationNext() ? fcolor.blue : fcolor.gray4,
              },
            ]}
            disabled={!validationNext()}
            onPress={onClickNextStep}>
            <MText color={fcolor.white}>다음</MText>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const SurveyItem = ({question, selectedValue, handleSelect}) => {
  return (
    <View style={{gap: 10, paddingTop: 30}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <BText fontSize={22}>{question.title1}</BText>
        <BText fontSize={22} color={fcolor.blue}>
          {question.title2}
        </BText>
        <BText fontSize={22}>{question.title3}</BText>
      </View>

      {question.type === 'row' ? (
        // 질문 선택이 row일 때
        <View>
          <View style={styles.checkboxRowGroup}>
            {Array.from({length: question.answerSelect}).map((_, index) => {
              const value = index + 1;
              return (
                <TouchableOpacity
                  key={`${question.questionTheme}-${index}`}
                  style={[
                    styles.checkbox,
                    globalStyles.centered,
                    selectedValue === value && styles.check,
                  ]}
                  onPress={() => handleSelect(question.questionTheme, value)}>
                  {selectedValue === value && (
                    <MaterialIcon name="check" size={18} color={fcolor.white} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={[
              styles.styleText,
              {
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              },
            ]}>
            <MText fontSize={14} color={fcolor.gray4}>
              {question.answer1}
            </MText>
            <MText fontSize={14} color={fcolor.gray4}>
              {question.answer2}
            </MText>
          </View>
        </View>
      ) : (
        // 질문 선택이 col일 때
        <View>
          <View style={styles.checkboxColGroup}>
            {Array.from({length: question.answerSelect}).map((_, index) => {
              const value = index + 1;
              return (
                <View
                  key={`${question.questionTheme}-${index}`}
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      globalStyles.centered,
                      selectedValue === value && styles.check,
                    ]}
                    onPress={() => handleSelect(question.questionTheme, value)}>
                    {selectedValue === value && (
                      <MaterialIcon
                        name="check"
                        size={18}
                        color={fcolor.white}
                      />
                    )}
                  </TouchableOpacity>
                  <View>
                    <MText fontSize={14} color={fcolor.gray4}>
                      {question.answer1[index]}
                    </MText>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxRowGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  },
  checkboxColGroup: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 15,
  },
  checkbox: {
    borderColor: fcolor.gray3,
    borderWidth: 1,
    borderRadius: 50,
    width: 28,
    height: 28,
    backgroundColor: fcolor.white,
  },
  check: {
    backgroundColor: fcolor.blue,
    borderColor: fcolor.gray3,
  },
});

export default Step5Screen;
