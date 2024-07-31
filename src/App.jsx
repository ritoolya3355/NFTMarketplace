import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Імпорт необхідних компонентів для маршрутизації
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './AuthContext'; // Імпорт провайдера контексту для аутентифікації
import HomePage from './pages/HomePage';
import RegisterArtist from './pages/CreateAccount'; 
import ArtistPage from './pages/ArtistPage';
import LoginPage from './pages/LogInPage';
import Rankings from './pages/Rankings'; 
import Marketplace from './pages/Marketplace'; 
import ProtectedRoute from './components/ProtectedRoute'; // Імпорт захищеного маршруту для сторінки художника
import NFTPage from './pages/NFTPage';
import ConnectWallet from './pages/ConnectWallet'; 

const App = () => (
  <Router> {/* Основний компонент маршрутизатора */}
    <AuthProvider> {/* Обгортаємо додаток в провайдер аутентифікації */}
      <Header /> {/* Компонент заголовка, який буде відображатися на всіх сторінках */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Маршрут для домашньої сторінки */}
        <Route path="/register" element={<RegisterArtist />} /> {/* Маршрут для реєстрації художника */}
        <Route path="/artist" element={<ProtectedRoute element={<ArtistPage />} />} /> {/* Захищений маршрут для сторінки художника */}
        <Route path="/signin" element={<LoginPage />} /> {/* Маршрут для сторінки входу */}
        <Route path="/rankings" element={<Rankings />} /> {/* Маршрут для рейтингової сторінки */}
        <Route path="/marketplace" element={<Marketplace />} /> {/* Маршрут для маркетплейсу */}
        <Route path="/nft/:artistId" element={<NFTPage />} /> {/* Маршрут для сторінки NFT з параметром artistId */}
        <Route path="/connect-wallet" element={<ConnectWallet />} /> {/* Додаємо маршрут для сторінки підключення гаманця */}
      </Routes>
      <Footer /> {/* Компонент футера, який буде відображатися на всіх сторінках */}
    </AuthProvider>
  </Router>
);

export default App;
