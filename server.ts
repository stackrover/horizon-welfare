import express from "express";
import next from "next";
import path from "path";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Optionally, you can serve static assets from a specific directory.
  server.use("/static", express.static(path.join(__dirname, ".next/static")));

  // For all other routes, pass the request to Next.js for rendering
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen();
});
