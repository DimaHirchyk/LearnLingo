## 📚 Проєкт "Пошук Вчителів" (Pet Project)

### 🔗 Посилання на проєкт

- **Макет (Figma):** [Переглянути Figma-файл](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0)
- **Технічне завдання (ТЗ):** [Переглянути документ](https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?tab=t.0)

У цьому проєкті я реалізував:

- Динамічне завантаження даних та інтеграцію з **Firebase Realtime Database**.
- Комплексну обробку асинхронних операцій та помилок.
- Оптимізацію роботи з **Redux**, щоб уникнути "гонки даних" при ініціалізації.

---

### 💻 Технологічний стек

**Фронтенд:** React & TypeScript

> Основа інтерфейсу, функціональні компоненти та статична типізація для надійності коду.

**Управління станом:** Redux Toolkit (RTK)

> Централізоване керування станом, спрощення потоку даних та асинхронних операцій.

**Стилізація:** Tailwind CSS

> Utility-first фреймворк для швидкого створення адаптивного дизайну та бібліотеку shadcn/ui для швидкої стилізації деяких компонентів.

**Бекенд / База даних:** Firebase Realtime Database

> Зберігання даних користувачів та улюблених вчителів із синхронізацією в реальному часі.

**Аутентифікація:** Firebase Auth

> Керування автентифікацією користувачів та забезпечення безпеки даних.

---

### 🛠️ Архітектура та реалізація

1. **Управління станом (Redux Toolkit)**

   - **Auth Slice:** керує станом авторизації користувача (userId, email, токен, isRefreshing).
   - **Teacher Slice:** зберігає повний список вчителів, відфільтрований список, displayLimit та currentFilters.
   - **Favorites Slice:** керує улюбленими вчителями та синхронізацією з Firebase.

2. **Реалізація даних у реальному часі (Firebase)**

   - Дані улюблених зберігаються за шляхом `userFavorites/{userId}`.
   - **startListeningForFavorites:** підписка на Firebase через `onValue`, автоматичне оновлення стану Redux.
   - **toggleFavoriteDB:** зміна даних у базі синхронізується зі станом Redux через слухача.

3. **Критичні моменти ініціалізації ("Уникнення гонки даних")**

   - Використання централізованої ініціалізації в `App.tsx` (`dispatch(refreshUser())` та `dispatch(getTeachers())`).
   - Забезпечується безпечне використання `favoritesIds` при рендері компоненту `Favorites.tsx`.

4. **Логіка відображення з лімітом (Favorites.tsx)**
   - Фільтрація повного масиву улюблених вчителів.
   - Використання `slice(0, displayLimit)` для пагінації.
   - Кнопка "Load more" відображається, якщо кількість улюблених перевищує поточний ліміт.

---

### 📫 Контакти

<p align="left">
    <a href="mailto:dimzuk04@gmail.com">
        <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/gmail.svg" alt="Email" height="30" width="40" />
    </a>
    <a href="https://t.me/heroin655" target="_blank">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg" alt="Telegram" height="30" width="40" />
    </a>
    <a href="https://www.linkedin.com/in/dmytrohirchuk/" target="_blank">
        <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" height="30" width="40" />
    </a>
</p>
