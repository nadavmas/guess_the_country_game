const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Guess The Country game is running on port ${PORT}`);
});
