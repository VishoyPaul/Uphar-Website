const express = require('express');
const upload = require('../imguplaod/middleware/image.uploader');
const { verifyAccessToken } = require('../middleware/verifyToken');
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
router.post('/', verifyAccessToken, upload.single('image'), createHearingAid);
router.put('/:id', verifyAccessToken, upload.single('image'), updateHearingAid);
router.delete('/:id', verifyAccessToken, deleteHearingAid);

module.exports = router;
