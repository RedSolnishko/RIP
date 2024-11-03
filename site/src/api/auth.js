// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://192.168.0.16';

export const register = async (username, email, password) => {
  try {
    console.log('Sending registration request...');
    const response = await axios.post(`${API_URL}/api/register`, {
      username,
      email,
      password,
    });
    console.log('Registration request sent successfully');
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    console.log('Sending login request...');
    const response = await axios.post(`${API_URL}/api/login`, {
      username,
      password,
    });
    console.log('Login request sent successfully');
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response && error.response.status === 401) {
      throw new Error('Неверное имя пользователя или пароль.');
    } else {
      throw new Error('Ошибка при авторизации. Попробуйте снова.');
    }
  }
};