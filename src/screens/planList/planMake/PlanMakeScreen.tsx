import React from 'react';
import {PlanMakeProvider} from './PlanMakeProvider';
import PlanMakeStack from './PlanMakeStack';

export type RootStackParam = {};

// 회원가입 스택
function PlanMakeScreen({navigation}) {
  return (
    <PlanMakeProvider>
      <PlanMakeStack navigation={navigation} />
    </PlanMakeProvider>
  );
}

export default PlanMakeScreen;
