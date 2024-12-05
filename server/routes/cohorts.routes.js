const router = require("express").Router();
const Cohort = require("../models/Cohort");



// router.get('/', (req, res) => {
// 	res.json(dataCohorts);
// });

//New routes

router.post("/", (req, res) => {
	console.log(req.body);
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
			console.log("New cohort was created", newCohort);
		})
		.catch((err) => next(err));
});

router.get("/", (req, res, next) => {
	console.log(req.body);
	Cohort.find({})
		.then((allCohort) => {
			res.status(200).json(allCohort);
			console.log("All cohort were retrieved", allCohort);
		})
		.catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
	console.log(req.body);
	Cohort.findById(req.params.id)
		.then((oneCohort) => {
			res.status(200).json(oneCohort);
			console.log("One cohort was retrieved", oneCohort);
		})
		.catch((err) => next(err));
});

router.put("/:id", (req, res) => {
	console.log(req.body);
	Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((updatedCohort) => {
			res.status(204).json(updatedCohort);
			console.log("One cohort was updated", updatedCohort);
		})
		.catch((err) => next(err));
});

router.delete("/:id", (req, res) => {
	console.log(req.body);
	Cohort.findByIdAndDelete(req.params.id)
		.then((deletedCohort) => {
			res.status(204).json(deletedCohort);
			console.log("One cohort was updated", deletedCohort);
		})
		.catch((err) => next(err));
});

module.exports = router;
