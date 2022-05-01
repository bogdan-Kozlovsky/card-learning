import {useEffect, useState} from "react"
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export default useDebounce


// useSelector hook
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


