const express = require('express');
const prisma = require('../lib/prismaClient');
const Response = require('../lib/Response');
const auth = require('../lib/auth')();

const router = express.Router();

// GET /media/:id/words
router.get('/:id/words', auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const mediaId = req.params.id;
    const page = Number(req.query.pageIndex) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const [words, total] = await Promise.all([
      prisma.mediaWord.findMany({ where: { mediaId, userId }, skip, take: pageSize, orderBy: { createdAt: 'desc' } }),
      prisma.mediaWord.count({ where: { mediaId, userId } })
    ]);

    res.json(Response.successResponse({ words, pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) } }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

// POST /media/:id/words
router.post('/:id/words', auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const mediaId = req.params.id;
    const data = { userId, mediaId, ...req.body };
    const created = await prisma.mediaWord.create({ data });
    res.json(Response.successResponse({ word: created }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

// PUT /media/:id/words/:wordId
router.put('/:id/words/:wordId', auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const mediaId = req.params.id;
    const wordId = req.params.wordId;
    const updated = await prisma.mediaWord.update({ where: { id: wordId }, data: req.body });
    res.json(Response.successResponse({ word: updated }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

// DELETE /media/:id/words/:wordId
router.delete('/:id/words/:wordId', auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const mediaId = req.params.id;
    const wordId = req.params.wordId;
    await prisma.mediaWord.delete({ where: { id: wordId } });
    res.json(Response.successResponse({ message: 'deleted' }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;
