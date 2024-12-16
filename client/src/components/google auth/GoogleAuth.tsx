import React, { useState } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const GoogleAuth: React.FC = () => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Access Token:", tokenResponse.access_token);
      setUserToken(tokenResponse.access_token);
      localStorage.setItem("accessToken", tokenResponse.access_token);
    },
    scope: "https://www.googleapis.com/auth/youtube.readonly",
    flow: "implicit",
  });

  const handleLogout = () => {
    googleLogout();
    setUserToken(null);
    localStorage.removeItem("accessToken");
    console.log("Logged out successfully");
  };

  return (
    <div>
      {!userToken ? (
        <button onClick={() => login()}>Login with Google</button>
      ) : (
        <div>
          <p>Welcome! Access Token Retrieved.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;
