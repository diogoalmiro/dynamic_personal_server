const https = require("https");
const http = require("http");

const httpConfig = require("./config/http_config.js");
const app = require("./app/routes.js");

// http to redirect to https
http.createServer((req, res) =>{
		let final = `https://${req.headers.host.split(':')[0]}:${httpConfig.SECURE_PORT}${req.url}`;
		res.writeHead(301, {"Location" : final});
		res.end();})
     .listen(httpConfig.PORT);
 

// https
https.createServer(httpConfig.HTTPS_OPTIONS,app)
     .listen(httpConfig.SECURE_PORT);
