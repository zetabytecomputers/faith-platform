const express = require('express');
const router = express.Router();

/** Favorite Scriptures page */
router.get('/favorites', (req, res) => {
  const defaults = [
    { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.' },
    { ref: 'Mosiah 2:41', text: 'Consider on the blessed and happy state of those that keep the commandments of God.' },
    { ref: 'John 14:27', text: 'Peace I leave with you, my peace I give unto you.' }
  ];
  res.render('favorites', {
    page: 'favorites',
    title: 'Favorite Scriptures',
    favoritesScriptures: defaults
  });
});

module.exports = router;
