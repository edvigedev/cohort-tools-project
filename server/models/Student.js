// Define allowed values for languages and programs
const mongoose = require('mongoose');

const allowedLanguages = [
	'English',
	'Spanish',
	'French',
	'German',
	'Portuguese',
	'Dutch',
	'Other',
];
const allowedPrograms = ['Web Dev', 'UX/UI', 'Data Analytics', 'Cybersecurity'];

// schema
const studentSchema = new mongoose.Schema({
	firstName: { type: String, required: true }, // First name of the student
	lastName: { type: String, required: true }, // Last name of the student
	email: { type: String, required: true, unique: true }, // Email, must be unique
	phone: { type: String, required: true }, // Phone number
	linkedinUrl: { type: String, default: '' }, // LinkedIn profile URL
	languages: {
		type: [String], // Array of strings
		enum: allowedLanguages, // Validate against allowed values
	},
	program: {
		type: String,
		enum: allowedPrograms, // Validate against allowed values
	},
	background: { type: String, default: '' }, // Background info
	image: {
		type: String,
		default: 'https://i.imgur.com/r8bo8u7.png', // Default profile image URL
	},
	cohort: {
		type: mongoose.Schema.Types.ObjectId, // Reference to another document (_id)
		ref: 'Cohort', // Reference to the Cohort model
	},
	projects: {
		type: [mongoose.Schema.Types.Mixed], // Array to hold project data (or another schema)
	},
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
