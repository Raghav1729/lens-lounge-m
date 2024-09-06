import express from 'express';

const app = express();
const PORT = process.env.FRONTEND_SERVICE_PORT || 3003;

app.get('/', (req, res) => {
  res.send('Frontend service is running');
});

app.listen(PORT, () => {
  console.log(`Frontend service listening on port ${PORT}`);
});
