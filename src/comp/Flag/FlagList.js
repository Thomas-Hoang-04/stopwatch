import { memo, forwardRef } from "react";

import "./style/FlagList.css";

import Flag from "./Flag";

const FlagList = memo(
  forwardRef(function FlagList({ flagTime }, ref) {
    return (
      <div className="flag-list">
        {flagTime.map((time, index) => {
          return (
            <Flag
              key={time.flagPoint}
              time={time.flagPoint}
              count={index}
              lap={time.lap}
              pace={
                index === ref.current.fastIndex
                  ? "fast"
                  : index === ref.current.slowIndex
                  ? "slow"
                  : null
              }
            />
          );
        })}
      </div>
    );
  })
);

export default FlagList;
