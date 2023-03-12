import Home from "./components/Home/Home";
import { createContext, useState } from "react";

export const Context = createContext(null);

const App = () => {
  const [contextValue, setContextValue] = useState(1);

  const updateContextValue = () => {
    setContextValue((prevCounter) => prevCounter + 1);
  };

  return (
    <Context.Provider value={{ contextValue, updateContextValue }}>
      <Home />
    </Context.Provider>
  );
};

export default App;
