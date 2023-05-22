import "./Clock.css";
import { useEffect, useState } from "react";

export default function Clock() {
  const [displayTime, setDisplayTime] = useState("");

  function setTime(hand) {
    let current = new Date();
    let original = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate()
    );
    document.getElementById(hand).style.animationDelay = `-${
      (current - original) % (original * 1000)
    }ms`;
  }

  function getDigitalTime() {
    let current = new Date();
    let hour = current.getHours();
    let minute = current.getMinutes();
    let second = current.getSeconds();
    let session = hour > 12 ? "PM" : "AM";

    return `${(hour = 0 ? 12 : hour > 12 ? hour - 12 : hour)}:${
      minute < 10 ? `0${minute}` : minute
    }:${second < 10 ? `0${second}` : second} ${session}`;
  }

  useEffect(() => {
    let digitalTime = setInterval(
      () => setDisplayTime(getDigitalTime()),
      1000
    );

    setTime("hour");
    setTime("minute");
    setTime("second");

    return () => clearInterval(digitalTime);
  }, []);

  return (
    <>
      <section className="digital-hour">
        <div className="city">Hanoi</div>
        <div className="digital-time" id="digital-clock">
          {displayTime}
        </div>
      </section>
      <div className="clock-">
        <div className="clock-hour" id="hour"></div>
        <div className="clock-minutes" id="minute"></div>
        <div className="clock-second" id="second"></div>
        <div className="clock-axis"></div>
        <span className="number-indicator">3</span>
        <span className="number-indicator">6</span>
        <span className="number-indicator">9</span>
        <span className="number-indicator">12</span>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
        <section className="clock-indicator"></section>
      </div>
    </>
  );
}
