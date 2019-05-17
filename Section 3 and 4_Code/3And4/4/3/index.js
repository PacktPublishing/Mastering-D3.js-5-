prepData('countryGNI.csv').then(res => {
	buildBarChart('chartWrapper', res)
})