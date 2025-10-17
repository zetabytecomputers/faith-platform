// middlewares/locals-normalizer.js
module.exports = function localsNormalizer(req, res, next) {
  var L = res.locals || {};

  if (!L.brand) L.brand = 'Jesus Is The Christ';
  if (!L.tagline) L.tagline = 'The Light of Christ';

  if (!L.nav) {
    L.nav = [
      { href: '/', label: 'Home' },
      { href: '/stories', label: 'Stories' },
      { href: '/images', label: 'Images' },
      { href: '/videos', label: 'Videos' },
      { href: '/favorites', label: 'Favorite Scriptures' }
    ];
  }
  if (!L.page) L.page = 'home';

  // Must expose scriptureOfDay.text/ref (not verse.*)
  if (!L.scriptureOfDay) {
    L.scriptureOfDay = {
      text: '“I am the light of the world… shall have the light of life.”',
      ref: 'John 8:12'
    };
  }

  // Favorites always defaults to an array
  if (!L.favoritesScriptures || !Array.isArray(L.favoritesScriptures)) {
    L.favoritesScriptures = [
      { text: 'For God so loved the world…', ref: 'John 3:16' },
      { text: 'Trust in the Lord with all thine heart…', ref: 'Proverbs 3:5–6' }
    ];
  }

  res.locals = L;
  next();
};
