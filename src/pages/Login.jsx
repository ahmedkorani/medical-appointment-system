import { auth, provider } from "../utils/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { Box, Typography } from "@mui/material";
import GoogleButton from "react-google-button";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) navigate("/home");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Welcome To MAS
        </Typography>
        <Typography variant="subtitle1" m="1rem">
          Please sign in first
        </Typography>
        <GoogleButton onClick={handleGoogleSignIn}>
          Sign in with Google
        </GoogleButton>
      </Box>
    </Box>
  );
};

export default Login;
