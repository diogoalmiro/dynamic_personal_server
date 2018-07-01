const fs = require("fs");

// generate key.pem and cert.pem, and create a json with those
module.exports = {
	PORT : 80,
	SECURE_PORT : 443,
	HTTPS_OPTIONS : require("./keys.json")
}