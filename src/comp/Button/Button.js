import { memo } from "react";

import "./style/Button.css";

const Button = memo(function Button({ value, onClick }) {
  return (
    <button name={value} onClick={onClick}>
      {value}
    </button>
  );
});

export default Button;
