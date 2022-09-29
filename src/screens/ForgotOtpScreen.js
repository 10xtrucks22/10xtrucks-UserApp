import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Loading from "../components/Loading";
import { Formik } from "formik";
import * as Yup from "yup";
import createAuthStore from "../store/AuthStore";
import { BASE_URL } from "../config";
import axios from "axios";

export default function ForgotOtpScreen({ navigation }) {
  const [error, setError] = useState(null);
  const ForgotPhone = createAuthStore((state) => state.ForgotPhone);
  const successForgotPasswordVerify = createAuthStore((state) => state.successForgotPasswordVerify);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <Formik
      initialValues={{ otp: ""}}
      validationSchema={Yup.object().shape({
        otp: Yup.string().required("Otp is required"),
      
      })}
      onSubmit={async (values) => {
        try{
          await axios.post(
              `${BASE_URL}/api/otp/verify`,
              {
                phone_no: ForgotPhone,
                otp: values.otp,
              }
            )
            .then((res) => {
              if (res.data.success) {
                successForgotPasswordVerify();
                navigation.navigate("ForgotPassword");
              }
            })
            .catch((err) => {
              console.log(err);
              setError(err.response.data.message);
            });
          }catch{
            setError("Something went wrong");
          }
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
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./../assets/images/logo.png")}
              style={{ width: 300, height: 100, marginBottom: 30 }}
            />
          </View>

          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 20,
              fontWeight: "500",
              color: "blue",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            Please Enter Your Otp
          </Text>


          <View>
            {error && (
              <Text
                style={{ fontSize: 12, color: "#FF0D10", textAlign: "center" }}
              >
                {error}
              </Text>
            )}

            <View style={{ display: "flex", flexDirection: "row" }}>
              <IconButton icon="key" size={30}  color="#03baab"  />
              <TextInput
                style={{ width: "80%" }}
                label="Otp"
                mode="flat"
                keyboardType="phone-pad"
                placeholder="Enter your otp"
                placeholderTextColor="black"
                onChangeText={handleChange("otp")}
                onBlur={() => setFieldTouched("otp")}
                value={values.otp}
              />
            </View>
            {touched.otp && errors.otp && (
              <Text
                style={{ fontSize: 12, color: "#FF0D10", textAlign: "center" }}
              >
                {errors.otp}
              </Text>
            )}

            <View
              style={{ alignItems: "center", marginTop: 30, marginBottom: 30 }}
            >
              <Button
                style={{ width: "50%" }}
                icon="login"
                mode="contained"
                onPress={handleSubmit}
                color="#5071F1"
              >
                Continue
              </Button>
            </View>
            <View
              style={{ alignItems: "center", marginTop: 30, marginBottom: 30 }}
            >
              <Text style={{ fontSize: 16, color: "#333" }}>
                Already have an account?{" "}
                </Text>
              <Button
                style={{ width: "50%" }}
                icon="login"
                mode="text"
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Button>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}
