const express = require('express');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const modelRoutes = require('./routes/modelRoutes');
const eventsController = require('./controllers/eventsController');

dotenv.config(); // Load environment variables from .env file

require('./config/passport'); // Set up Passport and Google strategy

const app = express();
const port = 3000;

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/auth', authRoutes); // Use authRoutes for /auth path
app.use(modelRoutes);

app.post('/track', eventsController.createEvent);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke!', error: err.message });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));