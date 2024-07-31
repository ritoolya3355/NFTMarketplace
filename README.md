# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Опис / Description

Макет дизайну взято з https://www.figma.com/design/QLs7EA0YHu6G2246ZPwQvZ/NFT-Marketplace-Template---Create-an-NFT-website-in-minutes-(Community)

Design mockup taken from https://www.figma.com/design/QLs7EA0YHu6G2246ZPwQvZ/NFT-Marketplace-Template---Create-an-NFT-website-in-minutes-(Community)

___MTF Marketplace___ має головну сторінку, на яку реалізовано переходи з будь-якої сторінки при натисканні на _лого_. Компоненти _header_ і _footer_ присутні на всіх сторінках магазину.

___MTF Marketplace___ has a main page, which can be navigated to from any page by clicking on the _logo_. _Header_ and _footer_ components are present on all pages of the store.

Header має меню і кнопку _login_, що дозволяє зайти у свій кабінет (email: test@example.com , Password: password123). Для прикладу служить сторінка _/artist_, де реалізовано функціонал завантаження нової роботи, через кнопку _upload new work_. Також можна вийти з кабінету - _logout_. Реалізовано запит до курсу криптовалют з використанням [CoinGecko API](https://api.coingecko.com/api/v3/simple/price).

Header has a menu and a _login_ button that allows you to enter your account (email: test@example.com , Password: password123). For example, there is a _/artist_ page where the functionality for uploading a new work is implemented through the _upload new work_ button. You can also log out - _logout_. A request for cryptocurrency exchange rates is implemented using [CoinGecko API](https://api.coingecko.com/api/v3/simple/price).

Footer має спільну основу з header - лого і меню, але доповнений лінками до соціальних мереж та формою підписки на розсилку.

Footer has the same base as the header - logo and menu, but it is complemented with links to social networks and a subscription form.

Головна сторінка містить розділи:
1. **Discover digital art & Collect NFTs** - де реалізовано форму реєстрації через кнопку get started та умовний лічильник проданих робіт та зареєстрованих художників.
2. **Trending Collection** - де реалізовано безкінечну прокрутку слайдера з колекціями і розгортання інших робіт при натиску на останнє фото з вказуванням кількості робіт у колекції.
3. **Форма підписки на розсилку**, що повторюється в footer.
4. **Top Creators** - де реалізовано перехід до сторінки рейтингів художників при натиску на кнопку View Rankings, а також перехід на сторінку художника при натиску на його картку.
5. **Баннер з лічильником відліку часу** для прикладу до 17.08.2024, коли закінчиться аукціон.
6. **How it works** - де реалізовано перехід до підключення гаманця криптовалют через натискання на картку Setup Your Wallet та перехід до сторінки Create Account через натискання на картку Start Earning.

The main page contains sections:
1. **Discover digital art & Collect NFTs** - where a registration form is implemented through the get started button and a conditional counter of sold works and registered artists.
2. **Trending Collection** - where infinite scrolling of the slider with collections is implemented, and other works are displayed when clicking on the last photo with an indication of the number of works in the collection.
3. **Subscription form**, which is repeated in the footer.
4. **Top Creators** - where you can navigate to the artist ranking page by clicking the View Rankings button, and navigate to the artist's page by clicking on their card.
5. **Banner with countdown timer** for example until 17.08.2024, when the auction will end.
6. **How it works** - where you can navigate to the cryptocurrency wallet connection by clicking on the Setup Your Wallet card and navigate to the Create Account page by clicking on the Start Earning card.

Сторінка **Marketplace** містить картки з роботами художників, що сортується за ціною, художником або назвою роботи. При натиску на картку роботи здійснюється перехід на сторінку цього художника. Також внизу сторінки є пагінація для зручного переходу по сторінках продажів.

The **Marketplace** page contains cards with artists' works, which can be sorted by price, artist, or work name. Clicking on a work card navigates to that artist's page. There is also pagination at the bottom of the page for easy navigation through the sales pages.

Сторінка **Rankings** містить рейтинг художників, який можна відфільтрувати по _NFTs Sold_ і _Total Sales_. Також реалізовано перехід на сторінку художника при натисканні на його рядок.

The **Rankings** page contains artist rankings, which can be filtered by _NFTs Sold_ and _Total Sales_. You can also navigate to the artist's page by clicking on their row.

Сторінка **Connect Your Wallet** реалізовано кнопку підключення _Metamask_ через функцію _connectMetaMask_.

The **Connect Your Wallet** page implements a button to connect _Metamask_ using the _connectMetaMask_ function.

Сторінка **NFTPage** це сторінка робіт художника, де реалізовано лічильник до кінця аукціону з кнопкою переходу до marketplace та перехід до нього здійснено через натиск на картку роботи.

The **NFTPage** is the artist's works page, where a countdown timer is implemented until the end of the auction with a button to navigate to the marketplace, and navigation to it is done by clicking on a work card.

## Встановлення / Installation

1. Клонуйте репозиторій:
    ```sh
    git clone https://github.com/ritoolya3355/NFTMarketplace
    ```
2. Перейдіть у директорію проекту:
    ```sh
    cd NFTMarketplace
    ```
3. Встановіть залежності:
    ```sh
    npm install
    ```

1. Clone the repository:
    ```sh
    git clone https://github.com/ritoolya3355/NFTMarketplace
    ```
2. Navigate to the project directory:
    ```sh
    cd NFTMarketplace
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Використання / Usage

Команди для запуску проекту:

```sh
npm start
