import apiClient from "../../../common/configuration/axios.config";

export function useRegister() {
  const register = async (values: any) => {
    const response = await apiClient.post("/student", {
      email: values.email,
      password: values.password,
      name: values.username,
    });
    return response.data;
  };

  return {
    register,
  };
}
