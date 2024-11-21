import express from 'express';
import router from './src/routes/route.js';
const app = express();
app.use(express.json());
app.use('/images', express.static('images'));
app.use(router);
const PORT = 4100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
