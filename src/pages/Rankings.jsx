import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rankings.css';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Rankings = () => {
  const [artists, setArtists] = useState([]); // Стан для зберігання списку артистів
  const [sortCriteria, setSortCriteria] = useState('totalSales'); // Критерій сортування
  const [error, setError] = useState(null); // Стан для помилок
  const navigate = useNavigate(); // Хук для навігації

  useEffect(() => {
    fetch('/artists.json') // Завантаження даних з JSON-файлу
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Обробка помилок мережі
        }
        return response.json();
      })
      .then(data => {
        const sortedArtists = [...data.artists].sort((a, b) => {
          if (sortCriteria === 'totalSales') {
            return b.totalSales - a.totalSales; // Сортування за загальними продажами
          } else if (sortCriteria === 'nftsSold') {
            return b.nftsSold - a.nftsSold; // Сортування за кількістю проданих NFT
          }
          return 0;
        });
        setArtists(sortedArtists); // Оновлення списку артистів
        setError(null); // Очистка помилок
      })
      .catch(error => {
        console.error('Error loading artists data:', error);
        setError('Failed to load artist data. Please try again later.'); // Встановлення повідомлення про помилку
      });
  }, [sortCriteria]); // Перезавантаження даних при зміні критерію сортування

  const handleRowClick = (artistId) => {
    navigate(`/nft/${artistId}`); // Перехід на сторінку художника при кліку на рядок таблиці
  };

  return (
    <div className="rankings-container">
      <h1 className="rankings-title">Top Creators</h1>
      <p className="rankings-info">Check out top ranking NFT artists on the NFT Marketplace.</p>
      <div className="sort-buttons">
        <button className="sort-button" onClick={() => setSortCriteria('nftsSold')}>Sort by NFTs Sold</button>
        <button className="sort-button" onClick={() => setSortCriteria('totalSales')}>Sort by Total Sales</button>
      </div>
      
      {error ? (
        <div className="error-message">{error}</div> // Показ повідомлення про помилку, якщо є
      ) : (
        <table className="rankings-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Artist</th>
              <th></th>
              <th>Change</th>
              <th>NFTs Sold</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist, index) => (
              <tr key={artist.id} onClick={() => handleRowClick(artist.id)}>
                <td>{index + 1}</td>
                <td>
                  <div className="artist-avatar">
                    <img src={artist.avatar} alt={artist.name} />
                  </div>
                </td>
                <td>{artist.name}</td>
                <td>
                  <span className={artist.rankChange > 0 ? 'rank-up' : artist.rankChange < 0 ? 'rank-down' : ''}>
                    {artist.rankChange > 0 ? `+${artist.rankChange}%` : artist.rankChange < 0 ? `${artist.rankChange}%` : 'No Change'}
                  </span>
                </td>
                <td>{artist.nftsSold}</td>
                <td>{artist.totalSales.toLocaleString()} ETH</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <ScrollToTopButton /> 
    </div>
  );
};

export default Rankings;
