import React from 'react';
import './style/UserProfile.css'

function UserProfile({ setIsAuthenticated }) {
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
  };

  return (
    <div className="user-profile">
      <h1>Личный кабинет</h1>
      <div className="profile-info">
        <img src="path_to_avatar" alt="User Avatar" className="avatar" />
        <div className="user-details">
          <p>Имя: Иван Иванов</p>
          <p>Email: ivan.ivanov@example.com</p>
        </div>
      </div>
      <div className="profile-settings">
        <h2>Настройки профиля</h2>
        <button>Изменить пароль</button>
        <button>Настройки уведомлений</button>
      </div>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default UserProfile;