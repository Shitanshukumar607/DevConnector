import { authApi } from "../redux/auth/authApi";
import { store } from "../redux/store";

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const result = await store.dispatch(
      authApi.endpoints.refreshAccessToken.initiate({})
    );

    if ("data" in result && result.data?.success) {
      return true;
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }

  return false;
};

export default refreshAccessToken;
