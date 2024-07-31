import React, { useState } from 'react';
import Slider from 'react-slick';
import './TrendingCollection.css'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const TrendingCollection = () => {
  // Стан для відстеження розгорнутої колекції
  const [expandedCollection, setExpandedCollection] = useState(null);

  // Обробник для розгортання/згортання колекції
  const handleExpandCollection = (index) => {
    if (expandedCollection === index) {
      setExpandedCollection(null); // Якщо колекція вже розгорнута, згортати її
    } else {
      setExpandedCollection(index); // Інакше розгортати нову колекцію
    }
  };

  // Дані для колекцій
  const collections = [
    {
      mainImage: './src/images/animals_dog_big.png',
      images: [
        './src/images/animals_cat_small.png',
        './src/images/animals_bear_small.png',
      ],
      additionalCount: 25,
      name: 'DSGN Animals',
      authorAvatar: './src/images/Ava_trendColl1.svg',
      authorName: 'MrFox',
    },
    {
      mainImage: './src/images/mushrooms1_big.png',
      images: [
        './src/images/mushrooms2_small.png',
        './src/images/mushrooms3_small.png',
      ],
      additionalCount: 33,
      name: 'Magic Mushrooms',
      authorAvatar: './src/images/Ava_trendColl2.svg',
      authorName: 'Shroomie',
    },
    {
      mainImage: './src/images/machines1_big.png',
      images: [
        './src/images/machines2_small.png',
        './src/images/machines3_small.png',
      ],
      additionalCount: 57,
      name: 'Disco Machines',
      authorAvatar: './src/images/Ava_trendColl3.svg',
      authorName: 'BeKind2Robots',
    },
  ];

  // Налаштування для слайдера
  const settings = {
    dots: true, // Відображення точок пагінації
    infinite: true, // Нескінченна прокрутка
    speed: 500, // Швидкість анімації
    slidesToShow: 3, // Кількість слайдів на екрані для десктопів
    slidesToScroll: 1, // Кількість слайдів для прокрутки
    responsive: [
      {
        breakpoint: 1024, // Точки зламу для планшетів
        settings: {
          slidesToShow: 2, // Кількість слайдів на екрані для планшетів
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // Точки зламу для мобільних пристроїв
        settings: {
          slidesToShow: 1, // Кількість слайдів на екрані для мобільних пристроїв
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="trending-collection">
      <h2>Trending Collection</h2>
      <p>Checkout our weekly updated trending collection.</p>
      <Slider {...settings} className="collection-container">
        {collections.map((collection, index) => (
          <div className="collection-card" key={index}>
            <div className="collection-main-image">
              <img
                src={collection.mainImage}
                alt={`Main of ${collection.name}`}
              />
            </div>
            <div className="collection-preview">
              <div className="preview-images">
                <img
                  src={collection.images[0]}
                  alt={`Preview of ${collection.name} 1`}
                />
                <img
                  src={collection.images[1]}
                  alt={`Preview of ${collection.name} 2`}
                />
                <div
                  className="more-images"
                  onClick={() => handleExpandCollection(index)}
                >
                  <span>{collection.additionalCount} +</span>
                </div>
              </div>
            </div>
            <h3>{collection.name}</h3>
            <div className="author-info">
              <img
                className="author-avatar"
                src={collection.authorAvatar}
                alt={`Avatar of ${collection.authorName}`}
              />
              <p>{collection.authorName}</p>
            </div>
            {expandedCollection === index && (
              <div className="full-collection">
                <div onClick={() => handleExpandCollection(index)}>
                  <img
                    src="./src/images/mushrooms2_small.png"
                    alt="photo-collection1"
                  />
                </div>
                <div onClick={() => handleExpandCollection(index)}>
                  <img
                    src="./src/images/mushrooms3_small.png"
                    alt="photo-collection1"
                  />
                </div>
                <div onClick={() => handleExpandCollection(index)}>
                  <img
                    src="./src/images/animals_cat_small.png"
                    alt="photo-collection1"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TrendingCollection;
