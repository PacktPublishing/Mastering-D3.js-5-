function enterMap(enterSelection){
	
	enterSelection.append('path')
		//use the pathGenerator to buil the data value, the 'd' attribute
		.attrs({
			'd': d => {
				// console.log('PATH d.countryName')
				// console.log(d.countryName)
				
				return pathGenerator(d)},
			'class': 'countryPath',
			'fill' : d => (d.gni !== null) ? colorScale(d.gni) : 'darkgrey',
			'opacity' : .85
		})
		.append('title')
			.text(d => `${d.countryName}: ${d.gni}`)
}

function updateMap(u){
	console.log('updateMap selectedLevel')
	console.log(selectedLevel)
	
	u.select('path.countryPath')
		u.call(u => u.attr(
	  	'opacity', d => {	  		
	  		return (selectedLevel == null) ? '.85' : d.gni == selectedLevel ? '.85' : '.25'
	  	}
	  )
    )
}

function prepMap(srcCountries){

	let mappedGNIs = srcCountries.features.map(d => d.gni);
		mappedGNIs = mappedGNIs.filter(function(itm, pos) {
		    return mappedGNIs.indexOf(itm) == pos;
		}).filter(d => d).sort()
	globalGNIs = mappedGNIs.map(d => {
		return {
			incomeLevel: d,
			selected: false
		}
	})

	colorScale.domain(mappedGNIs.reverse())
	
	//select the svgElement with D3
	svgObj = d3.select('.svgWrapper')

	//nest a group inside svg
	mapG = svgObj.append('g').attrs({
		'class': 'mapG',
		'pointer-events': 'all'
	})

	//collect the mapGDataJoin
	const mapGDataJoin = mapG.selectAll('g').data([null]);
	
	//mapGEnter selection
	const mapGEnter = mapGDataJoin.enter()
		.append('g')
		.attr('class', 'zoomableG');
	
	//the merged Selection
	thisGMerged = mapGDataJoin.merge(mapGEnter);

	//add the zoom transformation onto the 
	mapG.call(d3.zoom().on('zoom',() => {
		thisGMerged.attr('transform', d3.event.transform)
	}))

	//append the globe here
	thisGMerged.append('path')
	.attrs({
		'd': pathGenerator({type:'Sphere'}),
		'class':'spherePath'
	})
	
	handleCountryUpdates(srcCountries)

}

function handleCountryUpdates(srcData){
	console.log('srcData.features')
	console.log(srcData.features)
	
	
	//make a data join of paths
	dataJoin = thisGMerged.selectAll('.countryPath')
		//join the FEATURES to the PATHS
		.data(srcData.features, d => `${d.countryName}${d.id}`).join(enterMap, updateMap)
}