import React from 'react';
import './Header.css';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();

  const redirectToAuthPage = () => {
    history.push('/auth');
  };

  return (
    <header>
      <button onClick={redirectToAuthPage}>
        <img src="path/to/user-icon.png" alt="User Icon" />
      </button>
    </header>
  );
}

export default Header;