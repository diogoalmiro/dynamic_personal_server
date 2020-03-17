const app = module.exports = require("express")();

const usersConfig = require("../config/users_config.js");

const fs = require("fs");
const vm = require("vm");
const path = require("path");
const serveIndex = require('serve-index');
const users = require("./util/users.js");

const userFolder = (req) => path.resolve(usersConfig.HOME, req.params.userid);
const userServer = (req) => path.resolve(userFolder(req), usersConfig.SERVER);
const userPublic = (req) => path.resolve(userFolder(req), usersConfig.PUBLIC);

// Check that userid exists
app.use("/:userid", (req, res, next) =>
	// TODO use users
	fs.lstat(userFolder(req),(err, info) => !err && info.isDirectory() ?
		next() :
		next("User doesn't exist")));

// Try using a server
app.use("/:userid", (req, res, next)=>
	fs.readFile(userServer(req), (err,data)=>{
		if( err ) return next(); // It's not a error to not have server.js static will be used
		const script = new vm.Script(data);
		let sandbox = {console,next/*req, res, next, __dirname : userFolder(req)*/}; // TODO improve sandbox
		vm.createContext(sandbox);
		try{
			script.runInContext(sandbox, {timeout:2000});
		} catch(e){
			return next(e);
		}
	}));

// Send public files of userid (or index.html)
app.use("/:userid", (req, res, next) =>
	res.sendFile(req.url, {root : userPublic(req)}, (err) => !err || next()));

// Send ls of public folder
app.use("/:userid", (req, res, next) =>
	serveIndex(userPublic(req))(req, res, next));

// Catch errors (should we report them or not?)
app.use("/:userid", (err, req, res, next)=>next(err));