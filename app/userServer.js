const app = module.exports = require("express")();

const config = require("../config/users_config.js");

const fs = require("fs");
const vm = require("vm");
const path = require("path");

const userFolder = (req) => path.resolve(config.HOME, req.params.userid);
const userServer = (req) => path.resolve(userFolder(req), config.SERVER);
const userPublic = (req) => path.resolve(userFolder(req), config.PUBLIC);

app.use("/:userid", (req, res, next)=>
	fs.readFile(userServer(req), (err,data)=>{
		if( err ) return next(); // It's not a error to not have server.js static will be used
		const script = new vm.Script(data);
		let sandbox = {req, res, next, __dirname : userFolder(req)};
		vm.createContext(sandbox);
		try{
			script.runInContext(sandbox, {timeout:5000});
		} catch(e){
			return next(e);
		}
	}));

app.use("/:userid", (req, res, next) =>
	res.sendFile(req.url, {root : userPublic(req)}, (err) =>
		next(err)));