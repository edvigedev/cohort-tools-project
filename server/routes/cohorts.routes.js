const router = require('express').Router();
const dataCohorts = require('../cohorts.json');

router.get('/', (req, res) => {
	res.json(dataCohorts);
});

module.exports = router;
