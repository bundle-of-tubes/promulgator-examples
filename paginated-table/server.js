import {createServer} from "node:http";
import {resolve} from "node:path";
import {createReadStream} from "node:fs";

const HOST = "127.0.0.1";
const PORT = 3000;

const routes = new Map([
  ["/modules/promulgator.js", {path: 'node_modules/@bundle-of-tubes/state-promulgator/dist/state-promulgator.js', mime: "text/javascript"}],
  ["/modules/paginator.js", {path: 'node_modules/@bundle-of-tubes/stateful-components/dist/paginator.js', mime: "text/javascript"}],
  ["/script.js", {path: resolve(import.meta.dirname, "script.js"), mime: "text/javascript"}],
  ["/pagination-control.js", {path: resolve(import.meta.dirname, "pagination-control.js"), mime: "text/javascript"}],
  ["/paginationStyle.css", {path: resolve(import.meta.dirname, "paginationStyle.css"), mime: "text/css"}]
]);
const defaultRoute = {path: resolve(import.meta.dirname, "index.html"), mime: "text/html"};

createServer(async (req, res)=>{
  let status;
  if (req.url.endsWith('favicon.ico')) {
    status = 404;
    res.statusCode = status;
    res.end();
  }
  else {
    const {path, mime} = routes.get(req.url) ?? defaultRoute;
    try {
      const stream = createReadStream(path);
      status = 200;
      res.writeHead(status, {"Content-Type": mime}); //TODO: add Strict-Transport-Security (if using HTTPS) and Content-Security-Policy
      stream.pipe(res);
    }
    catch {
      status = 500;
      res.statusCode = status;
      res.end();
    }
  }
  console.log(`${req.method} ${req.url} ${status}`);
}).listen(PORT);
console.log(`Server running at http://${HOST}:${PORT}`)
