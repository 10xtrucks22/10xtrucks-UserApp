import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import createAuthStore from '../store/AuthStore'
import AppStack from './AppStack'
import AuthStack from './AuthStack'

const Router = () => {

  const isLogin = createAuthStore((state) => state.isLogin)

  return (
    <NavigationContainer>
      { isLogin === true ? <AppStack /> : <AuthStack />  }
    </NavigationContainer>
  )

}

export default Router