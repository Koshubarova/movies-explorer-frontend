import './Register.css'
import useFormValidation from '../../hooks/useFormValidation';
import { Link } from "react-router-dom";

export default function Register({ 
  onRegister, 
  isError, 
  setIsError,
  isSend 
}) {
  const { values, isInputValid, isValid, handleChange } = useFormValidation()

  const errorName = "Имя должно быть длиной не менее 3 символов"
  const errorEmail = "Введите корректный email"
  const errorPassword = "Пароль должен быть длиной не менее 2 символов"

  function onSubmit(evt) {
    evt.preventDefault()
    onRegister(values.username, values.email, values.password)
  }

  return (
      <section className='register'>
      <Link to={'/'} className="register__link-home"></Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form noValidate name='register' onSubmit={onSubmit} isValid={isValid} setIsError={setIsError}>
      <label className='register__label'>
          <span className='register__subtitle'>Имя</span>
          <input
            required
            type='text'
            name='username'
            minLength={3}
            isInputValid={isInputValid.username}
            className={`register__input ${isInputValid === undefined || isInputValid ? '' : 'register__input_invalid'}`}
            value={values.username || ''}
            onChange={handleChange}
            pattern={"^[а-яА-ЯёЁa-zA-Z\\s\\-]+"}
            placeholder='Введите имя'
          />
          <span className={`register__error ${!isInputValid && !isValid ? 'register__error_active' : ''}`}>{errorName}</span>
        </label>
      <label className='register__label'>
          <span className='register__subtitle'>E-mail</span>
          <input
            required
            type='email'
            name='email'
            minLength={3}
            isInputValid={isInputValid.email}
            className={`register__input ${isInputValid === undefined || isInputValid ? '' : 'register__input_invalid'}`}
            value={values.email || ''}
            onChange={handleChange}
            pattern={"[A-Za-z0-9_]+@[A-Za-z0-9]+\\.[a-z]{2,4}"}
            placeholder='Введите электронную почту'
          />
          <span className={`register__error ${!isInputValid ? 'register__error_active' : ''}`}>{errorEmail}</span>
        </label>
      <label className='register__label'>
          <span className='register__subtitle'>Пароль</span>
          <input
            required
            type='password'
            name='password'
            minLength={2}
            isInputValid={isInputValid.password}
            className={`register__input ${isInputValid === undefined || isInputValid ? '' : 'register__input_invalid'}`}
            value={values.password || ''}
            onChange={handleChange}
            placeholder='Введите пароль'
          />
          <span className={`register__error ${!isInputValid ? 'register__error_active' : ''}`}>{errorPassword}</span>
        </label>
          <>
            <span className={`register__error-request register__error-request_type_reg ${isError && 'register__error-request_active'}`}>{'Ошибка при регистрации'}</span>
            <button 
              type="submit" 
              className={`register__submit ${isValid && !isError ? '' : 'register__submit_disabled'}`}
              disabled={!isValid || isSend || isError}
              >Зарегистрироваться</button>
          </>
    </form>
          <p className='register__text'>Уже зарегистрированы? <Link to={'/signin'} className='register__link'>Войти</Link></p>
    </section>
  )
}