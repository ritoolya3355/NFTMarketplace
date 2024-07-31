import React, { useState } from 'react'; // Імпорт React та useState для управління станом
import Web3 from 'web3'; // Імпорт Web3 для взаємодії з Ethereum
import './ConnectWallet.css'; // Імпорт стилів для компонента

const ConnectWallet = () => {
  const [account, setAccount] = useState(''); // Стан для зберігання підключеного акаунта

  // Функція для підключення до MetaMask
  const connectMetaMask = async () => {
    if (window.ethereum) { // Перевіряємо, чи є MetaMask або інше Ethereum-розширення
      try {
        const web3 = new Web3(window.ethereum); // Ініціалізуємо Web3 з доступом до Ethereum
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Запитуємо доступ до акаунтів
        const accounts = await web3.eth.getAccounts(); // Отримуємо акаунти
        setAccount(accounts[0]); // Оновлюємо стан з підключеним акаунтом
      } catch (error) {
        console.error('Error connecting to MetaMask:', error); // Логування помилок
        alert('Failed to connect to MetaMask'); // Повідомлення про помилку
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask.'); // Повідомлення, якщо MetaMask не знайдено
    }
  };

  return (
    <div className="connect-wallet-page">
      <div className="image-container">
        {/* Зображення для сторінки підключення гаманця */}
        <img src="../src/images/Createaccount.svg" alt="highlighted" />
      </div>
      <div className="content-container">
        <h1>Connect Your Wallet</h1>
        <p>To fully utilize our NFT marketplace, please connect your wallet using one of the following options:</p>
        <div className="wallet-buttons">
          {/* Кнопка для підключення через MetaMask */}
          <a className="wallet-button" onClick={connectMetaMask}>
            <img src="/src/images/Metamask.svg" alt="Metamask" />
            Metamask
          </a>
          {/* Кнопка для підключення через Wallet Connect */}
          <a className="wallet-button">
            <img src="/src/images/WalletConnect.svg" alt="Wallet Connect" />
            Wallet Connect
          </a>
          {/* Кнопка для підключення через Coinbase */}
          <a className="wallet-button">
            <img src="/src/images/Coinbase.svg" alt="Coinbase" />
            Coinbase
          </a>
        </div>
        {account && <p>Connected account: {account}</p>} {/* Показує підключений акаунт */}
      </div>
    </div>
  );
};

export default ConnectWallet;
