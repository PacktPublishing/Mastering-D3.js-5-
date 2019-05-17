function buildChart(srcData){
	console.log(srcData)
}

prepData('./countryGNI.csv').then(buildChart)