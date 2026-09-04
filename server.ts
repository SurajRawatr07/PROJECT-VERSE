import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// API ROUTES (Must precede Vite middleware)
// ============================================================================

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ProjectVerse Engine' });
});

// ============================================================================
// VITE MIDDLEWARE & STATIC SERVING (Express + Vite setup)
// ============================================================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ProjectVerse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
