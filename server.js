const https = require("https");
const http = require("http");

const config = require("./config/config.js");
const app = require("./app/routes.js");

// http to redirect to https
http.createServer((req, res) =>{
		let final = `https://${req.headers.host.split(':')[0]}:${config.SECURE_PORT}${req.url}`;
		res.writeHead(301, {"Location" : final});
		res.end();})
     .listen(config.PORT);
 

// https
https.createServer(config.HTTPS_OPTIONS,app)
     .listen(config.SECURE_PORT);
