import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getCurrentUser,
    loginUser,
    refreshAccessToken,
    registerUser,
} from "./auth";
import type { LoginData, RegisterData } from "./types";

const useRegister = () => {
  useMutation({
    mutationFn: (data: RegisterData) => registerUser(data),
  });
};

const useLogin = () => {
  useMutation({
    mutationFn: (data: LoginData) => loginUser(data),
  });
};

const useGetCurrentUser = () => {
  useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
  });
};

const useRefreshAccessToken = () => {
  useQuery({
    queryKey: ["refreshAccessToken"],
    queryFn: () => refreshAccessToken(),
    enabled: false,
  });
};
 
export { useGetCurrentUser, useLogin, useRefreshAccessToken, useRegister };

