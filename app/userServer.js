const app = module.exports = require("express")();

const config = require("../config/users_config.js");

const fs = require("fs");
const vm = require("vm");

app.use("/:userid", (req, res, next)=>{
	fs.readFile("users/"+req.params.userid+"/server.js", (err,data)=>{
		if( err ) return next(); // It's not a error to not have server.js static will be used
		const script = new vm.Script(data);
		let sandbox = {req, res, next};
		vm.createContext(sandbox);
		try{
			script.runInContext(sandbox, {timeout:5000});
		} catch(e){
			return next(e);
		}
	});
});

app.use("/:userid", (req, res, next)=>{
	res.sendFile(req.url, {
		root : "users/"+req.params.userid+"/public",
	}, (err)=>{
		next(err);
	});
});