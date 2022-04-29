import React, {ChangeEvent, DetailedHTMLProps, KeyboardEvent, InputHTMLAttributes, memo, useState} from 'react';
import openShow from '../../assets/images/openShow.svg'
import closeShow from '../../assets/images/closeShow.svg'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
    theme?: string
};
// type propsType = {
//     placeholder: string
//     type: string
//     onChange: (e: ChangeEvent<HTMLInputElement>) => void
//     className: string
//     value: string
//     checked?: boolean
//     children?: any
//     name?:string
// }

type SuperInputPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    type?: string
    onEnter?: () => void
    error?: string | null | boolean
    spanClassName?: string
    inputClassName?: string
    theme?: string
    handlerShowPassword?: any
};

export const SuperInput = memo((props: Partial<SuperInputPropsType>) => {
    const {
        // placeholder,
        // type,
        // onChange,
        // checked,
        // className,
        // value,
        // children,
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        className,
        spanClassName, inputClassName,
        theme,
        onBlur,
        ...restProps

    } = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value);
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === "Enter" // если нажата кнопка Enter
        && onEnter // и есть пропс onEnter
        && onEnter(); // то вызвать его
    }

    return (
        <>
            <input onBlur={onBlur}
                type={type ? type : 'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={className}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />

            {/*{children}*/}
            {/*<input checked={checked} type={type} placeholder={placeholder} onChange={onChange} className={className}*/}
            {/*       value={value}/>*/}
        </>
    );
})

export const SuperInputPassword = memo((props: Partial<SuperInputPropsType>) => {
    const {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        spanClassName, inputClassName,
        theme,
        className,
        onBlur,
        handlerShowPassword,
        ...restProps
    } = props
    const [shown, setShown] = useState(false);

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value);
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === "Enter" // если нажата кнопка Enter
        && onEnter // и есть пропс onEnter
        && onEnter(); // то вызвать его
    }

    const onHandlerShow = () => {
        handlerShowPassword()
        setShown(!shown)
    }

    return (

        <div className='inputPasswordShow'>
            <input onBlur={onBlur}
                type={type ? type : 'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={className}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <img className='btnShow' onClick={onHandlerShow} src={!shown ? openShow : closeShow} alt={'open'}/>
            {/*<img className='btnShow' onClick={() => setShown(!shown)} src={!shown ? openShow : closeShow} alt={'open'}/>*/}
        </div>
    );
})

export const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // сделайте так чтоб работал onChange и onChangeChecked
        onChange && onChange(e);

        onChangeChecked && onChangeChecked(e.currentTarget.checked)

    }

    // const finalInputClassName = `${s.checkbox} ${className ? className : ''} ${theme === 'dark' ? s.dark : s.light}`

    return (
        // <label className={s.label}>
        <input
            type={'checkbox'}
            onChange={onChangeCallback}
            className={'inputCheckbox'}

            {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
        />
    )
    //         {children && <span className={s.spanClassName}>{children}</span>}
    //     </label> // благодаря label нажатие на спан передастся в инпут
    // );
}

