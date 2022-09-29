import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Loading from "../components/Loading";
import { Formik } from "formik";
import * as Yup from "yup";
import createAuthStore from "../store/AuthStore";
import axios from "axios";
import { BASE_URL } from "../config";
import { secondary, textBlack, textRed } from "../config/color";
export default function OtpScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./../assets/fonts/Roboto-Medium.ttf"),
  });

  const setPhone = createAuthStore((state) => state.setPhone);
  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <Formik
      initialValues={{ phone: "+" }}
      validationSchema={Yup.object().shape({
        phone: Yup.string().required("phone is required"),
      })}
      onSubmit={async (values) => {
        try{
        await axios.post(
            `${BASE_URL}/api/otp`,
            {
              phone_no: values.phone,
            }
          )
          .then((res) => {
            if (res.data.success) {
              setPhone(values.phone);
              navigation.navigate("Phone");
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
              color: textBlack,
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            Phone Number Verification
          </Text>
          <View>
            {error && (
              <Text
                style={{ fontSize: 12, color: textRed, textAlign: "center" }}
              >
                {error}
              </Text>
            )}

            <View style={{ display: "flex", flexDirection: "row" }}>
              <IconButton icon="phone" size={30}  color={textRed} />
              <TextInput
                style={{ width: "80%" }}
                label="phone"
                mode="flat"
                outlineColor={secondary}
                selectTextOnFocus={true}
                placeholder="Enter your phone"
                placeholderTextColor={textBlack}
                keyboardType="phone-pad"
                onChangeText={handleChange("phone")}
                onBlur={() => setFieldTouched("phone")}
                value={values.phone}
              />
            </View>

            {touched.phone && errors.phone && (
              <Text
                style={{ fontSize: 12, color: textRed, textAlign: "center" }}
              >
                {errors.phone}
              </Text>
            )}

            <View
              style={{ alignItems: "center", marginTop: 30, marginBottom: 30 }}
            >
              <Button
                style={{ width: "50%" }}
                mode="contained"
                onPress={handleSubmit}
                color={secondary}
              >
                Send OTP
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
                color={textRed}
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
