function buildChart(srcData){
	console.log(srcData)
}

prepData('./countryGNI.csv')
	.then(resData => {
		console.log('Test console log text');
		return buildBarChart('#chartWrapper', resData)})