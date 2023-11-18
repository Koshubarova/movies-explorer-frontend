import './Profile.css'
import useFormValidation from '../../hooks/useFormValidation'
import { useContext, useEffect, useState } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Profile({ 
  signOut, 
  editUserInfo, 
  isError, 
  isEdit, 
  setIsEdit,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, isValid, reset , errors } = useFormValidation();
  const [isLastValues, setIsLastValues] = useState(false);

  useEffect(() => {
    if (currentUser) {
      reset(currentUser);
    }
  }, [currentUser, reset]);

  function handleSubmit(e) {
    e.preventDefault();
    editUserInfo(values.name, values.email);
  }

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsLastValues(true);
    } else {
      setIsLastValues(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <section className="profile">
      <h2 className='profile__title'>{`Привет, ${currentUser.name}`}</h2>
      <form noValidate name='profile' className='profile__form' onSubmit={handleSubmit}>
      <label className='profile__label'>
          <span className='profile__subtitle'>Имя</span>
          <input
            required
            type='text'
            name='name'
            minLength={2}
            className={'profile__input'}
            value={values.name || ""}
            onChange={handleChange}
            disabled={!isEdit ? true : false}
            pattern={"^[а-яА-ЯёЁa-zA-Z\\s\\-]+"}
          />
        </label>
        <span className={`profile__error ${currentUser.name === 'name' ? 'profile__error_type_name' : ''}`}>{errors.message}</span>
        <label className='profile__label'>
          <span className='profile__subtitle'>E-mail </span>
          <input
            required
            type='email'
            name='email'
            className='profile__input'
            value={values.email || ""}
            onChange={handleChange}
            disabled={!isEdit ? true : false}
            pattern={"[A-Za-z0-9_]+@[A-Za-z0-9]+\\.[a-z]{2,4}"}
          />
        </label>
        <span className={`profile__error ${currentUser.name === 'name' ? 'profile__error_type_name' : ''}`}>{errors.message}</span>
      {!isEdit ? (
        <>
          <button
            type="button"
            className='profile__edit'
            onClick={() => {
              setIsEdit(true)
            }}
          >Редактировать</button>
          </> ) : (
            <>
              <button
                type="submit"
                className={`profile__submit ${(values.name === currentUser.name && values.email === currentUser.email) || !isValid || isError ? 'profile__submit_disabled' : ''}`}
                disabled={!isValid || isLastValues || isError}
              >Сохранить</button>
            </>
        )}
      </form>
      <button type='button' onClick={signOut} className='profile__button'>Выйти из аккаунта</button>
    </section>
  )
}