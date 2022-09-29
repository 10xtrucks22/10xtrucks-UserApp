import React, { useEffect } from "react";
import Router from "./routes/Router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function App() {

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        style={{ flex: 1 }}
      >
        <Router />
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
