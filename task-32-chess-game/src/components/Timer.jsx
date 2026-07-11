import { useEffect } from "react";

function Timer({ time, setTime, isActive }) {
  useEffect(() => {
    if (!isActive) return;

    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, isActive, setTime]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
}

export default Timer;