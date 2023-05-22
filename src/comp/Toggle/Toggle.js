import { memo } from "react";

import "./Toggle.css";

const Toggle = memo(({ dark, setDark }) => {
  return (
    <div className="toggle-switch">
      <label
        className="switch-label"
        style={{ borderColor: dark ? "#175959" : "#98ddda" }}
      >
        <input
          type="checkbox"
          className="checkbox"
          checked={!dark}
          onChange={setDark}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
});

export default Toggle;
