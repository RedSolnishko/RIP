import React, { useState, useEffect } from 'react';
import { register, login } from '../api/auth';
import { useNavigate } from 'react-router-dom'; // Add this line
import './style/AuthPage.css';

const slides = [
  "Штирлицу попала в голову пуля. 'Разрывная,' - раскинул мозгами Штирлиц.",
  "Штирлиц всю ночь топил камин. На утро камин утонул.",
  "Штирлицу за шиворот упала гусеница. 'Где-то взорвался танк,' — подумал Штирлиц."
];

function AuthPage({ setIsAuthenticated }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [authMode, setAuthMode] = useState(''); // Initially no mode is selected
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validateInputs = () => {
    if (authMode === 'register') {
      if (!username || !email || !password || !confirmPassword) {
        return 'Все поля должны быть заполнены.';
      }
      if (password !== confirmPassword) {
        return 'Пароли не совпадают.';
      }
    } else if (authMode === 'login') {
      if (!username || !password) {
        return 'Имя пользователя и пароль должны быть заполнены.';
      }
    } else if (authMode === 'forgotPassword') {
      if (!email) {
        return 'Email должен быть заполнен.';
      }
    }
    return '';
  };

  const handleRegister = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    try {
      console.log('Attempting to register...');
      await register(username, email, password);
      setIsAuthenticated(true);

      navigate('/profile'); // Перенаправление на страницу профиля
    } catch (error) {

    }
  };

  const handleLogin = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    try {
      console.log('Attempting to login...');
      await login(username, password);
      setIsAuthenticated(true);
    } catch (error) {
    }
  };

  const handleForgotPassword = () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
  };

  const renderAuthForm = () => {
    const backButton = (
      <button onClick={() => setAuthMode('')}>Назад</button>
    );

    switch (authMode) {
      case 'login':
        return (
          <>
            <input type="text" placeholder="Имя" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Войти</button>
            {backButton}
          </>
        );
      case 'register':
        return (
          <>
            <input type="text" placeholder="Имя" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Повторить пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button onClick={handleRegister}>Зарегистрироваться</button>
            {backButton}
          </>
        );
        case 'forgotPassword':
          return (
            <>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button onClick={handleForgotPassword} className="small-forgot-password-button">Востановить пароль</button>
              {backButton}
            </>
          );
      default:
        return null;
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-section">
        <div className="auth-form">
          <h1 className='auth_page'>Заходят в бар...</h1>
          {error && <p className="error-message">{error}</p>}
          {renderAuthForm()}
          {!authMode && (
            <>
              <button className="login-button" onClick={() => setAuthMode('login')}>Войти</button>
              <button className="register-button" onClick={() => setAuthMode('register')}>Зарегистрироваться</button>
              <button className="forgot-password-button" onClick={() => setAuthMode('forgotPassword')}>Востановить пароль</button>
            </>
          )}
        </div>
      </div>
      <div className="slider-section">
        {slides.map((slide, index) => (
          <div key={index} className={`slider ${index === currentSlide ? '' : 'hidden'}`} >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthPage;