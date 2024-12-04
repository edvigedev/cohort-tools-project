const router = require('express').Router();
const dataStudents = require('../students.json');

router.get('/', (req, res) => {
	res.json(dataStudents);
});

module.exports = router;
