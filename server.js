let http = require("http");
let fs = require("fs");
let path = require("path");

const port = 3000;
const publicDirName = "public";
let rootDir = path.join(__dirname, publicDirName);

const MIME_TYPES = {
    default: "application/octet-stream",
    html: "text/html; charset=utf-8", 
    css: "text/css; charset=utf-8",
    js: "application/javascript; charset=utf-8",
    png: "image/png",
    jpg: "image/jpeg",
    gif: "image/gif",
    ico: "image/x-icon",
    svg: "image/svg+xml",
};

function onrequest(req, res) {
    let reqPath;
    let url = req.url;

    if (url === "/" || url === "/index.html") {
        reqPath = "/index.html";
    } else if (url === "/styles/style.css") {
        reqPath = "/styles/style.css";
    } else if (url === "/scripts/script.js") {
        reqPath = "/scripts/script.js";
    } else if (url === "/styles/404.css") {
        reqPath = "/styles/404.css";
    } else if (url.startsWith("/product.html")) {
        reqPath = "/pages/product.html";
    } else if (url === "/scripts/product.js") {
        reqPath = "/scripts/product.js";
    } else if (url === "/styles/product.css") {
        reqPath = "/styles/product.css";
    } else {
        reqPath = "/404.html";
    }

    let filePath = path.normalize(path.join(rootDir, reqPath));
    if (!filePath.startsWith(rootDir)) {
        res.writeHead(403, { "Content-Type": "text/plain" });
        return res.end("403 Доступ запрещён");
    }

    let ext = path.extname(filePath).substring(1).toLowerCase();
    let contentType = MIME_TYPES[ext] || MIME_TYPES.default;

    fs.readFile(filePath, (err, data) => {
        if (err) {
        if (err.code === "ENOENT") {
            const not_found = path.normalize(path.join(rootDir, "404.html"));
            return fs.readFile(not_found, (e404, d404) => {
            if (e404) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Страницы не существует");
            } else {
                res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                res.end(d404);
            }
            });
        }
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("500 Ошибка на стороне сервера");
        }

        let status;
        if (reqPath === "/404.html") {
            status = 404;
        } else {
            status = 200;
        }
        res.writeHead(status, { "Content-Type": contentType });
        res.end(data);
    });
}

const server = http.createServer(onrequest);

server.listen(port, "0.0.0.0", () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});