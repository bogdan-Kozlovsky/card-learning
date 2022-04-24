import {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {Navigate} from "react-router-dom";

export const LoginNavigate: FC = ({children}) => {
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    if (!initialized) return <Navigate to={'/'}/>
    return <>{children}</>
}
