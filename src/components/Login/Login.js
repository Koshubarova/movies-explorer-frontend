import React from "react";
import "../Form/Form.css";
import Form from "../Form/Form";
import { EMAIL_VALIDATION } from "../../utils/constants";
import useForm from "../../hooks/useForm";

function Login({ onAuthorization, isLoading }) {
  const { enteredValues, isErrors, handleChangeInput, isFormValid } = useForm();

  function getFormSubmit(event) {
    event.preventDefault();
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText="Регистрация"
      link="/signup"
      onSubmit={getFormSubmit}
      isDisabled={!isFormValid}
      isLoading={isLoading}
      noValidate
    >
      <label className="form__label">
        Email
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          required
          placeholder="E-mail"
          onChange={handleChangeInput}
          pattern={EMAIL_VALIDATION}
          value={enteredValues.email || ""}
        />
        <span className="form__input-error">{isErrors.email}</span>
      </label>
      <label className="form__label">
        Password
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          required
          placeholder="Пароль"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
          minLength="6"
          maxLength="12"
        />
        <span className="form__input-error">{isErrors.password}</span>
      </label>
    </Form>
  );
}

export default Login;
