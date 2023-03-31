import React from 'react'
import styles from './header.scss'
import logo from '../../assets/logo.png'
import bg from '../../assets/bg.png'

function Header() {
  return (
    <>
      <nav className={`${styles.navbar}`}>
        <div className={`${styles.navbar__container} container`}>
          <div className={styles.nav__logo}>
            <img src={logo} alt="logo" />
          </div>
          <ul className={styles.nav__links}>
            <li className={styles.nav__link}>
              <a href="" className={`${styles.nav__button} button`} >
                Users
              </a>
            </li>
            <li className={styles.nav__link}>
              <a href="" className={`${styles.nav__button} button`}>
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className={styles.header__container}>
        <div className={styles.header__bg}>
          <img src={bg} alt="" />
        </div>
        <div className={styles.header__info_container}>
          <div className={styles.header__info}>
            <h1 className={styles.header__title}>
              Test assignment for front-end developer
            </h1>
            <div className={styles.header__text}>
              What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
            </div>
            <button className={`${styles.header__button} button`}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
