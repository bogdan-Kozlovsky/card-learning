import {FormikProps} from "formik";

type  FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const checkValidation = (formik: FormikProps<FormikErrorType>, values: FormikErrorType, setDisable: (disable: boolean) => void) => {
    const errors: FormikErrorType = {}
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 3) {
        errors.password = 'Must be more than 3 characters.';
    }

    if (formik.errors.email || formik.errors.password) {
        if (Object.keys(errors).length === 0) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }
    return errors;
}