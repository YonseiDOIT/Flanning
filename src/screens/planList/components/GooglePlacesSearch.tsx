// import {v4 as uuidv4} from 'uuid';
import React, {useRef} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MText from 'src/components/common/MText';
import Config from 'react-native-config';
import fcolor from 'src/assets/colors/fcolors';

const GOOGLE_PLACES_API_KEY = Config.GOOGLE_PLACES_API_KEY;

const GooglePlacesSearch = ({
  onPlaceSelected,
}: {
  onPlaceSelected: (details: any) => void;
}) => {
  const ref = useRef();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{flex: 1}}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="장소를 검색해보세요"
        onPress={(data: any, details = null) => {
          if (details) {
            const place = {
              locationTitle: details.name,
              location: details.formatted_address,
              locationType: details.types[0],
              locationMap: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
            };
            ref.current?.setAddressText(details.name);
            onPlaceSelected(place);
          }
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'ko',
          components: 'country:kr',
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        renderRow={(data: any) => (
          <View style={styles.suggestionRow}>
            <View style={styles.textContainer}>
              <MText fontSize={16} color={fcolor.black}>
                {data.structured_formatting.main_text}
              </MText>
              <MText fontSize={14} color={fcolor.gray4}>
                {data.structured_formatting.secondary_text}
              </MText>
            </View>
          </View>
        )}
        textInputProps={{
          placeholder: '장소를 검색해보세요',
          autoFocus: true,
        }}
        styles={{
          textInput: {
            backgroundColor: fcolor.gray1,
            height: 50,
            paddingHorizontal: 16,
            borderRadius: 8,
            fontSize: 16,
          },
          listView: {
            backgroundColor: fcolor.white,
            borderRadius: 8,
            marginTop: 8,
            maxHeight: Platform.OS === 'ios' ? '80%' : undefined,
          },
          separator: {
            height: 1,
            backgroundColor: fcolor.gray1,
          },
          row: {
            padding: 0,
          },
        }}
        minLength={2}
        debounce={200}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
});

export default GooglePlacesSearch;
