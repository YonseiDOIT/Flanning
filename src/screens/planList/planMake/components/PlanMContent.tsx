import React from 'react';
import PlanStep1Screen from '../PlanStep1Screen';
import {usePlanM} from '../PlanMakeProvider';
import PlanStep2Screen from '../PlanStep2Screen';
import PlanStep3Screen from '../PlanStep3Screen';
import PlanStep4Screen from '../PlanStep4Screen';

const PlanMakeContent = ({navigation}) => {
  const {planMStep} = usePlanM();

  switch (planMStep) {
    case 0:
      return <PlanStep1Screen />;
    case 1:
      return <PlanStep2Screen />;
    case 2:
      return <PlanStep3Screen />;
    case 3:
      return <PlanStep4Screen navigation={navigation} />;
    default:
      return <PlanStep1Screen />;
  }
};

export default PlanMakeContent;
