const express = require('express');
const app = express();

app.set('trust proxy', true); // respeta X-Forwarded-For si hay proxy delante

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/', (req, res) => {
  const ip   = req.ip || req.socket.remoteAddress;
  const xff  = req.headers['x-forwarded-for'] || 'no presente';
  const xri  = req.headers['x-real-ip'] || 'no presente';
  const ua   = req.headers['user-agent'] || '';
  const hora = new Date().toISOString();

  res.send(`
    <h1>Datos de tu conexión</h1>
    <table border="1" cellpadding="6">
      <tr><td><b>IP vista por el servidor (req.ip)</b></td><td>${ip}</td></tr>
      <tr><td><b>X-Forwarded-For</b></td><td>${xff}</td></tr>
      <tr><td><b>X-Real-IP</b></td><td>${xri}</td></tr>
      <tr><td><b>User-Agent</b></td><td>${ua}</td></tr>
      <tr><td><b>Hora</b></td><td>${hora}</td></tr>
    </table>
    <p>Refresca desde otro dispositivo para comparar.</p>
  `);
});

app.listen(3000, '0.0.0.0', () => console.log('http://0.0.0.0:3000'));