import { useMemo, useReducer } from "react";
import { statusReducer } from "./common/reducer";
import { usePrevious } from "./common/usePrevious";
import { capitalizeWord } from "./common/util";
import { generateChecksAndTriggers } from "./generateChecksAndTriggers";

export type EventChecks<T extends readonly string[]> = Record<`is${Capitalize<T[number]>}`, boolean>;
export type EventTriggers<T extends readonly string[]> = Record<`on${Capitalize<T[number]>}`, () => void>;

type FormatEventCheckString<T extends readonly string[]> = `is${Capitalize<T[number]>}`
type FormatEventTriggerString<T extends readonly string[]> = `on${Capitalize<T[number]>}`

type ReturnType<T extends readonly string[]> = [
  Record<FormatEventCheckString<T>, boolean>,
  Record<FormatEventTriggerString<T>, () => void>,
  () => void
];

/**
 * @param overrideEvents override default events and cast them as const (MUST BE A CONSTANT, and NOT defined at runtime)
 * @param initialEvent initial state
 * @returns EventChecks - Only one of these checks will be true at any given time
 * @returns EventTriggers - Can be used to turn a single check to true
 * @returns Clear Function - Can be used to clear state
 */
export function useWatchStatus<T extends readonly string[]>(
  events: T,
  initialEvent?: T[number],
): ReturnType<T> {
  const [currentEvent, dispatch] = useReducer(statusReducer, initialEvent);
  const prevEvent = usePrevious(currentEvent);

  //  Create the derived objects once
  const [checks, triggers, clear] = useMemo(() =>
    generateChecksAndTriggers(events, dispatch),
    []
  );

  // These two statements update the active state
  // because one can only be true at any given point then 
  // whenever we update one to be true the last one is cleared
  if (currentEvent && currentEvent !== prevEvent) {
    checks[`is${capitalizeWord(currentEvent)}`] = true;
  }
  if (prevEvent && prevEvent !== currentEvent) {
    checks[`is${capitalizeWord(prevEvent)}`] = false;
  }

  return [checks, triggers, clear];
}
