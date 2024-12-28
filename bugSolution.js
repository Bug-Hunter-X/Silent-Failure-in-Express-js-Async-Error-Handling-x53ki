const express = require('express');
const app = express();

app.get('/', async (req, res, next) => {
  try {
    await someAsyncOperation();
    res.send('Hello, world!');
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

async function someAsyncOperation() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        reject(new Error('Something went wrong'));
      } else {
        resolve();
      }
    }, 1000);
  });
}