import {Platform, StyleSheet} from 'react-native';
import fcolor from '../colors/fcolors';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 30,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: fcolor.white,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBase: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBase: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: fcolor.gray1,
    fontSize: 14,
  },
  shadowBase: {
    shadowColor: fcolor.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
});

export default commonStyles;
