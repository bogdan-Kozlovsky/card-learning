import loader from './image/preloader.svg'
import style from './loader.module.css'

export const Loader = () => {
    return (
        <div>
            <img
                className={style.loader}
                src={loader}
                alt=''
            />
        </div>
    )
}