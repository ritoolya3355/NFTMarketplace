import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './NFTPage.css';
import CountdownTimer from '../components/CountdownTimer';

const NFTPage = () => {
  const { artistId } = useParams(); // Отримання параметра artistId з URL
  const [artist, setArtist] = useState(null); // Стан для зберігання даних про художника

  useEffect(() => {
    fetch('/artists.json') // Завантаження даних з JSON-файлу
      .then((response) => response.json())
      .then((data) => {
        const foundArtist = data.artists.find(
          (artist) => artist.id === parseInt(artistId), // Пошук художника за ID
        );
        setArtist(foundArtist); // Зберігання знайденого художника 
      })
      .catch((error) => console.error('Error loading artist data:', error)); // Обробка помилок
  }, [artistId]); // Перезавантаження даних при зміні artistId

  if (!artist) return <div>Loading...</div>; // Показати "Loading..." якщо дані про художника ще не завантажені

  return (
    <div className="nft-page-container">
      <div className="artist-market-container">
        <div className="nft-artist-info">
          <div>
            <img
              src={artist.avatar}
              alt={artist.name}
              className="nft-page-avatar"
            />
            <h1 className="nft-page-title">{artist.name}</h1>
          </div>
          <p className="nft-page-biography">{artist.biography}</p>
        </div>
        <div className="timer-container">
          <CountdownTimer targetDate="2024-08-17T00:00:00" /> {/* Таймер зворотного відліку до дати */}
          <Link to="/marketplace" className="to-marketplace-button">
            Go to Marketplace
          </Link> {/* Посилання на сторінку Marketplace */}
        </div>
      </div>
      <div className="artist-tags">
        {artist.tags.map((tag, index) => (
          <span key={index} className="tag">{`#${tag}`}</span> // Виведення тегів
        ))}
      </div>
      <div className="nft-page-works">
        <h2>More from this artist</h2>
        <div className="works-gallery">
          {artist.works.map((work, index) => (
            <div key={index} className="work-item">
              <Link to={`/marketplace?workId=${work.id}`}>
                <img
                  src={work.image}
                  alt={`Work ${index + 1}`}
                  className="work-image"
                />
              </Link>
              <div className="work-info">
                <h3 className="work-title">{work.title}</h3>
                <p className="work-price">Price:<br />{work.priceETH} ETH</p>
                <p className="work-highest-bid">
                  Highest Bid: <br />{work.highestBidWETH} wETH
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
