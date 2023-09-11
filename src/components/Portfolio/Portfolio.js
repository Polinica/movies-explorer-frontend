import "./Portfolio.css";

function Portfolio() {
  return (
    <article className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://polinica.github.io/how-to-learn/"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт. Научиться учиться. 1 и 2 сприн "Яндекс.Практикум".
            Страница использует файловую структуру CSS по методолгии БЭМ.
            Вёрстка страницы с приминением Keyframe, анимации и сылок.
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://polinica.github.io/russian-travel/"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт. Это учебный проект, посвященный путешествиям по
            России. Подготовлен на основе макета из Фигмы для ширины экрана 320,
            768, 1024 и 1280. Использованы HTML и CSS. Картинки оптимизированы
            для ускорения загрузки сайта.
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://polinica.github.io/mesto/"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение. Приложение с&nbsp;фотографиями
            и&nbsp;лайками Mesto, включающий фронтенд и бэкенд части приложения
            со следующими возможностями: авторизации и регистрации
            пользователей, операции с карточками и пользователями. Бэкенд
            расположите в директории backend/, а фронтенд - в frontend/.
          </a>
        </li>
      </ul>
    </article>
  );
}

export default Portfolio;
