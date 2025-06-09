import { authApi } from "../redux/auth/authApi";
import { store } from "../redux/store";

const refreshAccessToken = async () => {
  try {
    const result = await store.dispatch(
      authApi.endpoints.refreshAccessToken.initiate()
    );

    console.log("Refresh Access Token Result:", result);

    if ("data" in result && result.data?.success) {
      return true;
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }

  return false;
};

export default refreshAccessToken;
