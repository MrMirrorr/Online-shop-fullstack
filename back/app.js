import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
	authRoutes,
	uploadRoutes,
	userRoutes,
	categoryRoutes,
	productRoutes,
	commentRoutes,
	cartRoutes,
	cartItemRoutes,
	orderRoutes,
	favoriteRoutes,
} from './routes/index.js';

mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('../front/build'));
app.use('/uploads', express.static('uploads'));

// auth
app.use('/api/auth', authRoutes);
// upload
app.use('/api/upload', uploadRoutes);
// user
app.use('/api/users', userRoutes);
// category
app.use('/api/categories', categoryRoutes);
// product
app.use('/api/products', productRoutes);
// comment
app.use('/api/products', commentRoutes);
// cart
app.use('/api/cart', cartRoutes);
// cart item
app.use('/api/items', cartItemRoutes);
// order
app.use('/api/orders', orderRoutes);
// favorite
app.use('/api/favorites', favoriteRoutes);
// currency rates api
app.get('/api/currency-rates', async (_, res) => {
	try {
		const response = await axios.get(
			'https://www.agroprombank.com/xmlinformer.php?type=official',
		);
		res.set('Content-Type', 'text/xml');
		res.send(response.data);
	} catch (error) {
		console.error('Error fetching currency rates', error);
		res.status(500).send('Error fetching currency rates');
	}
});

app.get('*', (_, res) => {
	res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
});

app.listen(port, (err) =>
	err ? console.log('Server error', err) : console.log(`Server OK | Port: ${port}`),
);
