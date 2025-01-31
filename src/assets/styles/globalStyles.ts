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
<<<<<<< HEAD
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
=======
  backBase:{
    flex:1,
    backgroundColor:fcolor.white
  }
  
>>>>>>> 2d1daedf0e60025900be4eb767056e9bd96ab459
});

export default commonStyles;
