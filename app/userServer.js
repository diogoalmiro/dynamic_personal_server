const app = module.exports = require("express")();

const fs = require("fs");
const vm = require("vm");

app.use("/:userid", (req, res, next)=>{
	fs.readFile("users/"+req.params.userid+"/server.js", (err,data)=>{
		if( err ) return next(err);
		const script = new vm.Script(data);
		let sandbox = {req, res};
		vm.createContext(sandbox);
		try{
			script.runInContext(sandbox, {timeout:5000});
		} catch(err){
			return next(err);
		}
	});
})