import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/db.js';
import userRoutes from './routes/user.js';
import accountRoutes from './routes/subscriberRoutes.js'; 
import voucherRoutes from './routes/serialnumber.js'; 
import activationCodeRoute from './routes/activationcode.js';
import helpRoute from './routes/help.js';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.get('/test', (req, res) => {
  res.send('Hello depuis backend');
});

app.use('/users', userRoutes);
app.use('/api', accountRoutes);
app.use('/serialnumber', voucherRoutes);
app.use('/activationcode', activationCodeRoute)
app.use('/help', helpRoute)

export default app;
