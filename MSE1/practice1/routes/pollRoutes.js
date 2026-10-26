const express = require('express');

const {
  getPolls,
  getPollById,
  vote,
  getResults
} = require('../controllers/pollController');

const router = express.Router();

router.get('/polls',getPolls);
router.get('/polls/:id',getPollById);
router.post('/vote',vote);
router.get('/polls/:id/results',getResults);

module.exports = router;