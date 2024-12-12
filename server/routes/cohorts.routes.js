const router = require("express").Router();
const Cohort = require("../models/Cohort");

//New routes
router.post("/", (req, res) => {
	Cohort.create({
		cohortSlug: req.body.cohortSlug,
		cohortName: req.body.cohortName,
		programManager: req.body.programManager,
		leadTeacher: req.body.leadTeacher,
		program: req.body.program,
		format: req.body.format,
		campus: req.body.campus,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		inProgress: req.body.inProgress,
		totalHours: req.body.totalHours,
	})
		.then((newCohort) => {
			res.status(201).json(newCohort);
		})
		.catch((err) => next(err));
});

router.get("/", (req, res, next) => {
	Cohort.find(req.query)
		.then((allCohort) => {
			res.status(200).json(allCohort);
		})
		.catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
	Cohort.findById(req.params.id)
		.then((oneCohort) => {
			res.status(200).json(oneCohort);
		})
		.catch((err) => next(err));
});

router.put("/:id", (req, res) => {
	Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((updatedCohort) => {
			res.status(204).json(updatedCohort);
		})
		.catch((err) => next(err));
});

router.delete("/:id", (req, res) => {
	Cohort.findByIdAndDelete(req.params.id)
		.then((deletedCohort) => {
			res.status(204).json(deletedCohort);
		})
		.catch((err) => next(err));
});

module.exports = router;
