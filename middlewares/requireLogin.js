module.exports = function (req, res, next) {
	console.log('Checking authentication...');
	//do this:
	res.status(401).send('Invalid API credentials');
	//or:
	//next();
}