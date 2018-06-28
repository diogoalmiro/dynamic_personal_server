const express = require("express");
const https = require("https");
const http = require("http");
const url = require("url")

const config = require("./config/config.js");
const routes = require("./app/routes.js");

// http to redirect to https
http.createServer((req, res)=>{
	console.log(url.parse(req.headers.host, req.url));

	// if( req.headers.host)
	// let final = `https://${req.headers.host}:${config.SECURE_PORT}${req.url}`
	// console.log(final);
	// res.writeHead(301, {"Location": final});
	res.end()}).listen(config.PORT);

// http.createServer(function(req,res){
// 	if( !req.headers.host ){
// 		res.writeHead(400)
// 		print("No host header")
// 		res.end("host header required")
// 		return;
// 	}
// 	var host = req.headers['host'].split(":")[0], url = req.url;
// 	if( host == "rasppi.hopto.org" ){
// 		return res.end("Atalhos api front page")
// 	}
// 	print({sep:""},"HTTP -> HTTPS:",host, url);
// 	res.writeHead(301,{"Location": "https://" + host + ":"+SERVER.SPORT + url})
// 	res.end()
// }).listen(SERVER.PORT,print.bind(null,"HTTP at port:",SERVER.PORT))
 

// // https
// https.createServer(SERVER.HTTPS_OPTIONS,app)
// 	 .listen(SERVER.SPORT,print.bind(null,"HTTPS at port",SERVER.SPORT))


// application requests are handled in routes
routes();//app);