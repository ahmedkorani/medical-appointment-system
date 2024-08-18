import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../utils/FirebaseConfig";

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

  function handleClick() {
    const auth = getAuth(app);
    auth.signOut();
  }

  return (
    <div>
      <button onClick={handleClick}>Sign out</button>
    </div>
  );
};

export default Home;
