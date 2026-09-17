import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { registerUser } from '../../redux/auth/operations';
import { selectIsLoading } from '../../redux/auth/selectors';

import css from './RegisterForm.module.css';

const registerSchema = yup.object({
  name: yup.string().trim().required('Name is required'),

  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Enter a valid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must contain at least 7 characters'),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const isPasswordValid = touchedFields.password && !errors.password;

  const onSubmit = async (data) => {
    if (isLoading) return;

    try {
      await dispatch(registerUser(data)).unwrap();

      navigate('/recommended', { replace: true });
    } catch (error) {
      const message =
        typeof error === 'string'
          ? error
          : error?.message || 'Registration failed. Try again.';

      toast.error(message);
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((previousValue) => !previousValue);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css.field}>
        <div
          className={`${css.inputWrapper} ${
            errors.name ? css.inputWrapperError : ''
          }`}
        >
          <label className={css.label} htmlFor="register-name">
            Name:
          </label>

          <input
            className={css.input}
            id="register-name"
            type="text"
            placeholder="Enter your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'register-name-error' : undefined}
            {...register('name')}
          />
        </div>

        {errors.name && (
          <p className={css.errorMessage} id="register-name-error" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className={css.field}>
        <div
          className={`${css.inputWrapper} ${
            errors.email ? css.inputWrapperError : ''
          }`}
        >
          <label className={css.label} htmlFor="register-email">
            Mail:
          </label>

          <input
            className={css.input}
            id="register-email"
            type="email"
            placeholder="Your@email.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'register-email-error' : undefined}
            {...register('email')}
          />
        </div>

        {errors.email && (
          <p
            className={css.errorMessage}
            id="register-email-error"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div className={css.field}>
        <div
          className={`${css.inputWrapper} ${
            errors.password
              ? css.inputWrapperError
              : isPasswordValid
                ? css.inputWrapperSuccess
                : ''
          }`}
        >
          <label className={css.label} htmlFor="register-password">
            Password:
          </label>

          <input
            className={css.passwordInput}
            id="register-password"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Yourpasswordhere"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? 'register-password-error' : undefined
            }
            {...register('password')}
          />

          {errors.password ? (
            <svg
              className={css.statusIcon}
              width="18"
              height="18"
              aria-hidden="true"
            >
              <use href="/icons/sprite.svg#icon-error" />
            </svg>
          ) : isPasswordValid ? (
            <svg
              className={css.statusIcon}
              width="18"
              height="18"
              aria-hidden="true"
            >
              <use href="/icons/sprite.svg#icon-check" />
            </svg>
          ) : (
            <button
              className={css.passwordButton}
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              aria-pressed={isPasswordVisible}
            >
              <svg
                className={css.passwordIcon}
                width="18"
                height="18"
                aria-hidden="true"
              >
                <use
                  href={
                    isPasswordVisible
                      ? '/icons/sprite.svg#icon-eye'
                      : '/icons/sprite.svg#icon-eye-off'
                  }
                />
              </svg>
            </button>
          )}
        </div>

        {errors.password ? (
          <p
            className={css.errorMessage}
            id="register-password-error"
            role="alert"
          >
            {errors.password.message}
          </p>
        ) : isPasswordValid ? (
          <p className={css.successMessage}>Password is secure</p>
        ) : null}
      </div>

      <div className={css.actions}>
        <button className={css.submitButton} type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Registration'}
        </button>

        <Link className={css.loginLink} to="/login">
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
