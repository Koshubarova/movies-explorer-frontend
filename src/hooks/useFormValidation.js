import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

  const handleChange = ({target}) => {
    const name = target.name;
    const value = target.value;
    const valdationMessage = target.valdationMessage;
    const valid = target.validity.validж
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: valdationMessage
    })
    setIsInputValid((oldValid) => {
      return { ...oldValid, [name]: valid }
    })
    setIsValid(target.closest('form').checkValidity());
  };

  const reset = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setIsValid(newIsValid);
      setErrors(newErrors);
    },
    [setValues, setIsValid, setErrors]
  );

  return {
    values,
    setValues,
    handleChange,
    isValid,
    isInputValid,
    reset,
    errors,
    setErrors
  };
}