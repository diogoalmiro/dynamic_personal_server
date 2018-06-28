const fs = require("fs");

const express = require("express");
const https = require("https");
const http = require("http");

const app = express();

const config = require("./config/config.js");
const routes = require("./app/routes.js");

// http to redirect to https
const redirect = (url, res) => {
	res.writeHead(301, {"Location" : url});
	res.end();
}

http.createServer((req, res) =>
		redirect(`https://${req.headers.host.split(':')[0]}:${config.SECURE_PORT}${req.url}`,res))
	.listen(config.PORT);
 

// https
https.createServer({
	key : fs.readFileSync('./config/key.pem'),
	cert : fs.readFileSync( './config/cert.pem' )
},app)
 	 .listen(config.SECURE_PORT)


// application requests are handled in routes
routes(app);