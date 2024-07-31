import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import './Header.css';

const Header = () => {
  // Отримуємо інформацію про авторизацію та функцію logout з AuthContext
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // Для навігації між сторінками

  // Стан для зберігання цін на криптовалюти
  const [cryptoPrices, setCryptoPrices] = useState({
    btc: null,
    eth: null,
    ada: null,
  });

  // Стан для контролю відкриття меню
  const [menuOpen, setMenuOpen] = useState(false);

  // Виконуємо запит на отримання цін на криптовалюти при завантаженні компонента
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'bitcoin,ethereum,cardano',
            vs_currencies: 'usd',
          },
        });
        setCryptoPrices({
          btc: response.data.bitcoin.usd,
          eth: response.data.ethereum.usd,
          ada: response.data.cardano.usd,
        });
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    fetchCryptoPrices();
  }, []); // Пустий масив залежностей означає, що ефект виконується тільки при завантаженні компонента
  // Обробник натискання кнопки для переходу на сторінку входу/реєстрації
  const handleSignUpClick = () => {
    if (!isAuthenticated) {
      navigate('/signin'); // Перенаправляє на сторінку входу, якщо користувач не авторизований
    }
  };
  // Перемикає стан відкриття/закриття меню
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav>
        <Link to="/">
          <img src="/src/images/logo.svg" alt="logo" /> {/* Логотип з переходом на головну сторінку*/}
        </Link>
        <button className="burger-menu" onClick={toggleMenu}>
          &#9776; {/* Іконка гамбургера для меню */}
        </button>
        <ul className={menuOpen ? 'menu open' : 'menu'}>
          {/* Меню навігації */}
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/rankings">Rankings</Link></li>
          <li><Link to="/connect-wallet">Connect a wallet</Link></li>
        </ul>
        <div className="auth-buttons">
          {/* Кнопки для авторизації/виходу */}
          {isAuthenticated ? (
            <>
              <Link to="/artist">
                <button className="btn-sign-up">
                  <img src="/src/images/user_btn.svg" alt="user" />My Account
                </button>
              </Link>
              <button className="btn-sign-up" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn-sign-up" onClick={handleSignUpClick}>
              <img src="/src/images/user_btn.svg" alt="user" />Login
            </button>
          )}
        </div>
      </nav>
      <div className="crypto-prices">
        {/* Відображення цін на криптовалюти */}
        <p>
          <span role="img" aria-label="Bitcoin">₿</span> {cryptoPrices.btc ? `$ ${cryptoPrices.btc}` : 'Loading...'}
        </p>
        <p>
          <span role="img" aria-label="Ethereum">Ξ</span> {cryptoPrices.eth ? `$ ${cryptoPrices.eth}` : 'Loading...'}
        </p>
        <p>
          <span role="img" aria-label="Cardano">₳</span> {cryptoPrices.ada ? `$ ${cryptoPrices.ada}` : 'Loading...'}
        </p>
      </div>
    </header>
  );
};

export default Header;
