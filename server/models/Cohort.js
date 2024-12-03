const mongoose = require('mongoose');

// Allowed values for program, format, and campus
const allowedPrograms = ['Web Dev', 'UX/UI', 'Data Analytics', 'Cybersecurity'];
const allowedFormats = ['Full Time', 'Part Time'];
const allowedCampuses = [
	'Madrid',
	'Barcelona',
	'Miami',
	'Paris',
	'Berlin',
	'Amsterdam',
	'Lisbon',
	'Remote',
];

// Cohort Schema
const cohortSchema = new mongoose.Schema({
	cohortSlug: { type: String, required: true, unique: true }, // Unique identifier for the cohort
	cohortName: { type: String, required: true }, // Name of the cohort
	program: {
		type: String,
		enum: allowedPrograms, // Validate against allowed program values
	},
	format: {
		type: String,
		enum: allowedFormats, // Validate against allowed format values
	},
	campus: {
		type: String,
		enum: allowedCampuses, // Validate against allowed campus values
	},
	startDate: { type: Date, default: Date.now }, // Default to current date
	endDate: { type: Date }, // No default, must be set explicitly
	inProgress: { type: Boolean, default: false }, // Default: false
	programManager: { type: String, required: true }, // Required field
	leadTeacher: { type: String, required: true }, // Required field
	totalHours: { type: Number, default: 360 }, // Default: 360
});

// Export the Cohort model
const Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;
