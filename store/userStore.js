import { create } from "zustand";

const defaultData = {
  _id: "",
  position: "",
  firstName: "",
  middleName: "",
  lastName: "",
  image: null,
  isAdmin: false,
  isLogin: false,
  isLoading: false,
};

export const useUserStore = create((set) => ({
  ...defaultData,
  isVerified: false,
  loginUser: (userData) => set({ ...userData, isLogin: true }),
  logoutUser: () => set(defaultData),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsVerified: (isVerified) => set({ isVerified }),
}));
