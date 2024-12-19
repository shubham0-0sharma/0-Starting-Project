import useTimerContext from "../hooks/useTimerContext.tsx";
import Button from "./UI/Button.tsx";

export default function Header() {
  const timerCtx = useTimerContext();

  return (
    <header>
      <h1>ReactTimer</h1>
      {timerCtx.isRunning ? (
        <Button onClick={timerCtx.stopTimer}>Stop Timers</Button>
      ) : (
        <Button onClick={timerCtx.startTimer}>Start Timers</Button>
      )}
    </header>
  );
}
