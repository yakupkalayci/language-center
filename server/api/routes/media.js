const express = require('express');
const prisma = require('../lib/prismaClient');
const Response = require('../lib/Response');
const auth = require('../lib/auth')();

const router = express.Router();

router.get('/', auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await prisma.media.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    res.json(Response.successResponse({ medias: items }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post('/', auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, image } = req.body;
    const created = await prisma.media.create({ data: { title, image: image || null, userId } });
    res.json(Response.successResponse({ media: created }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.put('/:id', auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const mediaId = req.params.id;
    const updated = await prisma.media.update({where: {id: mediaId}, data: {userId, ...req.body}});
    res.json(Response.successResponse({ media: updated }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.get('/:id', auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const media = await prisma.media.findFirst({ where: { id, userId } });
    if (!media) return res.status(404).json(Response.errorResponse(new Error('Not found')));
    res.json(Response.successResponse({ media }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.delete('/:id', auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const mediaId = req.params.id;
    await prisma.media.delete({where: {id: mediaId}});
    res.json(Response.successResponse({ message: 'deleted' }));
  } catch(err) {

  }
});

module.exports = router;
