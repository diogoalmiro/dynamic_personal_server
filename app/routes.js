const app = module.exports = require("express")();

app.use("/favicon.ico", (req,res)=>{res.writeHeader(404); res.end();})

app.use("/admin",require("./admin.js"));

app.use(require("./userServer.js"));