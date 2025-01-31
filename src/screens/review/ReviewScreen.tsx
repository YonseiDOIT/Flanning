import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BottomBar from 'src/components/common/BottomBar';
import BText from 'src/components/common/BText';

// 리뷰 페이지 (미완성)
const ReviewScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <BText>여행 리뷰</BText>
      </ScrollView>
      <BottomBar />
    </View>
  );
};

export default ReviewScreen;
