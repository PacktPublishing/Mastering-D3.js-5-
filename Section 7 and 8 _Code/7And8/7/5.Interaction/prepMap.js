function enterMap(enterSelection){
	
	//append a path for each selection (each country/feature)
	enterSelection.append('path')
	.attrs({
		'd': pathGenerator({type:'Sphere'}),
		'class':'spherePath'
	})

	console.log('colorScale.domain()')
	console.log(colorScale.domain())
	console.log('colorScale.range()')
	console.log(colorScale.range())
	
	enterSelection.append('path')
		//use the pathGenerator to buil the data value, the 'd' attribute
		.attrs({
			'd': d => pathGenerator(d),
			'class': 'countryPath',
			'fill' : d => {return (d.gni !== null) ? colorScale(d.gni) : 'darkgrey'},
			'opacity' : d => {
				return d.countryName == curHoveredCountry ? .875 : 
				curHoveredCountry == null ? .875 
				: .5
			}

		})
		.append('title')
			.text(d => `${d.countryName}: ${d.gni}`)
}

function updateMap(u){
	u.call(u => u.transition().duration(500)
      .attrs({
	  	'opacity' : d => {
			return d.countryName == curHoveredCountry ? 1 : 
			curHoveredCountry == null ? 1 
			: .8
		}
	  })
    )
}

function prepMap(srcCountries){

	let mappedGNIs = srcCountries.features.map(d => d.gni);
		mappedGNIs = mappedGNIs.filter(function(itm, pos) {
		    return mappedGNIs.indexOf(itm) == pos;
		}).filter(d => d)

	colorScale.domain(mappedGNIs.reverse())
	
	//select the svgElement with D3
	svgObj = d3.select('.svgWrapper')

	gObj = svgObj.append('g').attr('class', 'gWrapper')

	svgObj.call(d3.zoom().on('zoom',() => {
		gObj.attr('transform', d3.event.transform)
	}))

	handleCountryUpdates(srcCountries)

}

function handleCountryUpdates(srcData){
	
		//make a data join of paths
	let dataJoin = d3.select('.gWrapper').selectAll('countryPath')
		//join the FEATURES to the PATHS
		.data(srcData.features, d => `${d.id}${d.countryName}`).join(enterMap, updateMap)
}