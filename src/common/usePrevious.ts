import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    // Return previous value (happens before update in useEffect above)
    return ref.current as T;
}