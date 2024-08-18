import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../utils/FirebaseConfig";
import { CalendarComponent } from "../components/Calendar";
import { Box } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      if (!user) {
        navigate("/login");
      }
      setUser(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, [user, setUser, navigate]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <CalendarComponent></CalendarComponent>
    </Box>
  );
};

export default Home;
