import create from 'zustand'
import { persist,devtools } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';


const authStore = (set) => ({
    isLogin: false,
    token : null,
    user : null,
    phone: null,
    OtpVerify: false,
    ForgotPasswordVerify: false,
    ForgotPhone: null,
    setPhone : (phone) => set({phone:phone}),
    setToken : (token) => set({token: token}),
    setUser : (user) => set({user:user}),
    successLogin: () => set({isLogin: true }),
    successOtpVerify: () => set({ OtpVerify: true }),
    removeOtpVerify: () => set({ OtpVerify: false }),
    successLogout: () => set({ isLogin: false }),
    successForgotPasswordVerify: () => set({ ForgotPasswordVerify: true }),
    removeForgotPasswordVerify: () => set({ ForgotPasswordVerify: false }),
    setForgotPhone: (phone) => set({ ForgotPhone: phone  }),
})


const createAuthStore = create(authStore, {
            name: "userAuth",
            getStorage: () => AsyncStorage,
        })

export default createAuthStore;