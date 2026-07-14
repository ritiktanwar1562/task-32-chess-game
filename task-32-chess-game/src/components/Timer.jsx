import { useEffect } from "react";

function Timer({
  time,
  setTime,
  isActive,
  setGameOver,
  player,
}) {

  useEffect(() => {
    // run timer only when it is active
    if (!isActive) return;
// stop timer when time is over
if (time <= 0) {
  alert(player + " ran out of time!");
  setGameOver(true);
  return;
}


    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

// clear old timer
    return () => clearInterval(timer);
  }, [time, isActive, setTime]);
// convert seconds into minutes
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