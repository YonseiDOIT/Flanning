// @ts-nocheck
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import BText from 'src/components/common/BText';
import fcolor from 'src/assets/colors/fcolors';
import RText from 'src/components/common/RText';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const LocationItem = ({location, idx, lastLocationIdx, isActive, onPress}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        flexDirection: 'column',
        marginBottom: 20,
        gap: 5,
      }}>
      <View style={{flexDirection: 'row', gap: 10, marginLeft: 8}}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          }}>
          <View
            style={{
              width: 24,
              height: 24,
              backgroundColor: isActive ? fcolor.blue : fcolor.lblue4,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
            }}>
            <BText fontSize={14} color={fcolor.white}>
              {idx}
            </BText>
          </View>
          <RText color={fcolor.gray4} fontSize={9}>
            {location.time}
          </RText>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <BText fontSize={18}>{location.locationTitle}</BText>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: fcolor.lblue2,
                  borderRadius: 6,
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                }}>
                <RText color={fcolor.lblue4}>{location.locationType}</RText>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  location.state === 0 ? fcolor.orange2 : fcolor.green2,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 6,
                borderWidth: 1,
                borderColor:
                  location.state === 0 ? fcolor.orange : fcolor.green3,
                marginRight: 10,
              }}>
              <BText
                fontSize={13}
                color={location.state === 0 ? fcolor.orange : fcolor.green3}>
                {location.state === 0 ? '예약 전' : '예약 완료'}
              </BText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 14, marginLeft: 8}}>
        <View
          style={{
            width: 24,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
          {lastLocationIdx !== idx ? (
            <>
              <View
                style={{
                  backgroundColor: fcolor.lblue1,
                  width: 1,
                  flex: 1,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: fcolor.white,
                }}>
                <RText fontSize={8} color={fcolor.lblue4}>
                  {location.distanceToNext}
                </RText>
              </View>
            </>
          ) : null}
        </View>
        <View
          style={{
            backgroundColor: fcolor.gray5,
            borderColor: fcolor.gray1,
            borderWidth: 1,
            justifyContent: 'center',
            padding: 10,
            borderRadius: 8,
            flex: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <MaterialIcon
              name="directions-bus-filled"
              size={24}
              color={fcolor.gray3}
            />
            <RText fontSize={13} color={fcolor.gray4}>
              322 (한라수목원)(삼양종점-한라수목원)
            </RText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LocationItem;
