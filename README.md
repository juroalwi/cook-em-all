# <a href='https://jralvarezwindey-food-app.vercel.app'> Cook 'Em All </a>

Website: https://jralvarezwindey-food-app.vercel.app

## About the project

Single-page full-stack application that allows users to search recipes by name, filter and sort results, create new recipes, and view detailed information.

The application features a custom backend developed with Node.js, responsible for data handling and persistence, and a client-side interface that consumes this backend. When accessed through the public URL, data is served directly from the database.

The frontend is built as a SPA, with all styles implemented using pure CSS.

#### Recipes cards

<img src='./media/main.jpg'/>

#### Recipe detail

<img src='./media/recipe-detail.jpg'/>

#### Create recipe

<img src='./media/create-recipe.jpg'/>

## Technologies used

- JavaScript
- CSS
- HTML
- React
- Redux
- Node
- Express
- Sequelize
- PostgreSQL

## Getting started (localhost)

In case that you want to run the application locally, here is how you can do it:

- Install PostgreSQL and create a data base.
- Create an account at https://spoonacular.com and get your free api key.
- Clone repository in your computer.
- Create an `.env` file in `/server` folder. It must contain the following:

```
  API_KEY=<your_api_key>
  DB_USER=<your_postgres_username>
  DB_PASSWORD=<your_postgres_password>
  DB_NAME=<your_postgres_database_name>
  DB_HOST=localhost
```

- Install NodeJS (version >= 12.18.3) and npm (version >= 6.14.16).
- Execute `npm i` on `/client` and on `/server` folders.
- Execute `npm start` on `/client` folder to initialize backend.
- Execute `npm start` on `/server` folder to initialize frontend.
- Navigate to `http://localhost:5173` in your browser.
