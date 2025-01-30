import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import fcolor from 'src/assets/colors/fcolors';

type Props = {};

const PlusButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.buttonContainer,
        {
          marginBottom: Platform.OS === 'ios' ? 100 : 80,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
            },
            android: {
              elevation: 3,
            },
          }),
        },
      ]}>
      <EntypoIcon name="plus" size={40} color={fcolor.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    padding: 6,
    borderRadius: 200,
    backgroundColor: fcolor.blue,
  },
});

export default PlusButton;
