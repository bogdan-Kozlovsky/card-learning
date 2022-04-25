import {FC, memo} from "react";
import style from '../../assets/thema.module.css'

type ThemePropsType = {
    theme: string
    toggleTheme: () => void
}

export const Theme: FC<ThemePropsType> = memo(({theme, toggleTheme}) => {
    return (
        <div className={style.btnBox}>
            {theme === 'dark'
                ? <span onClick={toggleTheme} className={style.emoji}>&#127770;</span>
                : <span onClick={toggleTheme} className={style.emoji}>&#127773;</span>}
        </div>
    )
})