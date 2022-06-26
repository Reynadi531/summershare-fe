import create from "zustand";
import { persist } from "zustand/middleware";

type IUseAuth = {
  isAuthenticated: boolean;
  exp: number;
  token: string;
};

const useAuth = create(
  persist(
    () =>
      ({
        isAuthenticated: false,
        exp: 0,
        token: "",
      } as IUseAuth),
    {
      name: "auth", // unique name
    }
  )
);

export default useAuth;
