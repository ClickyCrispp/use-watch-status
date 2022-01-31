
const UPDATE_ACTION = "UPDATE" as const;

export type Action<T> = { type: typeof UPDATE_ACTION, data: T }

// Reducer
export function statusReducer<TStatus extends string | undefined>(statusState: TStatus, action: Action<TStatus>) {
    switch (action.type) {
        case UPDATE_ACTION: {
            return action.data
        }
        default: {
            return statusState;
        }
    }
}

export function generateUpdateAction(status: string): Action<string | undefined> {
    return { type: UPDATE_ACTION, data: status };
}