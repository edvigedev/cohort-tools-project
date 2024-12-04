const mongoose = require('mongoose');
const Enums = require('./enums.js');
const { Schema, model } = mongoose;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const cohortSchema = new mongoose.Schema({
	// Required
	cohortSlug: { type: String, required: true, unique: true },
	cohortName: { type: String, required: true },
	programManager: { type: String, required: true },
	leadTeacher: { type: String, required: true },
	// Optional
	program: {
		type: String,
		enum: Enums.programs,
	},
	format: {
		type: String,
		enum: Enums.formats,
	},
	campus: {
		type: String,
		enum: Enums.campuses,
	},
	startDate: { type: Date, default: Date.now },
	endDate: { type: Date },
	inProgress: { type: Boolean, default: false },
	totalHours: { type: Number, default: 360 },
});

// CREATE MODEL
// The model() method defines a model and creates a collection in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Cohort" --> "cohorts"
const Cohort = mongoose.model('Cohort', cohortSchema);

// EXPORT THE MODEL
module.exports = Cohort;
