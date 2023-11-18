import './Login.css'
import useFormValidation from '../../hooks/useFormValidation';
import { Link } from "react-router-dom";

export default function Login({ 
  onLogin, 
  isError, 
  isSend 
  }) {
  const { values, errors, isInputValid, isValid, handleChange } = useFormValidation();

  function onSubmit(evt) {
    evt.preventDefault()
    onLogin(values.email, values.password)
  }

  return (
    <section className='login'>
      <Link to={'/'} className="login__link-home"></Link>
      <h2 className='login__title'>Рады видеть!</h2>
      <form noValidate name='login' onSubmit={onSubmit}>
        <label className='login__label'>
          <span className='login__subtitle'>E-mail</span>
          <input
            required
            type='email'
            name='email'
            minLength={3}
            isInputValid={isInputValid.email}
            className={`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_invalid'}`}
            value={values.email || ''}
            onChange={handleChange}
            pattern={"[A-Za-z0-9_]+@[A-Za-z0-9]+\\.[a-z]{2,4}"}
            placeholder='Введите электронную почту'
          />
          <span className='login__error'>{errors.email}</span>
        </label>
        <label className='login__label'>
          <span className='login__subtitle'>Пароль</span>
          <input
            required
            type='password'
            name='password'
            minLength={2}
            isInputValid={isInputValid.password}
            className={`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_invalid'}`}
            value={values.password || ''}
            onChange={handleChange}
            placeholder='Введите пароль'
          />
          <span className='login__error'>{errors.password}</span>
        </label>
        <>
          <span className={`login__error-request ${isError && 'login__error-request_active'}`}>{'Ошибка при входе'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend || isError}
          >Войти</button>
        </>
    </form>
    <p className='login__text'>Ещё не зарегистрированы? <Link to={'/signup'} className='login__link'>Регистрация</Link></p>
    </section>
  )
}