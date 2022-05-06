import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  memo,
} from 'react';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText: (value: string) => void;
  type: string;
  onEnter: () => void;
  error: string | null | boolean;
  spanClassName: string;
  inputClassName: string;
  handlerShowPassword: any;
};

export const SuperInput = memo((props: Partial<SuperInputPropsType>) => {
  const {
    type,
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,
    className,
    spanClassName,
    inputClassName,
    ...restProps
  } = props;

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && // если есть пропс onChange
      onChange(e); // то передать ему е (поскольку onChange не обязателен)

    onChangeText && onChangeText(e.currentTarget.value);
  };

  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e);

    e.key === 'Enter' && // если нажата кнопка Enter
      onEnter && // и есть пропс onEnter
      onEnter(); // то вызвать его
  };

  return (
    <input
      type={type || 'text'}
      onChange={onChangeCallback}
      onKeyPress={onKeyPressCallback}
      className={className}
      {...restProps}
    />
  );
});
