import { refreshAccessToken as requestRefreshAccessToken } from "@/api/auth/auth";

const refreshAccessToken = async () => {
  try {
    const result = await requestRefreshAccessToken();

    console.log("Refresh Access Token Result:", result);

    return Boolean(result?.success);
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }

  return false;
};

export default refreshAccessToken;
