import Timer from "../Timer/Timer";
import { useDarkMode } from "../Context/DarkContext";

import "./style/Flag.css";

export default function Flag({ count, time, lap, pace }) {
  const dark = useDarkMode();

  return (
    <section
      className={`flag ${pace} ${dark ? "flag-dark" : "flag-light"}`}
      style={{
        marginTop: `${
          count === 0 ? (pace === "" ? "0.25rem" : "0.4rem") : null
        }`,
      }}
    >
      <span>{`${(count += 1)}`.toString().padStart(2, "0")}</span>
      <Timer time={time} />
      <Timer time={lap} />
    </section>
  );
}
