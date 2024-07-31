import React, { useEffect, useState } from 'react'; // Імпорт React і хуків useEffect та useState
import './CountdownTimer.css'; // Імпорт стилів для таймера

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = Date.parse(targetDate) - Date.parse(new Date()); // Обчислення різниці між поточною датою і цільовою датою
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)), // Кількість днів, що залишились
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24), // Кількість годин, що залишились
        minutes: Math.floor((difference / (1000 * 60)) % 60), // Кількість хвилин, що залишились
        seconds: Math.floor((difference / 1000) % 60), // Кількість секунд, що залишились
      };
    } else {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft()); // Використання useState для зберігання часу, що залишився

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft()); // Оновлення часу кожну секунду
    }, 1000);

    return () => clearInterval(timer); // Очищення інтервалу при демонтажі компонента
  }, [targetDate]);

  return (
    <div className="countdown-timer">
      <h2>Auction ends in:</h2>
      <div className="timer">
        {Object.keys(timeLeft).length ? (
          <>
            <div className="timer-item">
              <div className='timer-digits'>{String(timeLeft.days).padStart(2, '0')}</div> {/* Відображення днів */}
              <p>days</p>
            </div>
            <div className="colon">:</div>
            <div className="timer-item">
              <div className='timer-digits'>{String(timeLeft.hours).padStart(2, '0')}</div> {/* Відображення годин */}
              <p>hours</p>
            </div>
            <div className="colon">:</div>
            <div className="timer-item">
              <div className='timer-digits'>{String(timeLeft.minutes).padStart(2, '0')}</div> {/* Відображення хвилин */}
              <p>minutes</p>
            </div>
            <div className="colon">:</div>
            <div className="timer-item">
              <div className='timer-digits'>{String(timeLeft.seconds).padStart(2, '0')}</div> {/* Відображення секунд */}
              <p>seconds</p>
            </div>
          </>
        ) : (
          <span>The auction is over!</span> // Повідомлення про закінчення аукціону
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
