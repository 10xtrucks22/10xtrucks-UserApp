import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { useNavigation } from "@react-navigation/native";
import Map from "../components/Map";
import userLocationStore from "../store/UserLocation";
import { GOOGLE_MAP_API_KEY } from "../config";
const UserMapScreen = () => {
  const navigation = useNavigation();
  const origin = userLocationStore((state) => state.startLocation);
  const destination = userLocationStore((state) => state.endLocation);
  const startDescription = userLocationStore((state) => state.startDescription);
  const endDescription = userLocationStore((state) => state.endDescription);
  const storeStartLocation = userLocationStore((state)=> state.setStartLocation);
  const storeEndLocation = userLocationStore((state)=> state.setEndLocation);
  const setDescription = userLocationStore((state)=> state.setStartDescription);
  const setEndDescription = userLocationStore((state)=> state.setEndDescription);

  // console.log(startDescription);

  return (
    <>
      {/* <View style={styles.profContainer}>
        <Image
          style={{
            width: 30,
            height: 30,
            resizeMode: "cover",
            borderRadius: 50 / 2,
          }}
          source={require("../img/prof1.jpg")}
        />
        <Text style={tw`pl-2`}>For John</Text>
      </View> */}
      <View style={tw`min-w-full pb-5 bg-white`}>
        <GooglePlacesAutocomplete
          placeholder={
            startDescription != null ? startDescription : "Pickup Location"
          }
          styles={toInputBoxStyles}
          nearbyPlacesAPI="GooglePlacesSearch"
          enablePoweredByContainer={false}
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            storeStartLocation(details.geometry.location);
            setDescription(data.description);
          }}
          query={{
            key: GOOGLE_MAP_API_KEY,
            language: "en",
          }}
          debounce={400}
        />
        <GooglePlacesAutocomplete
          placeholder={
            endDescription != null ? endDescription : "Where to?"
          }
          styles={toInputBoxStyles}
          nearbyPlacesAPI="GooglePlacesSearch"
          enablePoweredByContainer={false}
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            storeEndLocation(details.geometry.location);
            setEndDescription(data.description);
          }}
          query={{
            key: GOOGLE_MAP_API_KEY,
            language: "en",
          }}
          debounce={400}
        />
      </View>
      <View style={tw`h-full`}>
        <Map />
      </View>
      <View style={styles.confirmLocation}>
        <TouchableOpacity
          onPress={() => {
            if (origin != null && destination != null) {
              navigation.navigate("RideOptions");
            }
          }}
          style={tw`bg-black h-full items-center justify-center w-9/12`}
        >
          <View>
            <Text style={tw`text-white text-lg`}>Confirm Destinations</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UserMapScreen;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 5,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 16,
    height: 40,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
const styles = StyleSheet.create({
  profContainer: {
    width: "100%",
    paddingTop: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: "10%",
    backgroundColor: "#fff",
  },
  confirmLocation: {
    position: "absolute",
    zIndex: 1,
    bottom: 70,
    width: "100%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
});
