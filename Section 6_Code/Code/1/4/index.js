prepData('./countryClassifications.csv').then(result => {
	return buildPieChart('#chartWrapper', result)
})