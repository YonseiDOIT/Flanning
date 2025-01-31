// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {
  // Alert,
  // AppRegistry,
  Image,
  StyleSheet,
  Text,
  // Text,
  Animated,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';
import FlanningV1Logo from 'src/assets/images/logo/flanning-logo-white-v1.svg';
import Video from 'react-native-video';
// import {storage} from 'src/utils/firebase';
import BText from 'src/components/common/BText';
import NeonGr from 'src/components/neongr';
import MText from 'src/components/common/MText';
import AuthProgress from '../auth/components/AuthProgress';
import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const introList = [
  {
    imgUrl: require('src/assets/images/intro/Calendar.png'),
    introDesc: (
      <BText fontSize={18}>
        <BText fontSize={18} color={fcolor.orange}>
          일정
        </BText>
        을{' '}
        <BText fontSize={18} color={fcolor.orange}>
          함께
        </BText>{' '}
        세우고
      </BText>
    ),
  },
  {
    imgUrl: require('src/assets/images/intro/Map.png'),
    introDesc: (
      <BText fontSize={18}>
        <BText fontSize={18} color={fcolor.orange}>
          동선
        </BText>
        을{' '}
        <BText fontSize={18} color={fcolor.orange}>
          확인
        </BText>{' '}
        하고
      </BText>
    ),
  },
  {
    imgUrl: require('src/assets/images/intro/Airplane.png'),
    introDesc: (
      <BText fontSize={18} color={fcolor.orange}>
        떠나고
      </BText>
    ),
  },
  {
    imgUrl: require('src/assets/images/intro/Camera.png'),
    introDesc: (
      <BText fontSize={18}>
        여행을{' '}
        <BText fontSize={18} color={fcolor.orange}>
          기록
        </BText>
        해요
      </BText>
    ),
  },
];

// 앱 실행시 보여지는 인트로 페이지
function IntroScreen({navigation}) {
  const [locationText, setLocationText] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const prevLocationRef = useRef('');
  const [modalVisible, setModalVisible] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  const flatListRef = useRef(null);

  // const svgMarkup = require('src/assets/images/logo/flanning-logo-white-v1.svg');

  //유저 코드
  // const {usercode, setUsercode} = useUser();

  //메인계획 코드
  // const {plancode, setPlancode} = usePlan();

  // const signInSubmit = async () => {
  //   // 로그인 함수
  //   const {email, password} = form;
  //   const info = {email, password};
  //   try {
  //     const {user} = await signIn(info);
  //     const {usercode, main} = await getUserid(email);
  //     setUsercode(usercode);
  //     setPlancode(main);
  //     console.log('main');
  //     if (main) {
  //       navigate('main1');
  //     } else {
  //       navigate('main');
  //     }
  //   } catch (e) {
  //     Alert.alert('로그인에 실패하였습니다.');
  //   }
  // };

  // //카카오로그인
  // const login = () => {
  //   KakaoLogin.login()
  //     .then(result => {
  //       console.log('로그인 성공', JSON.stringify(result));
  //       getProfile();
  //       navigate('main');
  //     })
  //     .catch(error => {
  //       if (error.code === 'E_CANCELLED_OPERATION') {
  //         console.log('로그인 취소', error.message);
  //       } else {
  //         console.log(`로그인 실패(code:${error.code})`, error.message);
  //       }
  //     });
  // };

  // //카카오 로그인을 firebase로
  // const getProfile = () => {
  //   KakaoLogin.getProfile()
  //     .then(result => {
  //       console.log('GetProfile Success', JSON.stringify(result));
  //       const email = result.email;
  //       const password = 'A!@' + result.id;
  //       onSubmit(email);
  //       firebaseAuth.createUserWithEmailAndPassword(email, password).then(
  //         success => {
  //           console.log(success);
  //         },
  //         fail => {
  //           console.log(fail);
  //         },
  //       );
  //     })
  //     .catch(error => {
  //       console.log(`GetProfile Fail(code:${error.code})`, error.message);
  //     });
  // };

  // const onSubmit = (email: string) => {
  //   console.log('파이어베이스 데이터 입력 성공!');
  //   createUser({
  //     // 회원 프로필 생성
  //     email: email,
  //   }).catch(error => {
  //     console.log('파이어베이스: ', error);
  //   });
  // };

  const checkIntroModal = async () => {
    try {
      // AsyncStorage.removeItem('introModalShown');
      const shown = await AsyncStorage.getItem('introModalShown');
      if (shown === null) {
        setModalVisible(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // AsyncStorage.removeItem('introModalShown');
    checkIntroModal();
  }, []);

  useEffect(() => {
    const locations = ['전주', '경주', '가평', '강릉', '원주', '평창', '춘천'];

    const startAnimation = () => {
      let randomLocation;
      do {
        randomLocation =
          locations[Math.floor(Math.random() * locations.length)];
      } while (randomLocation === prevLocationRef.current);

      prevLocationRef.current = randomLocation;
      setLocationText(randomLocation);

      // Fade-in 애니메이션
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        }, 4000);
      });
    };

    // 처음 1초 지연 후 시작
    const initialTimeout = setTimeout(() => {
      startAnimation();
      // 이후 주기적으로 실행
      const intervalId = setInterval(startAnimation, 6000); // 6초마다 업데이트
      return () => clearInterval(intervalId);
    }, 1000);

    return () => clearTimeout(initialTimeout);
  }, [fadeAnim]);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const step = Math.round(offsetX / width);
    setIntroStep(step);
  };

  const handleNextStep = async () => {
    if (introStep < introList.length - 1) {
      // 다음 슬라이드로 이동
      setIntroStep(introStep + 1);
      flatListRef.current?.scrollToIndex({
        index: introStep + 1,
        animated: true,
      });
    } else {
      // 마지막 슬라이드일 경우 모달 닫기
      setModalVisible(false);
      await AsyncStorage.setItem('introModalShown', 'true');
    }
  };

  return (
    <View style={styles.container}>
      {/* 배경 영상 */}
      <Video
        source={require('src/assets/videos/seoul-background.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode="cover"
      />
      {/* 배경 영상 오버레이 */}
      <View style={styles.overlay} />

      <View style={styles.loginContainer}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            flexDirection: 'row',
          }}>
          <Animated.Text
            style={{
              color: '#FFFFFF',
              fontSize: 24,
              fontWeight: '600',
              opacity: fadeAnim,
            }}>
            {`${locationText}에서 \n플래닝 어때요?`}
          </Animated.Text>

          {/* </Text> */}
          <FlanningV1Logo width={110} height={50} />
        </View>
        <TouchableOpacity
          style={styles.kakaobutton}
          // onPress={() => login()}
        >
          <Image
            style={{width: '100%', height: 30}}
            source={require('src/assets/images/kakao_login_large_wide.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginbutton}
          onPress={() => navigation.navigate('Signin')}>
          <Image
            style={{width: '100%', height: 30}}
            source={require('src/assets/images/email-login-btn.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.emailbutton}
          onPress={() => navigation.navigate('Signup', {screen: 'Step1'})}>
          <Text style={{fontSize: 16, color: '#878787', fontWeight: 600}}>
            이메일로 회원가입하기
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalContent}>
              <BText>
                <BText color={fcolor.blue}>플래닝</BText>과 계획을 세우고
              </BText>
              <NeonGr>
                <BText>여행을 떠나볼까요?</BText>
              </NeonGr>
              <View
                style={{
                  width: '100%',
                  paddingTop: 40,
                  paddingBottom: 20,
                  alignItems: 'center',
                  gap: 30,
                }}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: fcolor.gray1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 30,
                    borderRadius: 10,
                  }}>
                  <FlatList
                    ref={flatListRef}
                    data={introList}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    keyExtractor={(item, index) => `intro-${index}`}
                    renderItem={({item}) => (
                      <View style={styles.slideContainer}>
                        <Image style={styles.slideImage} source={item.imgUrl} />
                        {item.introDesc}
                      </View>
                    )}
                  />
                </View>
                <AuthProgress currentStep={introStep} />
              </View>
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  style={[
                    globalStyles.buttonBase,
                    {backgroundColor: fcolor.blue},
                  ]}
                  onPress={handleNextStep}>
                  <MText color={fcolor.white}>
                    {introStep < introList.length - 1
                      ? '다음으로'
                      : '플래닝 시작'}
                  </MText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

// 메인 컬러인 파란색 변수
const maincol = '#005bea';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 26,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
  },
  backgroundVideo: {
    position: 'absolute', // 화면 전체에 배경 비디오
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1, // 비디오가 UI 요소들 아래에 오도록 설정
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: 'auto',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검은색 오버레이
  },
  loginContainer: {
    gap: 14,
    marginBottom: Platform.OS === 'ios' ? 100 : 60,
  },
  loginbox: {
    marginTop: 16,
    height: 45,
    borderWidth: 1,
    borderColor: fcolor.gray1,
    borderRadius: 10,
    paddingLeft: 20,
    backgroundColor: fcolor.gray1,
  },
  kakaobutton: {
    backgroundColor: '#FEE500',
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginbutton: {
    backgroundColor: maincol,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailbutton: {
    backgroundColor: '#FFFFFF',
    height: 54,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#C7C7C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: '85%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  modalContent: {
    alignItems: 'flex-start',
    paddingBottom: 100,
  },
  slideContainer: {
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  slideImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default IntroScreen;
