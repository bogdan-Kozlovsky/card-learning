import React, {useCallback, useRef} from 'react';

const Hook = () => {

    // @ts-ignore
    export default function useDebounce(callback: any, delay: number) {
        const timer = useRef();

        const debouncedCallback = useCallback((...args) => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            // @ts-ignore
            timer.current = setTimeout(() => {
                callback(...args)
            }, delay)
        }, [callback, delay])

        return debouncedCallback;
    };
    return (
        <div>

        </div>
    );
};

export default Hook;