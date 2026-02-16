const express = require('express');
const {
  getAllHearingAids,
  getHearingAidById,
  createHearingAid,
  updateHearingAid,
  deleteHearingAid,
} = require('../modules/hearingaids/hearingAids.controller');

const router = express.Router();

router.get('/', getAllHearingAids);
router.get('/:id', getHearingAidById);
router.post('/', createHearingAid);
router.put('/:id', updateHearingAid);
router.delete('/:id', deleteHearingAid);

module.exports = router;
