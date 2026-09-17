import { Link } from 'react-router-dom';
import phoneDesktop from '../../assets/images/iphone-books-desktop@2x.png';
import phoneMobile from '../../assets/images/iphone-books@2x.png';

import RegisterForm from '../../components/RegisterForm/RegisterForm';

import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <main className={css.page}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.registration}>
            <Link className={css.logo} to="/register" aria-label="Read Journey">
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

              <RegisterForm />
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

export default RegisterPage;
