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
export default function ForgotPassword({ navigation }) {
  const [error, setError] = useState(null);
  const removeForgotPasswordVerify = createAuthStore((state) => state.removeForgotPasswordVerify);
  const ForgotPhone = createAuthStore((state) => state.ForgotPhone);
  const setForgotPhone = createAuthStore((state) => state.setForgotPhone);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={Yup.object().shape({
          password: Yup.string().required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')

      
      })}
      onSubmit={async (values) => {

        try{
          await axios.post(
              `${BASE_URL}/api/forgot-password`,
              {
                phone_no: ForgotPhone,
                password: values.password,
               
              }
            )
            .then((res) => {
              if (res.data.success) {
                removeForgotPasswordVerify();
                setForgotPhone(null);
                navigation.navigate("Login");
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
            Enter New Password
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
                label="Password"
                mode="flat"
                keyboardType="default"
                placeholder="Enter your new password"
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                value={values.password}
              />
            </View>
            {touched.password && errors.password && (
              <Text
                style={{ fontSize: 12, color: "#FF0D10", textAlign: "center" }}
              >
                {errors.password}
              </Text>
            )}

            <View style={{ display: "flex", flexDirection: "row" }}>
              <IconButton icon="key" size={30}  color="#03baab"  />
              <TextInput
                style={{ width: "80%" }}
                label="Confirm Password"
                mode="flat"
                keyboardType="default"
                placeholder="Confirm password"
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={handleChange("confirmPassword")}
                onBlur={() => setFieldTouched("confirmPassword")}
                value={values.confirmPassword}
              />
            </View>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text
                style={{ fontSize: 12, color: "#FF0D10", textAlign: "center" }}
              >
                {errors.confirmPassword}
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
                Submit
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
