export default function Timer({ time, dark = null }) {
  let min = Math.floor(time / (60 * 100)) % 60;
  let sec = Math.floor(time / 100) % 60;
  let ms = Math.floor(time % 100);

  return (
    <span className={dark ? "timer-dark" : "timer-light"}>
      {time > 3600 * 100
        ? Math.floor(time / (3600 * 100))
            .toString()
            .padStart(2, "0") + ":"
        : null}
      {min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}.
      {ms.toString().padStart(2, "0")}
    </span>
  );
}
