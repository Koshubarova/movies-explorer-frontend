import './Form.css'

export default function Form({ name, children, isValid, onSubmit }) {

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className='login__error-request'>{'Ошибка при входе'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}
            disabled={!isValid}
          >{'Войти'}</button>
        </>
        :
        name === 'signup' ?
          <>
            <span className='login__error-request login__error-request_type_reg'>{'Ошибка при регистрации'}</span>
            <button type="submit" className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}>{'Зарегистрироваться'}</button>
          </>
          :
          <>
            <span className='profile__error-request'>{'Ошибка при обновлении провиля'}</span>
            <button type="submit" className='profile__submit'>{'Редактировать'}</button>
          </>
      }
    </form>
  )
}
