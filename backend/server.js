const path = require('path');
const express = require('express');
const { getRandomCountry, getCountryById } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend'));

// serve static assets from the frontend folder (e.g. styles.css)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// parse urlencoded bodies
// extended: false means that the parser will not parse the body of the request
app.use(express.urlencoded({ extended: false }));

//------------ HELPER FUNCTIONS ------------

// getRandomInt, returns a random integer between 0 and max
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// pickRandomClues, returns 3 random clues from the given array
function pickRandomClues(clues, count = 3) {
  const indices = clues.map((_, index) => index);

  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = getRandomInt(i + 1);
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  const selectedIndices = indices.slice(0, count);
  return selectedIndices.map((index) => clues[index]);
}

// normalizeName, returns the name in lowercase and trimmed
function normalizeName(name) {
  return name.trim().toLowerCase();
}

// base view model for index.ejs so all expected variables are always defined
const baseViewModel = {
  countryId: null,
  clues: null,
  correct: undefined,
  correctName: null,
  error: null,
};

// renderIndex, renders the index page with the given overrides
function renderIndex(res, overrides = {}) {
  return res.render('index', { ...baseViewModel, ...overrides });
}

//------------ ENDPOINTS ------------

// GET /, renders the index page
app.get('/', (req, res) => {
  renderIndex(res);
});

// GET /game, returns a random country with 3 clues (from PostgreSQL)
app.get('/game', async (req, res, next) => {
  try {
    const country = await getRandomCountry();

    if (!country) {
      res.status(500);
      return renderIndex(res, { error: 'No countries found in the database.' });
    }

    const rawClues = Array.isArray(country.clues) ? country.clues : [];

    if (rawClues.length < 3) {
      res.status(500);
      return renderIndex(res, { error: 'Country data is incomplete.' });
    }

    const clues = pickRandomClues(rawClues, 3);

    return renderIndex(res, {
      countryId: String(country.id),
      clues,
    });
  } catch (err) {
    return next(err);
  }
});

// POST /game/validate, validates the user's guess (against PostgreSQL)
app.post('/game/validate', async (req, res, next) => {
  try {
    const { id, guess } = req.body || {};

    if (typeof id !== 'string' || typeof guess !== 'string') {
      res.status(400);
      return renderIndex(res, { error: 'Both id and guess must be provided.' });
    }

    const numericId = Number.parseInt(id, 10);

    if (Number.isNaN(numericId) || numericId <= 0) {
      res.status(400);
      return renderIndex(res, { error: 'Invalid game id. Please start a new game.' });
    }

    const country = await getCountryById(numericId);

    if (!country || typeof country.name !== 'string') {
      res.status(500);
      return renderIndex(res, { error: 'Country data is unavailable. Please try again.' });
    }

    const isCorrect = normalizeName(country.name) === normalizeName(guess);

    return renderIndex(res, {
      correct: isCorrect,
      correctName: country.name,
    });
  } catch (err) {
    return next(err);
  }
});


//------------ ERROR HANDLING ------------

// handle unexpected errors
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('Unexpected error:', err);
  res.status(500);
  renderIndex(res, { error: 'An unexpected error occurred.' });
});


//------------ START THE SERVER ------------
// start the server on the port specified in the PORT environment variable
// if the PORT environment variable is not set, use port 3000
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Guess The Country game is running on port ${PORT}`);
});


