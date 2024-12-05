const router = require("express").Router();
const Student = require("../models/Student.js");

// POST /api/students - Creates a new student
router.post("/", async (req, res, next) => {
	const newStudent = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
		linkedinUrl: req.body.linkedinUrl,
		languages: req.body.languages,
		program: req.body.program,
		background: req.body.background,
		cohort: req.body.cohort,
		projects: req.body.projects,
	};

	try {
		const createdStudent = await Student.create(newStudent);

		res
			.status(201)
			.json({ message: "Student successfully created.", createdStudent });
	} catch (error) {
		next(error);
	}
});

// GET /api/students - Retrieves all of the students in the database collection
router.get("/", async (req, res, next) => {
	try {
		const allStudents = await Student.find({}).populate("cohort");

		res
			.status(200)
			.json({ message: "Students successfully fetched.", allStudents });
	} catch (error) {
		next(error);
	}
});

// GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
router.get("/cohort/:cohortId", async (req, res, next) => {
	const cohortId = req.params.cohortId;

	try {
		const cohortStudents = await Student.find({ cohort: cohortId }).populate(
			"cohort"
		);

		res
			.status(200)
			.json({ message: "Students successfully fetched.", cohortStudents });
	} catch (error) {
		next(error);
	}
});

// GET /api/students/:studentId - Retrieves a specific student by id
router.get("/:studentId", async (req, res, next) => {
	const studentId = req.params.studentId;

	try {
		const foundStudent = await Student.findById(studentId).populate("cohort");

		res
			.status(200)
			.json({ message: "Student successfully fetched.", foundStudent });
	} catch (error) {
		next(error);
	}
});

// PUT /api/students/:studentId - Updates a specific student by id
router.put("/:studentId", async (req, res, next) => {
	try {
		const updatedStudent = await Student.findByIdAndUpdate(
			req.params.studentId,
			req.body,
			{ new: true, runValidators: true }
		).populate("cohort");

		res.status(200).json({
			message: "Student successfully updated.",
			updatedStudent,
		});
	} catch (error) {
		next(error);
	}
});

// DELETE /api/students/:studentId - Deletes a specific student by id
router.delete("/:studentId", async (req, res, next) => {
	try {
		const deletedStudent = await Student.findByIdAndDelete(
			req.params.studentId
		).populate("cohort");

		res.status(200).json({
			message: "Student successfully deleted.",
			deletedStudent,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
