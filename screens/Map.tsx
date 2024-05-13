import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const LATITUDE = 37.33;
const LONGITUDE = -122;
const LATITUDE_DELTA = 2;
const LONGITUDE_DELTA = 2;

const Map = () => {
  return (
    <View style={{flex:1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        region={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onMapReady={() => console.log('Map is ready.')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width:'100%',
    height:'100%'
  },
});
export default Map;