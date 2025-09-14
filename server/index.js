import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/content', contentRoutes);

app.get('/test', (req, res) => {
   res.status(200).send('Hello world!')
})

app.use((req, res) => {
   res.status(404).send('Resource not found');
});

mongoose
   .connect(MONGO_URI)
   .then(() => {
      console.log('MongoDB Connected Successfully!!');
   })
   .catch((err) => {
      console.error('MongoDB Connection Error:', err);
   });

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
   console.error(err.stack)
   res.status(500).send(`Something went wrong on the server: ${err.message}`)
})
