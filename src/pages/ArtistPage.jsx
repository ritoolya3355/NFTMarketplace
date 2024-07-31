import React, { useState } from 'react';
import artistData from './artistData'; // Імпорт даних художника
import './ArtistPage.css';

const ArtistPage = () => {
  // Розпаковуємо дані художника з об'єкту artistData
  const {
    name,
    avatarUrl,
    coverPhotoUrl,
    volume,
    nftsSold,
    followers,
    biography,
    socialLinks,
    works,
  } = artistData;

  // Створюємо стан для завантажених файлів
  const [uploadedWorks, setUploadedWorks] = useState([]);
  // Створюємо стан для видимості форми завантаження
  const [showUploadForm, setShowUploadForm] = useState(false);
  // Створюємо стан для нової роботи
  const [newWork, setNewWork] = useState({
    title: '',
    price: '',
    file: null,
  });

  // Функція для обробки завантаження файлів
  const handleFileChange = (event) => {
    setNewWork({
      ...newWork,
      file: event.target.files[0],
    });
  };

  // Функція для обробки зміни назви роботи
  const handleTitleChange = (event) => {
    setNewWork({
      ...newWork,
      title: event.target.value,
    });
  };

  // Функція для обробки зміни ціни роботи
  const handlePriceChange = (event) => {
    setNewWork({
      ...newWork,
      price: event.target.value,
    });
  };

  // Функція для обробки відправлення форми
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newWork.file && newWork.title && newWork.price) {
      const newWorkData = {
        id: works.length + uploadedWorks.length + 1, // Унікальний id
        title: newWork.title, // Назва роботи
        imageUrl: URL.createObjectURL(newWork.file), // URL для завантаженого файлу
        price: newWork.price, // Ціна роботи
        highestBid: '0 ETH', // Початкова найвища ставка
      };
      setUploadedWorks([...uploadedWorks, newWorkData]);
      setNewWork({
        title: '',
        price: '',
        file: null,
      });
      setShowUploadForm(false); // Закриваємо форму після успішного завантаження
    }
  };

  // Функція для показу/сховання форми завантаження
  const toggleUploadForm = () => {
    setShowUploadForm((prevState) => !prevState);
  };

  return (
    <div>
      <main>
        {/* Інформація про художника */}
        <section className="artist-info">
          <div className="cover-photo">
            <img src={coverPhotoUrl} alt="Cover Photo" />
          </div>
          <div className="profile-details">
            <img className="avatar" src={avatarUrl} alt="Artist Avatar" />
            <div className="artist-name-buttons">
              <h1>{name}</h1>
              <div className="buttons">
                <button className="btn-sign-up">Create Collection</button>
                <button className="btn-sign-up" onClick={toggleUploadForm}>
                  Upload New Work
                </button>
              </div>
            </div>
            <div className="counters">
              <div className="counter">
                <p>{volume}</p>
                <h3>Volume</h3>
              </div>
              <div className="counter">
                <p>{nftsSold}</p>
                <h3>NFTs Sold</h3>
              </div>
              <div className="counter">
                <p>{followers}</p>
                <h3>Followers</h3>
              </div>
            </div>
            <div className="biography">
              <h2>Bio</h2>
              <p>{biography}</p>
            </div>
            <p className="links-title">Links</p>
            <div className="social-links">
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="./src/images/link-web.svg" alt="web" />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="./src/images/link-youtube.svg" alt="youtube" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="./src/images/link-twitter.svg" alt="twitter" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="./src/images/link-instagram.svg" alt="instagram" />
              </a>
            </div>
          </div>
        </section>

        {/* Форма завантаження нової роботи */}
        {showUploadForm && (
          <section className="upload-form">
            <h2>Upload New Work</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={newWork.title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  value={newWork.price}
                  onChange={handlePriceChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="file">Select Image:</label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
              </div>
              <button className="btn-upload" type="submit">
                Add Work
              </button>
            </form>
          </section>
        )}

        {/* Відображення робіт художника */}
        <section className="artist-works">
          <div className="works-counter">
            <p>Created: {works.length + uploadedWorks.length}</p>
            <p>Owned: 0</p>
            <p>Collection: 0</p>
          </div>
          <div className="works-container">
            {[...works, ...uploadedWorks].map((work) => (
              <div className="work-card-ap" key={work.id}>
                <img src={work.imageUrl} alt={work.title} />
                <h3>{work.title}</h3>
                <div className="author-info">
                  <img
                    className="author-avatar"
                    src={avatarUrl}
                    alt="Author Avatar"
                  />
                  <p>{name}</p>
                </div>
                <div className="work-details">
                  <p>
                    <span>Price:</span> <br /> {work.price}
                  </p>
                  <p>
                    <span>Highest Bid:</span> <br />
                    {work.highestBid}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArtistPage;
