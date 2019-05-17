let arcFn = null,
	lableArcFn = null,
	radius = null;

prepData('./countryClassifications.csv').then(res => {
	buildPieChart('chartWrapper', res)
})