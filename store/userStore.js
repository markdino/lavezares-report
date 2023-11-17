import { create } from 'zustand'

const defaultData = {
    _id: "",
  position: "",
  firstName:"",
  middleName: "",
  lastName: "",
  image: null,
  isAdmin: false,
  isLogin: false,
}

export const useUserStore = create((set) => ({
  ...defaultData,
  loginUser: (userData) => set({...userData, isLogin: true}),
  logoutUser: () => set(defaultData),
}))