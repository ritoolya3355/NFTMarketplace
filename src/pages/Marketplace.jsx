import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Marketplace.css';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Marketplace = () => {
  const location = useLocation(); // Хук для отримання інформації про URL
  const [works, setWorks] = useState([]); // Стан для зберігання всіх робіт
  const [sortedWorks, setSortedWorks] = useState([]); // Стан для зберігання відсортованих робіт
  const [sortBy, setSortBy] = useState('price'); // Стан для зберігання обраного критерію сортування
  const [currentPage, setCurrentPage] = useState(1); // Стан для зберігання поточної сторінки
  const worksPerPage = 9; // Кількість робіт на сторінці
  const [selectedWork, setSelectedWork] = useState(null); // Стан для зберігання вибраної роботи

  // Завантаження даних з JSON-файлу
  useEffect(() => {
    fetch('/artists.json')
      .then((response) => response.json())
      .then((data) => {
        const allWorks = data.artists.flatMap((artist) =>
          artist.works.map((work) => ({
            id: work.id,
            artistId: artist.id,
            name: artist.name,
            avatar: artist.avatar,
            title: work.title,
            price: work.priceETH,
            bid: work.highestBidWETH,
            image: work.image,
          })),
        );
        setWorks(allWorks); // Зберігання всіх робіт в стані
        setSortedWorks(allWorks); // Ініціалізація відсортованих робіт
      })
      .catch((error) =>
        console.error('Error loading data from jobs:', error),
      );
  }, []);

  // Сортування робіт відповідно до обраного критерію
  useEffect(() => {
    const sorted = [...works].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'author') return a.name.localeCompare(b.name);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
    setSortedWorks(sorted); // Оновлення відсортованих робіт
  }, [sortBy, works]);

  // Визначення вибраної роботи на основі параметра workId в URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const workId = queryParams.get('workId');
    if (workId) {
      const foundWork = works.find((work) => work.id === parseInt(workId));
      setSelectedWork(foundWork); // Зберігання вибраної роботи в стані
    }
  }, [location.search, works]);

  // Розрахунок індексів для пагінації
  const indexOfLastWork = currentPage * worksPerPage;
  const indexOfFirstWork = indexOfLastWork - worksPerPage;
  const currentWorks = sortedWorks.slice(indexOfFirstWork, indexOfLastWork);

  // Розрахунок загальної кількості сторінок
  const totalPages = Math.ceil(sortedWorks.length / worksPerPage);

  // Функція для зміни сторінки
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Рендеринг пагінації
  const renderPagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const getPaginationRange = () => {
      let start = 1;
      let end = totalPages;

      if (totalPages > 5) {
        if (currentPage < 4) {
          end = 5;
        } else if (currentPage > totalPages - 3) {
          start = totalPages - 4;
        } else {
          start = currentPage - 2;
          end = currentPage + 2;
        }
      }

      return { start, end };
    };

    const { start, end } = getPaginationRange();

    return (
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="pagination-arrow"
        >
          &lt;
        </button>
        {totalPages > 1 && (
          <>
            {start > 1 && (
              <>
                <button
                  onClick={() => paginate(1)}
                  className={currentPage === 1 ? 'active' : ''}
                >
                  1
                </button>
                {start > 2 && <span className="pagination-dots">...</span>}
              </>
            )}
            {pageNumbers.slice(start - 1, end).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            ))}
            {end < totalPages && (
              <>
                {end < totalPages - 1 && (
                  <span className="pagination-dots">...</span>
                )}
                <button
                  onClick={() => paginate(totalPages)}
                  className={currentPage === totalPages ? 'active' : ''}
                >
                  {totalPages}
                </button>
              </>
            )}
          </>
        )}
        <button
          onClick={() =>
            paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
          }
          disabled={currentPage === totalPages}
          className="pagination-arrow"
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="marketplace-container">
      <h1 className="marketplace-title">Browse Marketplace</h1>
      <p className="marketplace-description">
        Browse through more than 50k NFTs on the NFT Marketplace.
      </p>
      <div className="sorting-container">
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="price">Price</option>
          <option value="author">Artist</option>
          <option value="title">Work's Name</option>
        </select>
      </div>
      {selectedWork && (
        <div className="selected-work-details">
          <img
            src={selectedWork.image}
            alt={selectedWork.title}
            className="selected-work-image"
          />
          <div className="selected-work-info">
            <h2>{selectedWork.title}</h2>
            <p>Price: {selectedWork.price} ETH</p>
            <p>Highest Bid: {selectedWork.bid} wETH</p>
            <Link to={`/nft/${selectedWork.artistId}`}>
              <div className="author-info">
                <img
                  src={selectedWork.avatar}
                  alt={`Avatar of ${selectedWork.name}`}
                  className="author-avatar-mp"
                />
                <h3>{selectedWork.name}</h3>
              </div>
            </Link>
          </div>
        </div>
      )}
      <div className="works-gallery">
        {currentWorks.map((work, index) => (
          <Link key={index} to={`/nft/${work.artistId}`} className="work-card">
            <img
              src={work.image}
              alt={`Робота ${index + 1}`}
              className="work-image-mp"
            />
            <h4>{work.title}</h4>
            <div className="author-info">
              <img
                src={work.avatar}
                alt={`Аватар автора ${work.name}`}
                className="author-avatar-mp"
              />
              <h3>{work.name}</h3>
            </div>
            <div className="price-info">
              <p>Price: {work.price} ETH</p>
              <p>Highest Bid: {work.bid} wETH</p>
            </div>
          </Link>
        ))}
        <ScrollToTopButton />
      </div>
      {renderPagination()}
    </div>
  );
};

export default Marketplace;
