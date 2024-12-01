export interface GoogleProfile {
    googleId: string;
    imageUrl: string;
    email: string;
    name: string;
    givenName: string;
    familyName: string;
  }
  
  export interface GoogleLoginResponse {
    profileObj: GoogleProfile;
    tokenId: string;
    accessToken: string;
  }
  