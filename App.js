
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';



export default function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <PaperProvider>
      <App />
    </PaperProvider>
    </GestureHandlerRootView>
  );
}