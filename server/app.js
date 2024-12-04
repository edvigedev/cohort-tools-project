const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const Student = require('./models/Student.js');
const Cohort = require('./models/Cohort.js');

const studentsRoutes = require('./routes/students.routes.js');
const cohortsRoutes = require('./routes/cohorts.routes.js');

const config = require('./config.js');

// LOAD ENVIRONMENT VARIABLES
const PORT = config.PORT;
const MONGO_URI = config.MONGO_URI;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

/*************
 * MONGODB
 *************/
// MongoDB connection string
mongoose.set('debug', true);

// Connect to MongoDB
mongoose
	.connect(MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.error('MongoDB connection error:', err));

// Test Connection
app.get('/test', async (req, res) => {
	const student = await Student.find({ firstName: 'Grace' });
	const cohort = await Cohort.find({ campus: 'Paris' });
	console.log('Student:', student);
	console.log('Cohort:', cohort);
	res.status(200).json(cohort);
});

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors({ origin: ['http://localhost:5173'] }));

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.get('/docs', (req, res) => {
	res.sendFile(__dirname + '/views/docs.html');
});

app.use('/api/cohorts', cohortsRoutes);
app.use('/api/students', studentsRoutes);

// START SERVER
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
