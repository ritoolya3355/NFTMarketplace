import React from 'react';
import { Link } from 'react-router-dom';
import EmailSubscriptionForm from './EmailSubscription'; // Імпортуємо форму підписки
import './Footer.css'; // Імпортуємо CSS для футера

const Footer = () => {
  // Функція обробки підписки, яка отримує емейл і може бути змінена для реальної підписки
  const handleSubscribe = (email) => {
    alert(`Subscribed with email: ${email}`);
    // Реалізуйте додаткову логіку підписки тут, якщо потрібно
  };

  return (
    <footer>
      <div className="containers-footer">
        {/* Логотип і опис */}
        <div className="container-footer">
          <Link to="/">
            <img src="/images/logo.svg" alt="logo" />
          </Link>
          <p>NFT marketplace UI created with Anima for Figma.</p>
          <p>Join our community</p>
          {/* Соціальні посилання */}
          <div className="footer-social-links">
            <a
              href="https://example.com/community/website"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our website"
            >
              <img src="/images/link-web.svg" alt="web" />
            </a>
            <a
              href="https://example.com/community/youtube"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our YouTube channel"
            >
              <img src="/images/link-youtube.svg" alt="youtube" />
            </a>
            <a
              href="https://example.com/community/twitter"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Twitter profile"
            >
              <img src="/images/link-twitter.svg" alt="twitter" />
            </a>
            <a
              href="https://example.com/community/instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram profile"
            >
              <img src="/images/link-instagram.svg" alt="instagram" />
            </a>
          </div>
        </div>

        {/* Розділ з посиланнями на сторінки */}
        <div className="container-footer">
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link to="/rankings">Rankings</Link>
            </li>
            <li>
              <Link to="#">Connect a wallet</Link>
            </li>
          </ul>
        </div>

        {/* Розділ підписки на розсилку */}
        <div className="container-footer">
          <EmailSubscriptionForm onSubscribe={handleSubscribe} />{' '}
          {/* Форма підписки */}
        </div>
      </div>

      <p>&copy; NFT Market. Use this template freely.</p>
    </footer>
  );
};

export default Footer;
