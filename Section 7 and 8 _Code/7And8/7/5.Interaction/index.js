let svgObj = null,
	gObj = null,
	mapGWrapper = null,
	gDataJoin = null;
	colorScale = d3.scaleOrdinal().range(d3.schemeRdYlGn[5]);
	curHoveredCountry = null,
	rootData = null;
// DOCS: https://github.com/d3/d3-geo#d3-geo
//builds a rype of map projection
const geoNatural = d3.geoNaturalEarth1();

//GLOBE
// const geoNatural = d3.geoOthographic();

//geoEquirectangular()



// DOCS: https://github.com/d3/d3-geo#geoPath
// builds a PATH given our topo-json 'feature'
const pathGenerator = d3.geoPath().projection(geoNatural);


prepData().then(resultCountries => {
	rootData = resultCountries
	prepMap(rootData)
})