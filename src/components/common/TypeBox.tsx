import { StyleSheet, View } from 'react-native';
import fcolor from '../../assets/colors/fcolors';
import MText from './MText';

const TypeBox = ({name= ''}) => {
  return (

    <View style={styles.box}>
        <MText fontSize={10} color={fcolor.lblue4}>
         {name}
        </MText>
    </View>
  );
};

const styles = StyleSheet.create({
  box:{
    height:18,
    backgroundColor:fcolor.lblue2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    paddingHorizontal:4,
    paddingVertical:2,
  }
});

export default TypeBox;
