const mongoose = require('mongoose');
const Enums = require('./enums.js');

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new mongoose.Schema({
	// Required
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true },
	// Optional
	linkedinUrl: { type: String, default: '' },
	languages: {
		type: [String],
		enum: Enums.languages,
	},
	program: {
		type: String,
		enum: Enums.programs,
	},
	background: { type: String, default: '' },
	image: {
		type: String,
		default: 'https://i.imgur.com/r8bo8u7.png',
	},
	cohort: {
		type: mongoose.Schema.Types.ObjectId, // Reference to another document (_id)
		ref: 'Cohort', // Reference to the Cohort model
	},
	projects: {
		type: [mongoose.Schema.Types.Mixed], // Array to hold project data (or another schema)
	},
});

// CREATE MODEL
// The model() method defines a model and creates a collection in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Student" --> "students"
const Student = mongoose.model('Student', studentSchema);

// EXPORT THE MODEL
module.exports = Student;
