import './Profile.css'
import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import Input from '../Input/Input'
import useFormValidation from '../../hooks/useFormValidation'
import { useEffect, useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Profile({ name, logOut, editUserData, setIsEdit, isEdit }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()

  useEffect(() => {
    reset({ username: currentUser.name, email: currentUser.email})
  }, [reset, currentUser, isEdit])

  function onSubmit(evt) {
    evt.preventDefault();
    editUserData(values.username, values.email)
  }

  return (
    <section className="profile">
      <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onSubmit}
        values={values}
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
          isEdit={isEdit}
        />
      </Form>
      <Link to={'/'} onClick={logOut} className='profile__link'>Выйти из аккаунта</Link>
    </section>
  )
}