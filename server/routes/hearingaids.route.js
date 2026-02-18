const express = require('express');
const upload = require('../imguplaod/middleware/image.uploader');
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
router.post('/', upload.single('image'), createHearingAid);
router.put('/:id', upload.single('image'), updateHearingAid);
router.delete('/:id', deleteHearingAid);

module.exports = router;
