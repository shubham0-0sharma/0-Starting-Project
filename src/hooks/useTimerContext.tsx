import { useContext } from "react";
import { TimerContext } from "../store/timers-context";
export default function useTimerContext() {
  const timerCtx = useContext(TimerContext);
  if (timerCtx === null) {
    throw new Error("Somthing went wrong");
  }
  return timerCtx;
}

