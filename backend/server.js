const express = require('express');
const { dataset } = require('./dataset');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());



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



//------------ ENDPOINTS ------------

// GET /game, returns a random country with 3 clues
app.get('/game', (req, res) => {
  if (!Array.isArray(dataset) || dataset.length === 0) {
    return res.status(500).json({ error: 'Dataset is not available.' });
  }

  const randomIndex = getRandomInt(dataset.length);
  const country = dataset[randomIndex];

  if (!country || !Array.isArray(country.clues) || country.clues.length < 3) {
    return res.status(500).json({ error: 'Invalid country data.' });
  }

  const clues = pickRandomClues(country.clues, 3);

  return res.json({
    id: String(randomIndex),
    clues,
  });
});


// POST /game/validate, validates the user's guess
app.post('/game/validate', (req, res) => {
  const { id, guess } = req.body || {};

  if (typeof id !== 'string' || typeof guess !== 'string') {
    return res.status(400).json({ error: 'Both id and guess must be provided as strings.' });
  }

  const index = Number.parseInt(id, 10);

  if (Number.isNaN(index) || index < 0 || index >= dataset.length) {
    return res.status(400).json({ error: 'Invalid game id.' });
  }

  const country = dataset[index];

  if (!country || typeof country.name !== 'string') {
    return res.status(500).json({ error: 'Country data is unavailable.' });
  }

  const isCorrect = normalizeName(country.name) === normalizeName(guess);

  return res.json({
    correct: isCorrect,
    correctName: country.name,
  });
});


//------------ ERROR HANDLING ------------
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'An unexpected error occurred.' });
});



//------------ START THE SERVER ------------
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Guess The Country API is running on port ${PORT}`);
});


