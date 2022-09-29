import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "twrnc";
import { Button, Dialog, IconButton, Paragraph, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Loading from "../components/Loading";
import { Formik } from "formik";
import * as Yup from "yup";
import createAuthStore from "../store/AuthStore";
import axios from "axios";
import { BASE_URL, GOOGLE_MAP_API_KEY } from "../config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { TouchableOpacity } from "react-native-web";
import { Checkbox } from 'react-native-paper';
import { Inter_100Thin } from "@expo-google-fonts/inter";
import { black, secondary, textRed, white } from "../config/color";

export default function NewPackageScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [startDescription, setStartDescription] = useState("");
  const [endDescription, setEndDescription] = useState("");
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
  const [travelInfo, setTravelInfo] = useState(null);
  const token = createAuthStore((state) => state.token);
  const [weight, setWeight] = useState(null);
  const [notes, setNotes] = useState(null);

  const [fastload, setFastload] = useState(false);
  const [stackable, setStackable] = useState(false);
  const [dockLevel, setDockLevel] = useState(false);
  const [hazardous, setHazardous] = useState(false);
  const [pieces, setPieces] = useState(null);
  const [dims, setDims] = useState(null);



  const showAlert = ({ title, message }) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Go To Home",
          onPress: () => {
            navigation.navigate("Home")
          },
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          console.log("dismissed")
          navigation.navigate("Home")
        }

      }
    );



  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!startLocation || !endLocation) return;
      const getTravelTime = async () => {
        try {
          // console.log(startDescription);
          // console.log(endDescription);
          await axios
            .get(
              `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startDescription}&destinations=${endDescription}&key=${GOOGLE_MAP_API_KEY}`
            )
            .then((res) => {
              if (res.data) {
                if (res.data.rows[0].elements[0].status === "OK") {
                  let value = res.data.rows[0].elements[0].distance.value;
                  let data = value / 1609 * 1;
                  setDistance(value / 1609);
                  setPrice(data);
                  setTravelInfo(res.data.rows[0].elements[0]);
                  // console.log(res.data.rows[0].elements[0].distance.value)
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } catch {
          console.log("error");
        }
      };
      getTravelTime();
    }

    return () => {
      mounted = false;
    };
  }, [startDescription, endDescription, GOOGLE_MAP_API_KEY]);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  const handleSubmit = async () => {
    try {
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const url = `${BASE_URL}/api/user/packages`;
      // console.log(url)
      const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      };
      const data = new FormData();
      data.append("start_location", startDescription);
      data.append("s_latitude", startLocation.lat);
      data.append("s_longitude", startLocation.lng);
      data.append("end_location", endDescription);
      data.append("d_latitude", endLocation.lat);
      data.append("d_longitude", endLocation.lng);
      data.append("distance", distance);
      data.append("total", price);
      data.append("weight", weight);
      data.append("notes", notes);
      data.append("stackable", stackable);
      data.append("dock_level", dockLevel);
      data.append("hazardous", hazardous);
      data.append("fastload", fastload);
      data.append("pieces", pieces);
      data.append("dims", dims);


      // console.log(data);

      const response = await axios({
        method: "post",
        url: url,
        data: data,
        headers: header,
      });

      // console.log(response.data);

      if (response.data.success === true) {
        showAlert({ title: "Success", message: response.data.message })
      } else {
        showAlert({ title: "Error", message: response.data.message })
      }

      // const response = await axios.post(url, data, header)

      // console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  // console.log(token);

  return (
    <Formik
      initialValues={{
        notes: "",
        weight: "",
        pieces: "",
        dims:"",
      }}
      validationSchema={Yup.object().shape({
        weight: Yup.string().required("Please enter your weight"),
        pieces: Yup.string().required("Please enter your pieces"),
        dims: Yup.string().required("Please enter your dims"),
      })}
      onSubmit={async (values) => {
        setWeight(values.weight);
        setNotes(values.notes);
        setPieces(values.pieces);
        setDims(values.dims);
        await handleSubmit();
      }}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <KeyboardAvoidingView style={{ flex: 1, justifyContent: "flex-start" }}>
            <View style={{ flex: 1,marginTop:30, backgroundColor: "#fff"   }}>
              <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}
                nestedScrollEnabled={true}
              >

                <View style={tw`px-4`}>
                  {error && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: textRed,
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </Text>
                  )}
                  <View>
                    <Text style={tw`text-sm pb-2 font-bold`}>Pick Up At:</Text>
                    <ScrollView
                      horizontal={true}
                      nestedScrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      keyboardShouldPersistTaps='handled'
                      contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                      
                      }}
                    >
                    <View
                      style={{
                        width: "100%",
                      }}
                      >
                      <GooglePlacesAutocomplete
                        placeholder={
                          startDescription ? startDescription : "Pick Up Location"
                        }
                        debounce={200}
                        styles={toInputBoxStyles}
                        onPress={(data, details = null) => {
                          setStartLocation(details.geometry.location);
                          setStartDescription(data.description);
                        }}
                        fetchDetails={true}
                        minLength={2}
                        enablePoweredByContainer={false}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        query={{
                          key: GOOGLE_MAP_API_KEY,
                          language: "en",
                        }}
                      />
                    </View>

                    </ScrollView>
                  </View>

                  <View>
                  <Text style={tw`text-sm pb-2 font-bold`}>Deliver To:</Text>
                    <ScrollView
                      horizontal={true}
                      nestedScrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      keyboardShouldPersistTaps='handled'
                      contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                      
                      }}
                    >
                    <View
                      style={{
                        width: "100%",
                      }}
                      >

                      <GooglePlacesAutocomplete
                        placeholder={
                          endDescription ? endDescription : "Deliver Location"
                        }
                        debounce={200}
                        styles={toInputBoxStyles}
                        onPress={(data, details = null) => {
                          setEndLocation(details.geometry.location);
                          setEndDescription(data.description);
                        }}
                        fetchDetails={true}
                        minLength={2}
                        enablePoweredByContainer={false}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        query={{
                          key: GOOGLE_MAP_API_KEY,
                          language: "en",
                        }}
                       
                      />
                      </View>
                    </ScrollView>

                  </View>

                  <View style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={tw`text-sm pb-2 font-bold`}>Notes:</Text>
                    <TextInput
                      multiline={true}
                      numberOfLines={6}
                      style={tw`mb-2 w-full`}
                      label="Notes"
                      mode="flat"
                      selectTextOnFocus={true}
                      placeholder="Enter your Notes"
                      placeholderTextColor="black"
                      keyboardType="default"
                      onChangeText={handleChange("notes")}
                      onBlur={() => setFieldTouched("notes")}
                      value={values.notes}
                    />
                  </View>


                  {touched.notes && errors.notes && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: textRed,
                        textAlign: "center",
                      }}
                    >
                      {errors.notes}
                    </Text>
                  )}


                  {touched.dims && errors.dims && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: textRed,
                        textAlign: "center",
                      }}
                    >
                      {errors.dims}
                    </Text>
                  )}
       

                  {touched.pieces && errors.pieces && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: textRed,
                        textAlign: "center",
                      }}
                    >
                      {errors.pieces}
                    </Text>
                  )}

                  {touched.weight && errors.weight && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: textRed,
                        textAlign: "center",
                      }}
                    >
                      {errors.weight}
                    </Text>
                  )}

                  <View style={tw`flex flex-row mt-2 mb-3`}>
                  <View style={tw`flex mt-2 mr-3`}>
                      
                    <Text style={tw`pb-2 font-bold text-sm`}>
                      Distance : 
                    </Text> 
                    <Text style={tw`pb-2 font-bold  p-5 border-2`}>
                    {travelInfo?.distance.text}
                    </Text>

                  </View>
                  <View style={tw`flex mt-2 mr-3`}>
                  <Text style={tw`pb-2 font-bold text-sm`}>
                      Weight : 
                    </Text> 
                  <TextInput
                      style={tw`mb-2 w-20`}
                      // label="weight"
                      mode="flat"
                      selectTextOnFocus={true}
                      keyboardType="default"
                      onChangeText={handleChange("weight")}
                      onBlur={() => setFieldTouched("weight")}
                      value={values.weight}
                    />
                    </View>
                    <View style={tw`flex mt-2 mr-3`}>
                  <Text style={tw`pb-2 font-bold text-sm`}>
                      Pieces : 
                    </Text> 
                  <TextInput
                      style={tw`mb-2 w-20`}
                      // label="weight"
                      mode="flat"
                      selectTextOnFocus={true}
                      keyboardType="default"
                      onChangeText={handleChange("pieces")}
                      onBlur={() => setFieldTouched("pieces")}
                      value={values.pieces}
                    />
                    </View>
                    <View style={tw`flex mt-2 mr-3`}>
                  <Text style={tw`pb-2 font-bold text-sm`}>
                      Dims : 
                    </Text> 
                  <TextInput
                      style={tw`mb-2 w-20`}
                      // label="weight"
                      mode="flat"
                      selectTextOnFocus={true}
                      keyboardType="default"
                      onChangeText={handleChange("dims")}
                      onBlur={() => setFieldTouched("dims")}
                      value={values.dims}
                    />
                    </View>
                  </View>

                  <View>
                    <Checkbox.Item color="blue" label="Stackable"
                      status={stackable ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setStackable(!stackable);
                      }}
                      style={{
                        backgroundColor: white,
                        zIndex: 1,
                        borderWidth: 1,
                        marginBottom:15,
                        borderColor: black
                      }} />
                  </View>
                  <View>
                    <Checkbox.Item color="blue" label="Hazardous"
                      status={hazardous ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setHazardous(!hazardous);
                      }}
                      style={{
                        backgroundColor: white,
                        zIndex: 1,
                        borderWidth: 1,
                        marginBottom:15,
                        borderColor: black
                      }} />
                  </View>
                  <View>
                    <Checkbox.Item color="blue" label="Fast Load"
                      status={fastload ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setFastload(!fastload);
                      }}
                      style={{
                        backgroundColor: white,
                        zIndex: 1,
                        borderWidth: 1,
                        marginBottom:15,
                        borderColor: black,
                      }} />
                  </View>
                  <View>
                    <Checkbox.Item color="blue" label="Dock Level"
                      status={dockLevel ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setDockLevel(!dockLevel);
                      }}
                      style={{
                        backgroundColor: white,
                        zIndex: 1,
                        borderWidth: 1,
                        marginBottom:15,
                        borderColor: black
                      }} />
                  </View>

                  <View>
                    <Checkbox.Item color="blue" label="Cash On Delivery" status="checked" style={{
                      marginBottom:15,
                      backgroundColor: white,
                      zIndex: 1,
                      borderWidth: 1,
                      marginBottom:15,
                      borderColor: black
                    }} />
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                      marginTop: 30,
                      marginBottom: 30,
                    }}
                  >
                    <Button
                      style={{ width: "50%" }}
                      color={secondary}
                      mode="contained"
                      onPress={handleSubmit}
                    >
                      Submit
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </View>
        </KeyboardAvoidingView>
      )}
    </Formik>

  );
}

const toInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    fontFamily: "Roboto-Medium",
    borderRadius: 0,
    padding: 20,
    fontSize: 16,
    width: "100%",
    // height: 40,
  },
  textInputContainer: {
    paddingHorizontal: 0,
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
    backgroundColor: white,
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
