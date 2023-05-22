import { Profiler } from "react";

export default function MyProfiler({ children, id }) {
  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
}

function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log(`Component ${id} renders ${phase} in ${actualDuration}`);
  console.log(`Begin: ${startTime}`);
  console.log(`End: ${commitTime}`);
  console.log(
    `No-optimization expected rendering duration: ${baseDuration}`
  );
  console.log("\n");
}
