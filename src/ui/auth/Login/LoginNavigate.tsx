import {FC} from "react";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../common/hook/hook";
import {selectAppInitialized} from "../../../bll/selectors";

export const LoginNavigate: FC = ({children}) => {
    const initialized = useAppSelector(selectAppInitialized)
    if (!initialized) return <Navigate to={'/'}/>
    return <>{children}</>
}
