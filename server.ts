import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API proxy route to bypass CORS
  app.post("/api/chat", async (req, res) => {
    try {
      // Hardcoded to the user's requested production deployment URL to avoid
      // stale AI Studio environment variables from picking up temporary Vercel URLs
      const apiUrl = "https://fionnuala-evallab.vercel.app/api/public/chat";
      const apiKey = process.env.NEXT_PUBLIC_EVAL_LIVE_KEY || process.env.VITE_EVAL_LIVE_KEY || req.body.apiKey;
      const { question } = req.body;

      if (!apiUrl) {
        return res.status(400).json({ error: "Missing API URL" });
      }

      console.log(`Sending proxy request to: ${apiUrl}`);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          apiKey
        })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API returned ${response.status}: ${text}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        res.json(data);
      } else {
        const text = await response.text();
        throw new Error(`Expected a JSON response but received ${contentType}. The target URL might be pointing to a web page (like the site's root) instead of the actual API endpoint. Response preview: ${text.substring(0, 100)}...`);
      }
    } catch (error: any) {
      console.error("Proxy error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
