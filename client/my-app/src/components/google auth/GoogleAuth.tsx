import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

const GoogleAuth: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = (credentialResponse: any) => {
    console.log("Login Success:", credentialResponse);
    setUser(credentialResponse);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    console.log("Logged out successfully");
  };

  return (
    <GoogleOAuthProvider clientId="704853235569-heorv705ni3to0l35d8sjvdk7o44jbpl.apps.googleusercontent.com">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Google Login with React</h1>
        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        ) : (
          <div>
            <p>Welcome, user is logged in!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
