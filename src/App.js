import { useEffect } from "react";
import "./App.css";

import Stopwatch from "./comp/Stopwatch/Stopwatch";
import { useDarkMode } from "./comp/Context/DarkContext";

export default function App() {
  const dark = useDarkMode();

  useEffect(() => {
    document.body.style.background = dark
      ? "#1b1c1d"
      : "hsla(0, 0%, 100%, .4)";
  }, [dark]);

  return (
    <div className={`App ${dark ? "dark" : "light"}`}>
      <Stopwatch />
    </div>
  );
}
