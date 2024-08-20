import { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [isPatientView, setIsPatientView] = useState(true);

  const togglePatientView = () => {
    setIsPatientView(!isPatientView);
  };

  return (
    <AppContext.Provider value={{ isPatientView, togglePatientView }}>
      {children}
    </AppContext.Provider>
  );
};
