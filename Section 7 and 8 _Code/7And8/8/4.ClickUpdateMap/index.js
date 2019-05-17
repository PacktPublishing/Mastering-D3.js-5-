let svgObj = null,
	thisGMerged = null,
	colorScale = d3.scaleOrdinal().range(d3.schemeRdYlGn[5]),
	curHoveredCountry = null,
	globalGNIs = null,
	rootData = null,
	selectedLevel = null;
	
// DOCS: https://github.com/d3/d3-geo#d3-geo
//builds a rype of map projection
const geoNatural = d3.geoNaturalEarth1();

// DOCS: https://github.com/d3/d3-geo#geoPath
// builds a PATH given our topo-json 'feature'
const pathGenerator = d3.geoPath().projection(geoNatural);


prepData().then(resultCountries => {
	rootData = resultCountries
	prepMap(rootData)
	prepLegend(globalGNIs)
})