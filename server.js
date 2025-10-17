const path = require('path');
const express = require('express');
const helmet = require('helmet');

const app = express();

// Security headers (relaxed enough for inline styles/scripts currently used)
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "object-src": ["'none'"],
      "base-uri": ["'self'"],
      "frame-ancestors": ["'none'"],
      "img-src": ["'self'", "data:"],
      "script-src": ["'self'", "'unsafe-inline'"],
      "style-src": ["'self'", "https:", "'unsafe-inline'"],
      "font-src": ["'self'", "https:", "data:"],
      "script-src-attr": ["'none'"]
    }
  }
}));

// Views (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Locals normalizer (optional but recommended)
try {
  const localsNormalizer = require('./middlewares/locals-normalizer');
  app.use(localsNormalizer);
} catch (_) {
  // no-op if not present
}

// Basic site metadata (safe defaults)
app.use((req, res, next) => {
  res.locals.brand = res.locals.brand || 'Jesus Is The Christ';
  res.locals.tagline = res.locals.tagline || 'The Light of Christ';
  res.locals.nav = res.locals.nav || [
    { href:'/',          label:'Home' },
    { href:'/stories',   label:'Stories' },
    { href:'/images',    label:'Images' },
    { href:'/videos',    label:'Videos' },
    { href:'/favorites', label:'Favorite Scriptures' },
  ];
  next();
});

// Routes
app.get('/', (req, res) => {
  res.locals.page = 'Home';
  const topStories = (typeof res.locals.topStories !== 'undefined' && Array.isArray(res.locals.topStories))
    ? res.locals.topStories
    : [];
  res.render('home', { topStories });
});

app.get('/favorites', (req, res) => {
  res.locals.page = 'Favorite Scriptures';
  const favoritesScriptures = (typeof res.locals.favoritesScriptures !== 'undefined' && Array.isArray(res.locals.favoritesScriptures) && res.locals.favoritesScriptures.length)
    ? res.locals.favoritesScriptures
    : [
        { ref: 'John 3:16',        text: 'For God so loved the world…' },
        { ref: 'Proverbs 3:5–6',   text: 'Trust in the Lord with all thine heart…' }
      ];
  res.render('favorites', { favoritesScriptures });
});

app.get('/images', (req, res) => {
  res.locals.page = 'Images';
  // Prefer res.locals.imagesItems if provided by middleware; fallback to a small starter list
  const items = (Array.isArray(res.locals.imagesItems) && res.locals.imagesItems.length)
    ? res.locals.imagesItems
    : [
        { href:'#', title:'Temple' },
        { href:'#', title:'Scripture Artwork' },
        { href:'#', title:'Christ Teaching' },
      ];
  res.render('images', { items });
});

// 404
app.use((req, res) => {
  res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
