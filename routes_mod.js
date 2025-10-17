module.exports = (app, pool) => {
  // GET: approve a single held comment by ID (querystring token)
  app.get('/admin/mod/approve', async (req, res) => {
    try {
      const { comment_id, token } = req.query;
      if (!token || token !== process.env.MOD_TOKEN) return res.status(403).send('Forbidden');
      if (!comment_id) return res.status(400).send('Missing comment_id');

      const [result] = await pool.execute(
        "UPDATE Comment SET status='published' WHERE id=? AND status='held'",
        [String(comment_id)]
      );
      res.json({ ok: true, comment_id, changed: result?.affectedRows ?? 0 });
    } catch (e) {
      res.status(500).json({ error: String(e?.message || e) });
    }
  });

  // POST: approve a single held comment (token in header)
  //  Header: x-mod-token: <token>
  //  Body:   {"comment_id":"<uuid>"}
  app.post('/admin/mod/approve', async (req, res) => {
    try {
      const token = req.get('x-mod-token');
      const { comment_id } = req.body || {};
      if (!token || token !== process.env.MOD_TOKEN) return res.status(403).send('Forbidden');
      if (!comment_id) return res.status(400).send('Missing comment_id');

      const [r] = await pool.execute(
        "UPDATE Comment SET status='published' WHERE id=? AND status='held'",
        [String(comment_id)]
      );
      res.json({ ok: true, comment_id, changed: r?.affectedRows ?? 0 });
    } catch (e) {
      res.status(500).json({ error: String(e?.message || e) });
    }
  });

  // POST: approve all held comments for a testimony (token in header)
  //  Header: x-mod-token: <token>
  //  Body:   {"testimony_id":"<uuid>"}
  app.post('/admin/mod/approve_all', async (req, res) => {
    try {
      const token = req.get('x-mod-token');
      const { testimony_id } = req.body || {};
      if (!token || token !== process.env.MOD_TOKEN) return res.status(403).send('Forbidden');
      if (!testimony_id) return res.status(400).send('Missing testimony_id');

      const [r] = await pool.execute(
        "UPDATE Comment SET status='published' WHERE testimony_id=? AND status='held'",
        [String(testimony_id)]
      );
      res.json({ ok: true, testimony_id, changed: r?.affectedRows ?? 0 });
    } catch (e) {
      res.status(500).json({ error: String(e?.message || e) });
    }
  });

  // Simple admin page (querystring token)
  app.get('/admin', async (req, res) => {
    const { token } = req.query;
    if (!token || token !== process.env.MOD_TOKEN) return res.status(403).send('Forbidden');

    try {
      const [held] = await pool.query(
        "SELECT id, testimony_id, LEFT(body,120) AS preview, createdAt FROM Comment WHERE status='held' ORDER BY createdAt DESC LIMIT 50"
      );
      const [recent] = await pool.query(
        "SELECT id, slug, title, createdAt FROM Testimony ORDER BY createdAt DESC LIMIT 20"
      );

      const listHeld = held.map(c => `
        <li style="margin:.5rem 0">
          <code>${c.id}</code> — ${c.preview || '[no text]'}
          <div style="margin-top:.25rem">
            <a href="/admin/mod/approve?comment_id=${c.id}&token=${encodeURIComponent(token)}">Approve</a>
            &nbsp;|&nbsp;
            <a href="/admin/mod/approve_all?testimony_id=${c.testimony_id}&token=${encodeURIComponent(token)}">Approve all from this testimony</a>
          </div>
        </li>
      `).join('');

      const listT = recent.map(t =>
        `<li style="margin:.25rem 0"><a href="/t/${t.slug}" target="_blank" rel="noopener">${t.title}</a></li>`
      ).join('');

      res.send(`<!doctype html>
        <meta charset="utf-8">
        <title>Admin — Share Light</title>
        <div style="font-family:ui-sans-serif,system-ui;max-width:900px;margin:24px auto;padding:0 16px">
          <h1>Admin</h1>
          <p>Token OK. ${held.length} held comment(s) shown.</p>
          <h2>Held comments</h2>
          <ul>${listHeld || '<li>None 🎉</li>'}</ul>
          <h2>Recent testimonies</h2>
          <ul>${listT}</ul>
        </div>`);
    } catch (e) {
      res.status(500).send('Admin error: ' + String(e?.message || e));
    }
  });
};
