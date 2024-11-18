import axiosInstance from "@/utils/interceptors";

export const loginService = async (payload: any) => {
  const response = await axiosInstance.post("/auth/login", payload);

  return response;
}