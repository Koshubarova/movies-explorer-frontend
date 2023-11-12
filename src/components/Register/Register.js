import Input from "../Input/Input";
import SectionLogin from "../SectionLogin/SectionLogin";
import useFormValidation from '../../hooks/useFormValidation'
// import { useNavigate } from "react-router-dom";


export default function Register({ name, onRegister }) {
  // const navigate = useNavigate()
  const { values, errors, isInputValid, isValid, handleChange } = useFormValidation()

  function onSubmit(evt) {
    evt.preventDefault()
    onRegister(values.username, values.email, values.password)
  }

  return (
    <SectionLogin name={name} isValid={isValid} onSubmit={onSubmit}>
      <Input
        name='username'
        type='text'
        title='Имя'
        minLength = '2'
        value={values.username}
        isInputValid={isInputValid.username}
        error={errors.username}
        onChange={handleChange}
        placeholder='Введите имя'
      />
      <Input
        name='email'
        type='email'
        title='E-mail'
        value={values.email}
        isInputValid={isInputValid.email}
        error={errors.email}
        onChange={handleChange}
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
        onChange={handleChange}
        placeholder='Введите пароль'
      />
    </SectionLogin>
  )
}