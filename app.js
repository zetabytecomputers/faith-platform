const path = require('path');
const express = require('express');
const app = express();

// --- Build stamp + entrypoint headers ---
app.use((req,res,next)=>{ try { res.setHeader("X-Build-TS", process.env.BUILD_TS || "2025-10-17T06:54:18Z"); } catch(e){}; try { res.setHeader("X-App-Entrypoint","app.js"); } catch(e){}; res.locals.buildStamp = process.env.BUILD_TS || "2025-10-17T06:54:18Z"; next(); });



// Production hardening (trust proxy, compression)
const prodHardening = require('./middlewares/prod-hardening');
prodHardening(app);


// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false); // dev: disable cache

// Static
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets'), { fallthrough: true }));

// Middleware
const localsNormalizer = require('./middlewares/locals-normalizer');
app.use(localsNormalizer);

// Routes
app.get('/', (req, res) => { res.locals.page = 'home'; res.render('pages/home', { title: 'Home' }); });

app.get('/favorites', (req, res) => {
  res.locals.page = 'favorites';
  res.render('pages/favorites', { title: 'Favorite Scriptures' });
});

app.get('/stories', (req, res) => res.render('pages/stub', { title: 'Stories' }));
app.get('/images',  (req, res) => res.render('pages/stub', { title: 'Images'  }));
app.get('/videos',  (req, res) => res.render('pages/stub', { title: 'Videos'  }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server http://localhost:'+PORT));
