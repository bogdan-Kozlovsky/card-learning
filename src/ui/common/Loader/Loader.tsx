import loader from './image/preloader.svg'

export const Loader = () => {
    return (
        <div>
            <img
                style={{
                    position: 'fixed',
                    zIndex: 999,
                    width: '10%',
                    top: '50%',
                    left: '50%',
                }}
                src={loader}
                alt=''
            />
        </div>
    )
}