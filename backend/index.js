const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const userRoute = require('./routes/userRoute');
const loginRoute = require('./routes/loginRoute');
const authMiddleware = require('./middleware/jwtauthmiddleware');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser()); // 🔥 REQUIRED
//app.use(cors());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

connectDb();

// ✅ mount BEFORE listen (best practice)
app.use('/api/user', authMiddleware, userRoute);
app.use('/api',loginRoute);
// app.get('/api', (req, res) => {
//   res.json({ message: 'Hello from Node backend' });
// });

app.listen(5000, () => {
  console.log('Server running on port 5000');
});