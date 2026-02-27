# <a href='https://jralvarezwindey-food-app.vercel.app'> Cook 'Em All </a>

## About the project

A single-page full-stack application that enables users to search recipes by
name, as well as filter and sort results. The platform also supports creating
new recipes and viewing detailed information for each recipe.

The application includes a custom backend built with Node.js, responsible for
data processing, storage, and persistence. The client-side interface consumes
this backend to deliver a seamless user experience.

Recipe data is primarily fetched from  
<a href='https://spoonacular.com/food-api'>Spoonacular</a>.
To ensure reliability, the system implements a fallback mechanism that
backfills and stores a set of default recipes in the local database, allowing
continued functionality if the external API becomes unavailable.

#### Recipes cards

<img src='/images/main.jpg'/>

#### Recipe detail

<img src='/images/recipe-detail.jpg'/>

#### Create recipe

<img src='/images/create-recipe.jpg'/>

## Technologies used

- JavaScript
- CSS
- HTML
- React
- Redux
- Tailwind
- Node
- Express
- Sequelize
- PostgreSQL

## Run locally

- Install PostgreSQL and create a data base.
- Create an account at https://spoonacular.com and get your free API key (this is optional, the backend handles data backfilling in case API is not available).
- Clone repository in your computer.
- Create an `.env` file in `/server` folder. It must contain the following:

```
API_KEY=<your_api_key>
DB_URL=postgres://<your_pg_username>:<your_pg_password>@localhost/<your_pg_db_name>
```

- Install NodeJS (version >= 22.15.1) and npm (version >= 10.9.2).
- Execute `npm install` on `/client` and on `/server` folders.
- Execute `npm start` on `/client` folder to initialize backend.
- Execute `npm start` on `/server` folder to initialize frontend.
- Navigate to `http://localhost:5173` in your browser.
