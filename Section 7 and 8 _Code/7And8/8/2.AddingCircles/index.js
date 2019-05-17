let globalGNIVals = [];

// https://github.com/d3/d3-scale-chromatic#schemeRdYlGn
let colorScale = d3.scaleOrdinal().range(d3.schemeRdYlGn[5]);

// DOCS: https://github.com/d3/d3-geo#d3-geo
//builds a type of map projection
const geoNatural = d3.geoNaturalEarth1();

// DOCS: https://github.com/d3/d3-geo#geoPath
// builds a PATH given our topo-json 'feature'
const pathGenerator = d3.geoPath().projection(geoNatural);

prepData().then(resultCountries => {
	
	prepMap(resultCountries)
	prepLegend(globalGNIVals)
})