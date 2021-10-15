import React from 'react';
import SignInButton from '../SignInButton';
import styles from './styles.module.scss';

interface Props {}

const Header = (props: Props) => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <a href="#" className={styles.active}>
            Home
          </a>
          <a href="#">Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
};

export default Header;
