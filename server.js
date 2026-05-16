const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  const ext = path.extname(filePath);
  
  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
    } else {
      res.writeHead(200, { "Content-Type": contentTypes[ext] || "text/plain" });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`AfyaLink running at http://localhost:${PORT}`);
});