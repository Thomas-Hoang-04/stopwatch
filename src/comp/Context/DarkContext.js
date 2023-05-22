import { useState, createContext, useContext } from "react";

export const DarkContext = createContext(null);
export const SetDarkContext = createContext(null);

export const useDarkMode = () => useContext(DarkContext);
export const useSetDarkMode = () => useContext(SetDarkContext);

export default function DarkMode({ children }) {
  let darkModeExist = null;
  if (localStorage.getItem("darkmode") !== null)
    darkModeExist =
      localStorage.getItem("darkmode") === "false" ? false : true;
  else {
    localStorage.setItem("darkmode", false);
    darkModeExist = false;
  }

  const [dark, setDark] = useState(darkModeExist);

  return (
    <DarkContext.Provider value={dark}>
      <SetDarkContext.Provider value={setDark}>
        {children}
      </SetDarkContext.Provider>
    </DarkContext.Provider>
  );
}
