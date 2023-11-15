import './Form.css'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ErrorContext from '../../contexts/ErrorContext';
import SendContext from '../../contexts/SendContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

export default function Form({ name, children, isValid, onSubmit, setIsError, values, isSuccess, setSuccess, isEdit, setIsEdit }) {
  const { pathname } = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const isError = useContext(ErrorContext);
  const isSend = useContext(SendContext);

  useEffect(() => {
    setIsError(false)
  }, [setIsError, values]) 

  useEffect(() => {
    if (pathname === '/profile') {
      setSuccess(false)
      setIsEdit(false)
    }
  }, [setSuccess, setIsEdit, pathname])

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className={`login__error-request ${isError && 'login__error-request_active'}`}>{'Ошибка при входе'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend || isError}
          >{isSend ? <Preloader name='button' /> : 'Войти'}</button>
        </>
        :
        name === 'signup' ?
          <>
            <span className={`login__error-request login__error-request_type_reg ${isError && 'login__error-request_active'}`}>{'Ошибка при регистрации'}</span>
            <button 
              type="submit" 
              className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
              disabled={!isValid || isSend || isError}
              >{isSend ? <Preloader name='button' /> : 'Зарегистрироваться'}</button>
          </>
          : !isEdit ?
          <>
            <span className={`profile__error-request ${isError ? 'profile__error-request_active' : isSuccess && 'profile__error-request_type_success'}`}>{isError ? 'Ошибка при обновлении профиля' : 'Профиль успешно обновлен'}</span>
            <button 
            type="submit" 
            className='profile__submit'
            onClick={() => {
              setIsEdit(true)
              setSuccess(false)
            }}
            >{'Редактировать'}</button>
          </> :
          <>
          <span className={`profile__error-request ${isError ? 'profile__error-request_active' : isSuccess && 'profile__error-request_type_success'}`}>{isError ? 'При обновлении профиля произошла ошибка.' : 'Профиль успешно обновлен'}</span>
          <button
            type="submit"
            className={`login__submit ${(values.username === currentUser.name && values.email === currentUser.email) || !isValid || isError ? 'login__submit_disabled' : ''}`}
            disabled={!isValid || isSend || isError}
          >{isSend ? <Preloader name='button' /> : 'Сохранить'}</button>
        </>
      }
    </form>
  )
}
