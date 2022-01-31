import { Action, generateUpdateAction } from "./common/reducer";
import { capitalizeWord } from "./common/util";

export function generateChecksAndTriggers(
  events: readonly string[],
  dispatch: React.Dispatch<Action<string | undefined>>
): any {
  const eventTriggers = {} as Record<string, () => void>;
  const eventChecks = {} as Record<string, boolean>;

  for (let event of events) {
    const capitalizedEventName = capitalizeWord(event);

    const eventTriggerName = `on${capitalizedEventName}`; // event
    const activeEventCheckName = `is${capitalizedEventName}`; // isEventName

    // eventChecks[activeEventCheckName] = event === currentEvent;
    eventChecks[activeEventCheckName] = false;
    eventTriggers[eventTriggerName] = () => dispatch(generateUpdateAction(event));
  }

  return [eventChecks, eventTriggers];
}
