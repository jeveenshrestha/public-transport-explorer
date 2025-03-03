import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

import { modeIcons } from '../../utils/modeIcons';

import styles from './Nav.module.css';

const Nav: React.FC = () => {
  return (
    <Navbar className={styles.nav}>
      <Container>
        <Navbar.Brand href="#home">
          <div className="d-flex justify-content-start gap-1 align-items-center">
            <img className={styles.logo} src={modeIcons['BUS'].active} />{' '}
            <span className={styles.brand}>HSL</span>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Nav;
