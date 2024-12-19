import { createContext, useReducer, type ReactNode } from "react";
type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimer: () => void;
  stopTimer: () => void;
};

type TimerContextProviderProps = {
  children: ReactNode;
};

type StartTimersAction = {
  type: "START_TIMERS";
};
type StopTimersAction = {
  type: "STOP_TIMERS";
};
type AddTimersAction = {
  type: "ADD_TIMERS";
  payload: Timer;
};
export const TimerContext = createContext<TimersContextValue | null>(null);
const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

function timersReducer(
  state: TimersState,
  action: StopTimersAction | StartTimersAction | AddTimersAction
): TimersState {
  if (action.type === "START_TIMERS") {
    return { ...state, isRunning: true };
  }
  if (action.type === "STOP_TIMERS") {
    return { ...state, isRunning: false };
  }
  if (action.type === "ADD_TIMERS") {
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          name: action.payload.name,
          duration: action.payload.duration,
        },
      ],
    };
  }
  return state;
}

export default function TimerContextProvider({
  children,
}: TimerContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);
  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer: (timerData: Timer) => {
      dispatch({ type: "ADD_TIMERS", payload: timerData });
    },
    startTimer: () => {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimer: () => {
      dispatch({ type: "STOP_TIMERS" });
    },
  };
  return <TimerContext.Provider value={ctx}>{children}</TimerContext.Provider>;
}
