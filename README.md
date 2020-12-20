# news-explorer-api

Серверная часть сервиса, в котором можно найти новости по запросу и сохранить в личном кабинете.

Репозиторий проекта доступен по ссылке <https://github.com/Boris-Madonov/news-explorer-api>

Требуется [Node.js](https://nodejs.org/) v12+ to run.

Запуск проекта и запуск проекта с hot-reload.

    npm run start
    npm run dev

## Доступы к ресурсу

Api доступно по ссылкам:

* <http://api.newsexplorer.students.nomoredomains.monster>

* <https://api.newsexplorer.students.nomoredomains.monster>

## Routes

* GET /users/me - получить информацию о пользователе;

* GET /articles - получить все сохраненные пользователем статьи;

* POST /articles - создать статью;

* DELETE /articles/articleId - удалить сохраненную статью;

* POST /signup - регистрация пользователя;

* POST /signin - авторизация пользователя;
