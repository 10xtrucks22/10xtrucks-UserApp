import React, { useState } from "react";
import { View, Image, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Loading from "../components/Loading";
import { Formik } from "formik";
import * as Yup from "yup";
import {BASE_URL} from "../config/index"
import createAuthStore from "../store/AuthStore";
import axios from "axios";
import { textBlack, textDanger, textInfo, textPrimary, textRed, textWarning } from "../config/color";
export default function LoginScreen({ navigation }) {
  const setToken = createAuthStore((state) => state.setToken);
  const successLogin = createAuthStore((state) => state.successLogin);
  const OtpVerify = createAuthStore((state) => state.OtpVerify);
  const [error, setError] = useState(null);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./../assets/fonts/Roboto-Medium.ttf"),
  });


  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string()
          .min(4)
          .max(200, "Password should not exceed 200 chars.")
          .required(),
      })}
      onSubmit={async (values) => {
        

        try {
          await axios.post(`${BASE_URL}/api/user/login`,
          {
            username: values.email,
            password: values.password,
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            // console.log(res.data.data.token);
            setToken(res.data.data.token);
            successLogin();
          }
         
        })
        .catch((err) => {
          // console.log(err);
          setError(err.response.data.message);

        })

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
          <ScrollView>
          <KeyboardAvoidingView>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 36,
              fontWeight: "800",
              color: textBlack,
              marginBottom: 30,
              marginTop: 80,
              textAlign: "center",
             
            }}
          >
            Login
          </Text>

          <View>
            {error && (
              <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 20,
                fontWeight: "500",
                color: textDanger,
                marginBottom: 10,
                textAlign: "center",
              }}
              >
                {error}
              </Text>
            )}

            <View style={{ display: "flex", justifyContent:"center", flexDirection: "row",marginBottom:10,borderRadius:"10" }}>
              <TextInput
                style={{ width: "75%" }}
                label="Email"
                mode="outlined"
                selectTextOnFocus={true}
                placeholder="Enter your email"
                placeholderTextColor="black"
                keyboardType="web-search"
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                value={values.email}
              />
            </View>

            {touched.email && errors.email && (
              <Text
                style={{ fontSize: 12, color: textRed, textAlign: "center" }}
              >
                {errors.email}
              </Text>
            )}

            <View style={{ display: "flex", justifyContent:"center", flexDirection: "row",borderRadius:"10" }}>
              <TextInput
                style={{ width: "75%" }}
                label="Password"
                mode="outlined"
                placeholder="Enter your password"
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                value={values.password}
              />
            </View>
            {touched.password && errors.password && (
              <Text
                style={{ fontSize: 12, color: textRed, textAlign: "center" }}
              >
                {errors.password}
              </Text>
            )}
            <View
              style={{ alignItems: "flex-start", marginTop: 0, marginBottom: 15 }}
            >
              <Button
                style={{ width: "75%", marginTop: 10, fontWeight: 900 }}
                color={textBlack}
                mode="text"
                onPress={() => navigation.navigate("ForgotPasswordPhone")}
              >
                Forgot Password? 
              </Button> 
            </View>

            <View
              style={{ alignItems: "center", marginTop: 20, marginBottom: 30 }}
            >
              <Button
                style={{ width: "50%" }}
                mode="contained"
                onPress={handleSubmit}
                color={textBlack}
              >
                Login
              </Button>
            </View>
           
            <View
              style={{ flexDirection:"row", justifyContent:"center", alignItems: "center", marginTop: 30, marginBottom: 30 }}
            >
              <Text style={{ fontSize: 16, color: textBlack,fontWeight:"bold" }}>
               No Account ?
              </Text>
              <Button
                color={textRed}
                mode="text"
                onPress={() => OtpVerify === true ? navigation.navigate("Register")  : navigation.navigate("Otp")}
              >
                Sign UP
              </Button>
            </View>
          </View>
          </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
}