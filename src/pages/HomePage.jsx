import React from 'react';
import { useNavigate } from 'react-router-dom'; // Імпорт хука useNavigate для навігації
import './Home.css'; // Імпорт стилів для компонента
import BtnGetStarted from '../components/btnGetStarted'; // Імпорт компонентів для домашньої сторінки
import Ratings from '../components/Ratings';
import TrendingCollection from '../components/TrendingCollection';
import TopCreators from '../components/TopCreators';
import CountdownTimer from '../components/CountdownTimer';
import EmailSubscription from '../components/EmailSubscription'; 
import ScrollToTopButton from '../components/ScrollToTopButton'; 

const Home = () => {
  const navigate = useNavigate(); // Використання хука useNavigate для навігації

  // Функція для обробки кліку по кнопці "Connect Wallet"
  const handleConnectWalletClick = () => {
    navigate('/connect-wallet');
  };

  // Функція для обробки кліку по кнопці "Create Account"
  const handleCreateAccountClick = () => {
    navigate('/register');
  };

  // Функція для обробки підписки
  const handleSubscribe = (email) => {
    // Можна реалізувати реальний запит або просто показати повідомлення
    console.log(`Subscribed with email: ${email}`);
    // Повертає проміс для симуляції асинхронного запиту
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ message: 'Subscription successful!' });
      }, 1000);
    });
  };

  return (
    <>
      {/* Головний блок сторінки */}
      <div className="home-container">
        <div className="home-header">
          <h1>Discover digital art & Collect NFTs</h1>
          <p>
            NFT marketplace UI created with Anima for Figma. Collect, buy and
            sell art from more than 20k NFT artists.
          </p>
          {/* Кнопка "Get Started" */}
          <BtnGetStarted
            text="Get Started"
            iconSrc="/images/RocketLaunch.svg"
          />
          {/* Компонент Ratings */}
          <Ratings />
        </div>
        {/* Зображення на головній сторінці */}
        <div className="home-image">
          <img src="/images/Highlighted_NFT.png" alt="highlighted" />
        </div>
      </div>

      {/* Компонент TrendingCollection */}
      <TrendingCollection />

      {/* Блок для підписки на розсилку */}
      <div className="subscribe-container">
        <div className="subscribe-image">
          <img src="/images/subscribe-form.png" alt="subscribe form" />
        </div>
        <div className="subscribe-form-container">
          {/* Компонент EmailSubscription */}
          <EmailSubscription onSubscribe={handleSubscribe} />
        </div>
      </div>

      {/* Компонент TopCreators */}
      <TopCreators />
      <div className="how-it-works__container">
        <div className="banner-container">
          <img
            src="/images/NFT-home-banner.png"
            alt="homepage banner"
            className="banner-image"
          />
          {/* Компонент CountdownTimer з цільовою датою */}
          <div className="countdown-overlay">
            <CountdownTimer targetDate="2024-08-17T00:00:00" />
          </div>
        </div>
        <div className="how-it-works__description">
          <h1>How it works</h1>
          <p>Find out how to get started</p>
        </div>
        <div className="how-it-works-cards">
          {/* Картка з описом процесу налаштування гаманця */}
          <div
            className="how-it-works__card"
            onClick={handleConnectWalletClick}
          >
            <img
              src="/images/home-set-wallet.png"
              alt="Setup Your wallet"
            />
            <div className="how-it-works__card-content">
              <h3>Setup Your wallet</h3>
              <p>
                Set up your wallet of choice. Connect it to the Animarket by
                clicking the wallet icon in the top right corner.
              </p>
            </div>
          </div>
          {/* Картка з описом процесу створення колекції */}
          <div className="how-it-works__card">
            <img
              src="/images/home-create-collection.png"
              alt="Create Collection"
            />
            <div className="how-it-works__card-content">
              <h3>Create Collection</h3>
              <p>
                Upload your work and setup your collection. Add a description,
                social links and floor price.
              </p>
            </div>
          </div>
          {/* Картка з описом процесу початку заробітку */}
          <div
            className="how-it-works__card"
            onClick={handleCreateAccountClick}
          >
            <img
              src="/images/home-start-earning.png"
              alt="Start Earning"
            />
            <div className="how-it-works__card-content">
              <h3>Start Earning</h3>
              <p>
                Choose between auctions and fixed-price listings. Start earning
                by selling your NFTs or trading others.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка для прокручування сторінки вгору */}
      <ScrollToTopButton /> 
    </>
  );
};

export default Home;
