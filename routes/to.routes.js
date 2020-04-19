const {Router} = require('express');
const Link = require('../models/Link');
const router = Router();

router.get('/:linkId', async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.linkId });
    if(link) {
      link.clicks++;
      await link.save();
      return res.redirect(link.url);
    }
    return res.status(404).json('Link not found');
  } catch (e) {
    res.status(500).json({ message: 'Something get wrong! Please try again' });
  }
})

module.exports = router;
