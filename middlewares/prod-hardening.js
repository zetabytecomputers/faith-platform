const compression = require('compression');

module.exports = function prodHardening(app) {
  // If behind Apache/Passenger or any proxy
  app.set('trust proxy', 1);

  // HTTP compression for HTML/CSS/JS
  app.use(compression());

  // Optionally, add basic security headers (minimal & safe)
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
};
