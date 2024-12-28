import {StyleSheet} from 'react-native';
import fcolor from '../colors/fcolors';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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
});

export default commonStyles;
