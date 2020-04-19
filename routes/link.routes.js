const { Router } = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { url } = req.body;

    const code = shortid.generate();
    const exists = await Link.findOne({ url });
    if (exists) {
      return res.json({ url: exists });
    }

    const short = baseUrl + '/t/' + code;

    const link = new Link({
      url,
      short,
      code,
      owner: req.user.userId
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something get wrong! Please try again' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: 'Something get wrong! Please try again' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: 'Something get wrong! Please try again' });
  }
});

module.exports = router;
