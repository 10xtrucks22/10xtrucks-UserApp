import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Loading from "../components/Loading";
import { Formik } from "formik";
import * as Yup from "yup";
import createAuthStore from "../store/AuthStore";
import axios from "axios";
import { BASE_URL } from "../config";
import { textBlack, textRed } from "../config/color";
export default function RegisterScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./../assets/fonts/Roboto-Bold.ttf"),
  });

  const setPhone = createAuthStore((state) => state.setPhone);
  const removeOtpVerify = createAuthStore((state) => state.removeOtpVerify);
  const phone = createAuthStore((state) => state.phone);
  const successLogin = createAuthStore((state) => state.successLogin);
  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone: phone,
        password: "",
        role: "user",
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string()
          .max(30, "Must be 50 characters or less")
          .required("Please enter your first name"),
        last_name: Yup.string()
          .max(30, "Must be 50 characters or less")
          .required("Please enter your last name"),
        username: Yup.string()
          .max(30, "Must be 50 characters or less")
          .required("Please enter your username"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Please enter your email"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Please enter your password"),
      })}
      onSubmit={async (values) => {
        try {
          await axios
            .post(`${BASE_URL}/api/register`, {
              first_name: values.first_name,
              last_name: values.last_name,
              username: values.username,
              email: values.email,
              phone: values.phone,
              password: values.password,
              role: values.role,
            })
            .then((res) => {
              if (res.data.success) {
                removeOtpVerify();
                setPhone(null);
                navigation.navigate("Login");
              }
            })
            .catch((err) => {
              // console.log(err.response.data);
              setError(err.response.data.error.error_message);
            });
        } catch {
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
                  fontFamily: "Roboto-Bold",
                  fontSize: 32,
                  fontWeight: "900",
                  color: textBlack,
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                Register
              </Text>

              <View>
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

                <View style={{ display: "flex", justifyContent: "center", flexDirection: "row", marginBottom: 15, borderRadius: "10" }}>

                  <TextInput
                    style={{ width: "70%" }}
                    label="First Name"
                    mode="flat"
                    selectTextOnFocus={true}
                    placeholder="Enter your First Name"
                    placeholderTextColor="black"
                    keyboardType="default"
                    onChangeText={handleChange("first_name")}
                    onBlur={() => setFieldTouched("first_name")}
                    value={values.first_name}
                  />
                </View>

                {touched.first_name && errors.first_name && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: textRed,
                      textAlign: "center",
                    }}
                  >
                    {errors.first_name}
                  </Text>
                )}

                <View style={{ display: "flex", justifyContent: "center", flexDirection: "row", marginBottom: 10, borderRadius: "10" }}>

                  <TextInput
                    style={{ width: "70%" }}
                    label="Last Name"
                    mode="flat"
                    selectTextOnFocus={true}
                    placeholder="Enter your Last Name"
                    placeholderTextColor="black"
                    keyboardType="default"
                    onChangeText={handleChange("last_name")}
                    onBlur={() => setFieldTouched("last_name")}
                    value={values.last_name}
                  />
                </View>

                {touched.last_name && errors.last_name && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: textRed,
                      textAlign: "center",
                    }}
                  >
                    {errors.last_name}
                  </Text>
                )}

                <View style={{ display: "flex", justifyContent:"center", flexDirection: "row",marginBottom:10,borderRadius:"10" }}>
            
                  <TextInput
                    style={{ width: "70%" }}
                    label="username"
                    mode="flat"
                    selectTextOnFocus={true}
                    placeholder="Enter your username"
                    placeholderTextColor="black"
                    keyboardType="default"
                    onChangeText={handleChange("username")}
                    onBlur={() => setFieldTouched("username")}
                    value={values.username}
                  />
                </View>

                {touched.username && errors.username && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: textRed,
                      textAlign: "center",
                    }}
                  >
                    {errors.username}
                  </Text>
                )}

                <View style={{ display: "flex", justifyContent:"center", flexDirection: "row",marginBottom:10,borderRadius:"10" }}>
            
            <TextInput
              style={{ width: "70%" }}
                    label="Email"
                    mode="flat"
                    selectTextOnFocus={true}
                    placeholder="Enter your email"
                    placeholderTextColor="black"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                    value={values.email}
                  />
                </View>

                {touched.email && errors.email && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: textRed,
                      textAlign: "center",
                    }}
                  >
                    {errors.email}
                  </Text>
                )}

                <View style={{ display: "flex", justifyContent:"center", flexDirection: "row",marginBottom:10,borderRadius:"10" }}>
            
                  <TextInput
                    style={{ width: "70%" }}
                    label="Password"
                    mode="flat"
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
                    style={{
                      fontSize: 12,
                      color: textRed,
                      textAlign: "center",
                    }}
                  >
                    {errors.password}
                  </Text>
                )}

                <View
                  style={{
                    alignItems: "center",
                    marginTop: 30,
                    marginBottom: 30,
                  }}
                >
                  <Button
                    style={{ width: "50%" }}
                    color={textBlack}
                    mode="contained"
                    onPress={handleSubmit}
                  >
                    Register
                  </Button>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 5,
                    marginBottom: 30,
                  }}
                >
                  <Text style={{ fontSize: 16, color: textBlack }}>
                    Already have an account?
                  </Text>
                  <Button
                    style={{ width: "50%" }}
                    color={textRed}
                    mode="text"
                    onPress={() => navigation.navigate("Login")}
                  >
                    Login
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
