import React from "react";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import assets from "../../assets/assets";
import app from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Private/AuthContext";
import apiClient from "../api/apiClient";

const auth = getAuth(app); // Pass the initialized app

const provider = new GithubAuthProvider();

const GitHub = () => {
  const navigate = useNavigate();
  const { loggedin } = useAuth();
  const signInWithGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = result.user.accessToken; // Firebase token

      if (token) {
        // Send this token to your backend to generate a JWT
        const response = await apiClient.post("/api/auth/github-login", {
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
      className="w-full bg-gray-700 hover:bg-PURPLESHADE3 text-white py-2 px-2 rounded flex items-center justify-center mb-4"
      onClick={signInWithGitHub}
    >
      <img src={assets.gitHubIcon} alt="GitHub" className="w-7 mr-2" />
      Continue with GitHub
    </button>
  );
};

export default GitHub;
