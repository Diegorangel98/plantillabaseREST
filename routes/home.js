const { Router } = require('express');

const Home = require('../controllers/home');

const router = Router();


router.get('/', Home);

module.exports = router;