import React, { useState, useEffect } from 'react';
import './Ratings.css'; // Імпорт стилів для компонента Ratings

const Ratings = () => {
  // Ініціалізація стану для зберігання даних про рейтинги
  const [data, setData] = useState({
    totalSales: 0, // Початкове значення для загальних продажів
    auctions: 0,   // Початкове значення для аукціонів
    artists: 0,    // Початкове значення для художників
  });

  // Виконання ефекту після рендерингу компонента
  useEffect(() => {
    // Виконання запиту до тестового API
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        // Перевірка на успішність запиту
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Перетворення відповіді у формат JSON
        return response.json();
      })
      .then((data) => {
        // Оновлення стану компонента з імітованими даними
        setData({
          totalSales: 240,  // Імітоване значення для загальних продажів
          auctions: 145,    // Імітоване значення для аукціонів
          artists: 467,     // Імітоване значення для художників
        });
      })
      .catch((error) => {
        // Обробка помилок запиту
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Порожній масив залежностей означає, що ефект виконується тільки один раз після першого рендерингу компонента

  return (
    <div className="ratings-container">
      {/* Блок для відображення загальних продажів */}
      <div className="rating-box">
        <h2>{data.totalSales}k+</h2> {/* Відображення значення загальних продажів */}
        <p>Total Sales</p> {/* Опис показника */}
      </div>
      {/* Блок для відображення кількості аукціонів */}
      <div className="rating-box">
        <h2>{data.auctions}k+</h2> {/* Відображення значення аукціонів */}
        <p>Auctions</p> {/* Опис показника */}
      </div>
      {/* Блок для відображення кількості художників */}
      <div className="rating-box">
        <h2>{data.artists}k+</h2> {/* Відображення значення художників */}
        <p>Artists</p> {/* Опис показника */}
      </div>
    </div>
  );
};

export default Ratings;
