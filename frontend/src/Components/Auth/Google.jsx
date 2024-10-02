import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import apiClient from "../api/apiClient";
import assets from "../../assets/assets";
import app from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Private/AuthContext";

const auth = getAuth(app); // Pass the initialized app

const provider = new GoogleAuthProvider();

const Google = () => {
  const navigate = useNavigate();
  const { loggedin } = useAuth();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = result.user.accessToken; // Firebase token

      if (token) {
        // Send this token to your backend to generate a JWT
        const response = await apiClient.post("api/auth/google-login", {
          token,
        });
        loggedin();
        navigate("/user/init");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <button
      className="w-full bg-gray-700 text-white py-2 px-2 rounded flex items-center justify-center mb-4 hover:bg-PURPLESHADE3"
      onClick={signInWithGoogle}
    >
      <img src={assets.googleIcon} alt="Google" className="w-9 mr-2" />
      Continue with Google
    </button>
  );
};

export default Google;
