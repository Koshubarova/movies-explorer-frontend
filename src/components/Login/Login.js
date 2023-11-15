import Input from "../Input/Input";
import SectionLogin from "../SectionLogin/SectionLogin";
import useFormValidation from '../../hooks/useFormValidation'


export default function Login({ name, onLogin, setIsError }) {
  const { values, errors, isInputValid, isValid, handleChange, } = useFormValidation()

  function onSubmit(evt) {
    evt.preventDefault()
    onLogin(values.email, values.password)
  }

  return (
    <SectionLogin name={name} isValid={isValid} onSubmit={onSubmit} setIsError={setIsError}>
      <Input
        name='email'
        type='email'
        title='E-mail'
        value={values.email}
        isInputValid={isInputValid.email}
        error={errors.email}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        placeholder='Введите электронную почту'
      />
      <Input
        name='password'
        type='password'
        title='Пароль'
        minLength = '2'
        value={values.password}
        isInputValid={isInputValid.password}
        error={errors.password}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        placeholder='Введите пароль'
      />
    </SectionLogin>
  )
}