// @ts-check
import * as tf from '@tensorflow/tfjs';
import {bundleResourceIO} from '@tensorflow/tfjs-react-native';

const modelJSON = require('src/assets/models/travel_model_js/model.json');
const modelWeights = require('src/assets/models/travel_model_js/group1-shard1of1.bin');

export const initializeTensorFlow = async () => {
  try {
    await tf.ready();
    console.log('TensorFlow.js is ready');
  } catch (e) {
    console.error('TensorFlow.js 초기화 실패 : ', e);
  }
};

export const loadTravelModel = async () => {
  try {
    // console.log(modelJSON);
    // console.log(modelWeights);
    // await tf.loadGraphModel(bundleResourceIO(modelJSON, modelWeights));
    console.log('여행자 모델 로드 완료!');
  } catch (e) {
    console.error('여행자 모델 로드 에러 : ', e);
  }
};
