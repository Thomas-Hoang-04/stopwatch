import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  startTransition,
} from "react";
import { useImmer } from "use-immer";
import Button from "../Button/Button";
import Timer from "../Timer/Timer";
import Toggle from "../Toggle/Toggle";
import { useDarkMode, useSetDarkMode } from "../Context/DarkContext";

import "./style/Stopwatch.css";

const FlagList = lazy(() => import("../Flag/FlagList"));

export default function Stopwatch() {
  const [active, setActive] = useState("stopped");
  const [flagTime, setFlagTime] = useImmer([]);
  const [time, setTime] = useState(0);
  const currentTime = useRef(0);
  const paceRef = useRef({
    fastest: null,
    slowest: null,
    fastIndex: null,
    slowIndex: null,
  });
  const [dark, setDark] = [useDarkMode(), useSetDarkMode()];

  useEffect(() => {
    let interval;

    active === "started"
      ? (interval = setInterval(() => setTime(time + 1.12), 10))
      : clearInterval(interval);

    return () => clearInterval(interval);
  }, [active, time]);

  const addFlag = useCallback(
    (e, time) => {
      e.preventDefault();
      let lap = time - currentTime.current;
      currentTime.current = time;
      if (flagTime.length === 2) {
        let lapList = flagTime.map((time) => time.lap);
        lapList.push(lap);
        paceRef.current.fastest = Math.max(...lapList);
        paceRef.current.fastIndex = lapList.lastIndexOf(
          Math.max(...lapList)
        );
        paceRef.current.slowest = Math.min(...lapList);
        paceRef.current.slowIndex = lapList.lastIndexOf(
          Math.min(...lapList)
        );
      } else if (flagTime.length > 2) {
        if (lap > paceRef.current.slowest) {
          paceRef.current.slowest = lap;
          paceRef.current.slowIndex = flagTime.length;
        } else if (lap <= paceRef.current.fastest) {
          paceRef.current.fastest = lap;
          paceRef.current.fastIndex = flagTime.length;
        }
      }
      startTransition(() =>
        setFlagTime((draft) => {
          draft.push({ flagPoint: currentTime.current, lap: lap });
        })
      );
    },
    [currentTime, paceRef, flagTime, setFlagTime]
  );

  const handleDark = useCallback(() => {
    setTimeout(() => setDark(!dark), 500);
    let darkIndex =
      localStorage.getItem("darkmode") === "false" ? "true" : "false";
    localStorage.setItem("darkmode", darkIndex);
  }, [dark, setDark]);

  const activeState = useMemo(
    () =>
      active === "stopped"
        ? "Start"
        : active === "paused"
        ? "Continue"
        : "Pause",
    [active]
  );

  const handleStart = useCallback(
    (e) => {
      e.preventDefault();
      active === "stopped" || active === "paused"
        ? setActive("started")
        : setActive("paused");
    },
    [active, setActive]
  );

  const handleStop = useCallback(
    (e) => {
      e.preventDefault();
      setActive("stopped");
      setFlagTime([]);
      setTime(0);
      currentTime.current = 0;
      paceRef.current = {
        fastest: null,
        slowest: null,
        fastIndex: null,
        slowIndex: null,
      };
    },
    [setActive, setFlagTime, paceRef]
  );

  return (
    <div className="stopwatch">
      <section className={`theme ${dark ? "theme-dark" : "theme-light"}`}>
        <h1>Change Theme</h1>
        <div className="mode-toggle">
          <span>
            {dark ? (
              <img
                alt="Dark mode icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABkUlEQVR4nO3VvUoDQRAH8EMFQbSw9As78TEstdBCxBfQSkUQtM4DWIXEzF4MWGlhJ0Is8xIxyczNnF40tahgISYnm0QJkiOXeHtYODDdwW/3f7O7lvVff61SXnk643mTsYGAOAOC50pIEoXCSDyo62yC0IsS8hXTcTyo0AEwNpqobsdZjmen3IEK+Tpyo6h9X5oCxqdOVHeSaNQorIQufqK6c+XyhNEjA0Lv3eCslBaMwYrxqBtqfLhAKB8IM6UMwugFwoLVS98fNgIrxrdgmHwQ2jICw9ctFdyPRqYbmLAHrHedjzxyELzpBbfxZML3h6KE98LArSnHq8hiP3GcOWD8CIsDU82WynYk0SvGXOhdf0ePD8CUtrmyYt9VFtPF4rhdq42l3dt5JbQKjrMU8uHvOd19ND7rhyfUrvXK+4k8+FdgA4Q2+orcZtxXjPWBYcY6CO1Yg1TGddYGib35njOuW79+KplOw0Tf/uZMnw4rqsoSzSqp7OqbC5jKSui1dbdjVTFeg4uHepGRgf9lRVSfOJIvC2bQb0wAAAAASUVORK5CYII="
              />
            ) : (
              <img
                alt="Light mode icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABe0lEQVR4nO3VTStFQRwG8AmlxMLLmf+5rpeN5FuwvAoLOeZ55u6wQkqx9gGsxI6yYi/FR5GFhbf1DWWhe9HoiuR0z+HMycK/nvVv5mlelPqfvzbdQO+AtZ25gV1RVBTyQIALNTrakgsqwKwA90K+CLmZC6qBVSGf6+hLAJTy2Sk/UBdXuVe0p1wuCFD5jLoMlUqtXmEhD7+iLt1zcx1er4wAT9/BPcYMe4OFXP8O9X64NHkSB2tg2yd8GQuTVyqKmn3Bj3HwW6yd9wLLxysVlxsvp1vI8wawq/wk88qFPG0E1/EttbHRlCW8nASu5yiz2nuN6ReymgK/1eRCJtVrYC8F/H7HrzW5ExozXiBHgihqL0xMtIXWDgo5KcaMJfv4G5/u5AHu3MeTaNdu5Skrj8tzCMykqlyAFQFqv9hpLSQX1U9GA1M/qh2oBNZOqwy+yt2E1Vc1sO9uh8pqiuVynwBL7uXSwJmQD+5td5+HBo4DY9bcIjMD/0dlNK8k7qGGWlZk9wAAAABJRU5ErkJggg=="
              />
            )}
            <p>Dark</p>
          </span>

          <Toggle dark={dark} setDark={handleDark} />
          <span>
            {dark ? (
              <img
                alt="Dark mode icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsUlEQVR4nN2W20oDQQyG90a09ypofSqpD1TtbS9E2MwKUm98DVErHqAeUNAmJlb7BJ7Aw0WVdNm6tnQ6u13r4YdA2Znkm0kzM/G8vyZgOgDBvZGDjdC72v8AA2K+3GzmhgUHtdrYyu3lrBNUJxrBFyN47jNP912cUNUw7fQbV18QOgPG5+DmYmYguNJoTKhDuCM73AZVX42hsZaJxhM72nZlzUbahfttOO2C4MaXb0wlYDoBpic1I3gMQktxgPqob5ps9Si4vloAoYeoqLpNx0Co4GWpQKGMrX7QDpyxlRncD6uz7057De/XiKaGBhumkjs0SjsuZgE+TQrWgktY/hQVSjU2liDNn4XmEtvrHoyf3TRg/Z9dYlulZ/bbUm2TXg4pwEVv1McJBO+Cen1yaLBKLwXXC8QwzntZCoQKWjS2nWYC9dspxk0jVIm+6Y2klwMIHhmhR7XwNxbj6QWh9VSPhB9/Txm3ki4amLYTP4vlZjPXeYszagQGtVHhahHzIPSmDjaoYTo0jPsDWx+hV+e+a5VoTlsg25yoqGxzNIbGcoK6ygX8LTI/BYYB7e2v1QdAv2/bjqTpngAAAABJRU5ErkJggg=="
              />
            ) : (
              <img
                alt="Light mode icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABpElEQVR4nN2WS04CQRCGZ2OUrULXoCRuPAxrQyf/P5Cw4x4o99CN1zAqxsdCNHgRQRMfCzQ9BBgh09MDAz7+pJLJdFd/XZXurvK8vyZF3ghwtXKwkJ/G/gd4U+udkta5hcGNxtoWsO0ENRMV+abIR6nVVCwYaCvyIna8VlMCdBXwmq9Wi4ng3Xp9wziYaJLgNmjoa7ICdPfK5fXUjraoYv2B9twbl2GqLoU8mfrXEuBeAS/GhOwIeRgFGJ/Qd45szcgPAi1Af3SoZgzo+0DFy1K+gZKDWOjEBpnBZZje+EhnI+/5WhcWBwMtZ+gEfrA4mHxIDSY7qY6/THbcjoy5pzly0FzW9qYHo3d3TnDPZW2rzJ1dWqptCh+H9BE3vZVfJ/KpSOa9LOQDFdcHpBAE+5lAv8GBni3STKBiKhRwqoCjMVzrgnkcFHkn5LOx8BtoRtOryOO5ioREyyJwlnbTCjhPXRZLWucitTiTRiCpjRr3WwJ8hF2IBaqAWwGuE1sf8t2579qpVkumBbLNGR0q2xyzhlnLCeoqF/BSJD8Ghr29/bX6AoAyv6spwr8eAAAAAElFTkSuQmCC"
              />
            )}
            <p>Light</p>
          </span>
        </div>
      </section>
      <section className="timer">
        <Timer time={time} dark={dark} />

        <div className="trigger">
          <Button
            id="triggerStart"
            value={activeState}
            onClick={(e) => handleStart(e)}
          />
          {active === "paused" && (
            <Button value={"Stop"} onClick={(e) => handleStop(e)} />
          )}
          {active === "started" && (
            <Button value={"Lap"} onClick={(e) => addFlag(e, time)} />
          )}
        </div>
      </section>
      <section className="flag-section">
        <div
          className={`flag-header ${
            dark ? "header-dark" : "header-light"
          }`}
        >
          <p>Lap No.</p>
          <p>Overall Time</p>
          <p>Lap Time</p>
          <hr name={dark ? "hr-dark" : "hr-light"} />
        </div>

        <FlagList flagTime={flagTime} ref={paceRef} />
      </section>
    </div>
  );
}
