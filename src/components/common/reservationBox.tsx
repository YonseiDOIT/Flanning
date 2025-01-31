import { StyleSheet, View } from 'react-native';
import fcolor from '../../assets/colors/fcolors';
import MText from './MText';

const ReservationBox = ({state}) => {
    
    return (
        <View>
        {state?
            <View style={[styles.box,styles.green]}>
                <MText fontSize={10} color='#A5D300' style={{fontWeight:'bold'}}>
                    예약 완료
                </MText>
            </View>
            :
            <View style={[styles.box,styles.orange]}>
                <MText fontSize={10} color={fcolor.orange} style={{fontWeight:'bold'}}>
                예약 전
                </MText>
            </View>
        }
        </View>
    );
};

const styles = StyleSheet.create({
  box:{
    width:56,
    height:20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4
  },
  green:{
    backgroundColor:'#F8FFDC',
    borderColor:'#A5D300',
    borderWidth:1
  },
  orange:{
    backgroundColor:'#FEF3EA',
    borderColor:fcolor.orange,
    borderWidth:1
  }
});

export default ReservationBox;
