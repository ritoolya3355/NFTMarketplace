import React, { useState, useContext } from 'react'; // Імпорт React та хуків useState, useContext
import './CreateAccount.css'; // Імпорт стилів для компонента
import { AuthContext } from '../AuthContext'; // Імпорт контексту аутентифікації

const CreateAccount = () => {
  const [username, setUsername] = useState(''); // Стан для зберігання імені користувача
  const [email, setEmail] = useState(''); // Стан для зберігання електронної адреси
  const [password, setPassword] = useState(''); // Стан для зберігання пароля
  const [confirmPassword, setConfirmPassword] = useState(''); // Стан для зберігання підтвердження пароля
  const [passwordError, setPasswordError] = useState(''); // Стан для зберігання повідомлення про помилку пароля
  const [emailError, setEmailError] = useState(''); // Стан для зберігання повідомлення про помилку електронної адреси
  const [loading, setLoading] = useState(false); // Стан для зберігання стану завантаження
  const [successMessage, setSuccessMessage] = useState(''); // Стан для зберігання повідомлення про успіх реєстрації
  const { login } = useContext(AuthContext); // Використання контексту аутентифікації

  // Функція для обробки відправки форми
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage('');

    // Перевірка, чи співпадають паролі
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Перевірка валідності пароля
    if (!validatePassword(password)) {
      alert('Password does not meet the requirements');
      return;
    }

    // Перевірка валідності електронної адреси
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    setLoading(true); // Початок завантаження
    try {
      const response = await fetch('https://test-server.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        setSuccessMessage('Registration successful! You can now log in.');
        login(); // Вхід користувача після успішної реєстрації
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Завершення завантаження
    }
  };

  // Функція для перевірки валідності пароля
  const validatePassword = (password) => {
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRequirements.test(password);
  };

  // Функція для перевірки валідності електронної адреси
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Функція для обробки змін пароля
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Перевірка пароля і встановлення відповідного повідомлення про помилку
    if (!validatePassword(newPassword)) {
      setPasswordError('Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.');
    } else {
      setPasswordError(''); // Видалення повідомлення про помилку, якщо пароль валідний
    }
  };

  // Функція для обробки змін електронної адреси
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Перевірка електронної адреси і встановлення відповідного повідомлення про помилку
    if (!validateEmail(newEmail)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError(''); // Видалення повідомлення про помилку, якщо електронна адреса валідна
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-image">
        <img src="../src/images/Createaccount.svg" alt="highlighted" />
      </div>
      <div className="account">
        <h2>Create account</h2>
        <p>
          Welcome! Enter your details and start creating, <br /> collecting, and selling NFTs.
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className='account-input'
              placeholder='Username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className='account-input'
              placeholder='Email Address'
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div>
            <input
              className='account-input'
              placeholder='Password'
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <div>
            <input
              className='account-input'
              placeholder='Confirm Password'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn-createaccount" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </div>
  );
};

export default CreateAccount;
