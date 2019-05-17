function enterMap(enterSelection){

	//append a path for the 'globe'	
	enterSelection.append('path')
	.attrs({
		'd': pathGenerator({type:'Sphere'}),
		'class':'spherePath'
	})

	//append a path for each selection (each country/feature)
	enterSelection.append('path')
		//use the pathGenerator to build the data value
		// of each country path, the 'd' attribute
		.attrs({
			'd': d => pathGenerator(d),
			'class': 'countryPath',
			'fill': d => {
				return (d.gni !== null) ? colorScale(d.gni) : 'darkgrey'
			}
		})
		.append('title')
			.text(d => `${d.countryName}: ${d.gni}`)
} 

function enterNestedG(ent){
	ent.append('g').attr('class', 'gEnter')
}

function prepMap(srcData){
	
	let mappedGNIs = srcData.features.map(d => d.gni);
	mappedGNIs = mappedGNIs.filter(function(itm, pos) {
		    return mappedGNIs.indexOf(itm) == pos;
		})
	//remove nulls
	.filter(d => d)
	//order colors
	.sort()

	colorScale.domain(mappedGNIs.reverse())

	//select the svgElement with D3
	let svgObj = d3.select('.svgWrapper');

	// MapG, a nested group
	let mapG = svgObj.append('g')
	.attrs({
		'pointer-events': 'all',
		'class': 'mapGWrapper'
	})

	//EnterG Group
	let nestedG = mapG.selectAll('g').data([null]).join(enterNestedG);

	//make a data join of paths
	let dataJoin = d3.select('.gEnter').selectAll('path')
		//join the FEATURES to the PATHS
		.data(srcData.features).join(enterMap)

	//ZOOM!!
	mapG.call(d3.zoom().on('zoom', function(){
		d3.select('.gEnter').attr("transform", d3.event.transform)
	}))
}