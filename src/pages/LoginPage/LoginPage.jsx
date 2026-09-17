import { useState } from 'react';
import { Link } from 'react-router-dom';

import phoneDesktop from '../../assets/images/iphone-books-desktop@2x.png';
import phoneMobile from '../../assets/images/iphone-books@2x.png';

import css from './LoginPage.module.css';

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((previousValue) => !previousValue);
  };

  return (
    <main className={css.page}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.registration}>
            <Link className={css.logo} to="/" aria-label="Read Journey">
              <svg
                className={css.logoIcon}
                width="42"
                height="17"
                aria-hidden="true"
              >
                <use href="/icons/sprite.svg#icon-logo" />
              </svg>

              <span className={css.logoText}>READ JOURNEY</span>
            </Link>

            <div className={css.content}>
              <h1 className={css.title}>
                Expand your mind, reading <span>a book</span>
              </h1>

              <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.field}>
                  <div className={css.inputWrapper}>
                    <label className={css.label} htmlFor="login-email">
                      Mail:
                    </label>

                    <input
                      className={css.input}
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="Your@email.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className={css.field}>
                  <div className={css.inputWrapper}>
                    <label className={css.label} htmlFor="login-password">
                      Password:
                    </label>

                    <input
                      className={css.passwordInput}
                      id="login-password"
                      name="password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Yourpasswordhere"
                      autoComplete="current-password"
                      required
                    />

                    <button
                      className={css.passwordButton}
                      type="button"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        isPasswordVisible ? 'Hide password' : 'Show password'
                      }
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
                  </div>
                </div>

                <div className={css.actions}>
                  <button className={css.submitButton} type="submit">
                    Log in
                  </button>

                  <Link className={css.loginLink} to="/register">
                    Don&apos;t have an account?
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <div className={css.preview} aria-hidden="true">
            <picture>
              <source media="(min-width: 1440px)" srcSet={phoneDesktop} />

              <img
                className={css.phoneImage}
                src={phoneMobile}
                alt=""
                width="255"
                height="331"
              />
            </picture>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
