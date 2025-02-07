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

const travelTypeList = {
  '설악산 등반형': {
    type: '설악산 등반형',
    title: '새로운 경험이라면 무엇이든 설레!',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          액티비티와 자연 탐험을 좋아하는 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          낯선 환경에서 새로운 도전에 끌리는 편입니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_1.png'),
  },
  '불국사 탐방형': {
    type: '불국사 탐방형',
    title: '이 여행지만의 색깔이 궁금해!',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          그 지역만의 문화를 나만의 스타일로 즐기는 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          남들이 다 가는 곳보다는 새로운 나만의 장소를 찾고 싶답니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_2.png'),
  },
  '대관령 숲멍형': {
    type: '대관령 숲멍형',
    title: '차분한 곳에서 휴식을 즐기고 싶어~',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          평화로운 곳에서 여행을 즐기고 싶은 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          사람이 많은 곳보다 한적한 곳에서 휴식을 취하는 편입니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_3.png'),
  },
  '한강공원 토크형': {
    type: '한강공원 토크형',
    title: '혼자보다는 함께할 때 더 즐거워!',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          여행 동행자와 끈끈한 관계를 형성하기를 원하는 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          새로운 사람들을 만날 수 있는 이벤트, 파티를 즐기는 편입니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_4.png'),
  },
  '광안리 셀럽형': {
    type: '광안리 셀럽형',
    title: '요즘 여기가 그렇게 핫하다던데?',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          인기장소와 최신 트렌드에 민감한 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          SNS에 여행 경험을 공유하는 걸 중요하게 생각하고,
        </MText>
        <MText color={fcolor.gray4}>멋진 '인증샷' 촬영도 즐긴답니다.</MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_5.png'),
  },
  '올레길 완주형': {
    type: '올레길 완주형',
    title: '계획대로 알차게! 오늘도 가보자고!',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>계획된 일정에 따르는 여행자예요!</MText>
        <MText color={fcolor.gray4}>
          여행지의 다양한 장소를 많이 방문하고자 합니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_6.png'),
  },
  '남해 섬 유랑형': {
    type: '남해 섬 유랑형',
    title: '지금 여행 가자고? 오히려 좋아~',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>즉흥적으로 여행을 즐기는 여행자예요!</MText>
        <MText color={fcolor.gray4}>
          계획에 얽매이지 않고, 예기치 않은 이벤트와 활동을 통해
        </MText>
        <MText color={fcolor.gray4}>
          활력을 느끼며 새로운 경험을 만끽한답니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_7.png'),
  },
  '낙동강 유영형': {
    type: '낙동강 유영형',
    title: '나는 뭐든 좋아~ 너의 선택에 맡길게!',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          어떤 여행이든 즐길 수 있는 융통성 있는 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          주변 사람들과 상황에 잘 맞춰 여행을 즐기고,
        </MText>
        <MText color={fcolor.gray4}>
          변화하는 계획도 즐겁게 받아들이며 여행을 즐긴답니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_8.png'),
  },
};

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

  const onClickNextStep = async () => {
    if (surveyStep < questionList.length - 1) {
      setSurveyStep(prev => prev + 1);
    } else {
      console.log('signupData', signupData);
      try {
        const typeSurvey = {
          Q1: signupData.step4.tripType,
          Q2: signupData.step4.tripReason,
          Q3: signupData.step4.tripLocationType,
          Q4: signupData.step4.tripCompanionsType,
          Q5: signupData.step4.tripActivityType,
          Q6: signupData.step4.tripPlanningType,
          Q7: signupData.step4.tripScheduleType,
          Q8: signupData.step4.tripNewPerson,
        };

        const response = await fetch('http://127.0.0.1:8000/predictionType', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(typeSurvey),
        });
        const data = await response.json();

        if (data) {
          const resultType = travelTypeList[data.predicted_type];

          setSignupData(prev => ({
            ...prev,
            step5: {
              type: resultType.type,
              title: resultType.title,
              description: resultType.description,
              img: resultType.img,
            },
          }));
          if (response) {
            handleStepNext();
          }
        }
      } catch (error) {
        console.error('회원가입 실패:', error);
      }
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
