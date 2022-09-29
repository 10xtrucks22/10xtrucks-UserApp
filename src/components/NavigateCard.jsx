import { View, Text, StyleSheet, KeyboardAvoidingView, KeyboardAvoidingViewComponent } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import userLocationStore from '../store/UserLocation';
import { useNavigation } from '@react-navigation/native';
import { GOOGLE_MAP_API_KEY } from '../config';
const NavigateCard = () => {
  const storeEndLocation = userLocationStore((state)=> state.setEndLocation);
  const storeEndDescription = userLocationStore((state)=> state.setEndDescription);
  const navigator = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`} >
      <Text style={tw`text-center py-5 text-xl`}>Good Morning,Ratul</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View >
        <GooglePlacesAutocomplete
          placeholder='Where to?'
          debounce={400}
          minLength={2}
          fetchDetails={true}
          returnKeyType={'search'}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            storeEndLocation(details.geometry.location)
            storeEndDescription(data.description)
            navigator.navigate('RideOptionCard');
          }}
          query={{
            key: GOOGLE_MAP_API_KEY,
            language: 'en',
          }}
          styles={toInputBoxStyles}
          nearbyPlacesAPI='GooglePlacesSearch'
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    paddingTop:10,
    flex:0,
  },
  textInput:{
    backgroundColor:'#DDDDDF',
    borderRadius:0,
    fontSize:18,
  },
  TextInputContainer:{
    paddingHorizontal:20,
    paddingBottom:0,
  }
});