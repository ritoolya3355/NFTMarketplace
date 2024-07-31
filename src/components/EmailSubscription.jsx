import React, { useState } from 'react';
import './EmailSubscription.css';

const EmailSubscription = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Обробник зміни введення емейлу
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(''); // Скидаємо помилку при кожній зміні введення
  };

  // Перевірка формату емейлу
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Обробник події підписки
  const handleSubscribe = (event) => {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки

    // Перевірка на правильність формату емейлу
    if (!validateEmail(email)) {
      setError('Invalid email address. Please enter a valid email.');
      return;
    }

    // Викликаємо функцію з пропсів, передаючи емейл
    onSubscribe(email)
      .then((response) => {
        setSuccessMessage('Subscription successful!'); // Показуємо повідомлення про успіх
        setEmail(''); // Очищаємо поле вводу
      })
      .catch((err) => {
        setError('Subscription failed. Please try again.'); // Показуємо повідомлення про помилку
      });
  };

  return (
    <div className="email-subscription">
      <h3>Join our weekly digest</h3>
      <p>Get exclusive promotions & updates straight to your inbox</p>
      <form onSubmit={handleSubscribe} className="subscribe-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
          aria-label="Email address"
          autoComplete="email"
        />
        <button type="submit" aria-label="Subscribe to newsletter">Subscribe</button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Повідомлення про помилку */}
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Повідомлення про успіх */}
    </div>
  );
};

export default EmailSubscription;
