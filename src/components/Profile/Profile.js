import './Profile.css'
import Form from '../Form/Form'
import Input from '../Input/Input'
import useFormValidation from '../../hooks/useFormValidation'
import { useContext, useEffect } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Profile({ name, logOut, editUserInfo, setIsError, isSuccess, setSuccess, isEdit, setIsEdit }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()

  useEffect(() => {
    reset({username: currentUser.name, email: currentUser.email})
  }, [reset, currentUser, isEdit])

  function onSubmit(evt) {
    evt.preventDefault();
    editUserInfo(values.username, values.email)
  }
  
  return (
    <section className="profile">
      <h2 className='profile__title'>{`Привет, ${currentUser.name}`}</h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onSubmit}
        setIsError={setIsError}
        values={values}
        isSuccess={isSuccess}
        setSuccess={setSuccess}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      >
        <Input
          selectname={name}
          name='username'
          type='text'
          title='Имя'
          minLength='3'
          value={values.username}
          isInputValid={isInputValid.username}
          error={errors.username}
          onChange={handleChange}
          isEdit={isEdit}
        />
        <Input
          selectname={name}
          name='email'
          type='email'
          title='E-mail'
          value={values.email}
          isInputValid={isInputValid.email}
          error={errors.email}
          onChange={handleChange}
          pattern={"^\\S+@\\S+\\.\\S+$"}
          isEdit={isEdit}
        />
      </Form>
      <button onClick={logOut} className='profile__button'>Выйти из аккаунта</button>
    </section>
  )
}