import React, { useEffect, useState } from "react";
import apiClient from "../Components/api/apiClient";
import { useNavigate } from "react-router-dom";
import VerifyEmail from "../Components/Auth/VerifyEmail";
import LoginRoles from "../Components/Auth/LoginRoles";
import { useAuth } from "../Components/Private/AuthContext";

export default function Init() {
  const [verified, setVerified] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { loggedin } = useAuth();

  useEffect(() => {
    let intervalId;

    const getVerification = async () => {
      try {
        const [verificationResponse, roleResponse] = await Promise.all([
          apiClient.get("/api/init/isverified"),
          apiClient.get("/api/init/isrole"),
        ]);
        if (
          verificationResponse.status === 200 &&
          roleResponse.status === 200
        ) {
          setVerified(verificationResponse.data.status);
          setRole(roleResponse.data.status);
        }
      } catch (error) {
        console.error("Error fetching verification and role:", error);
        // Handle error (e.g., show error message to user)
      }
    };

    // Initial check
    getVerification();

    // Set up interval
    intervalId = setInterval(getVerification, 3000);

    // Clean up function
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const checkVerificationAndRole = async () => {
      if (verified && role) {
        try {
          const response = await apiClient.get("/api/init/getrole");
          if (response.status === 200) {
            await loggedin();
            switch (response.data.userRole) {
              case "WORKER":
                console.log("worker")
                navigate("/user/dashboard");
                break;
              case "PROVIDER":
                console.log("provider");
                navigate("/playground");
                break;
              default:
                navigate("/");
                break;
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          // Handle error (e.g., show error message to user)
        }
      }
    };

    checkVerificationAndRole();
  }, [verified, role, navigate]);

  if (verified === null || role === null) {
    return <div aria-live="polite">Loading...</div>;
  }

  return (
    <div>
      {!verified && <VerifyEmail />}
      {verified && !role && <LoginRoles />}
    </div>
  );
}
