import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const GoogleAuth: React.FC = () => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log("Authorization Code:", response.code);

        // Send the authorization code to your backend
        const res = await axios.post("http://localhost:8080/auth/google", {
          code: response.code,
        });

        const { accessToken, refreshToken } = res.data;

        setUserToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    scope: "https://www.googleapis.com/auth/youtube.force-ssl",
    flow: "auth-code", // Authorization Code flow
  });

  const handleLogout = () => {
    googleLogout();
    setUserToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("Logged out successfully");
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const res = await axios.post("http://localhost:8080/auth/refresh", {
            refreshToken,
          });
  
          const { accessToken } = res.data;
  
          setUserToken(accessToken);
          localStorage.setItem("accessToken", accessToken);
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        handleLogout(); // Log out the user on failure
      }
    }, 50 * 60 * 1000); // Refresh every 50 minutes
  
    return () => clearInterval(interval);
  }, []);
  

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
