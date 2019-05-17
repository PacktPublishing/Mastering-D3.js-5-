function enterLegendItems(enterLegendSelection){

	//individual legend item Group wrapper
	let legendItemG = enterLegendSelection.append('g')
	.attrs({
		'transform' : (d,ind) => `translate(0, ${(ind * 30)})`,
		'class': 'singleLegendItem'
	})
	.on('click', updateSelectedGNI)

	//legend text
	let legendItemsText = legendItemG.append('text')
		.attrs({
			'font-size': '18px',
			'fill': 'black',
			'transform': 'translate(15, 0)'
		})
		.text(d => d)

	//append circles
	let legendCircles = legendItemG.append('circle')
		.attrs({
			'r': '10',
			'fill': colorScale,
			'stroke': 'gray',
			'stroke-width': '1',
			'transform' : 'translate(0,-7)'
		})
}

//hanldes updated legend items
function updateLegendItems(updateSelection){

	updateSelection.select('.singleLegendItem text')
	.attr('opacity' , d => {
		
		//calculate opacity level
		let amount = (selectedLevel == null) ? 1 : 
			d == selectedLevel ? 1 : .25;

		return amount
    })
}

function handleLegendUpdates(legendItems){
	let legendItemsDataJoin = d3.select('.colorLegendG')
		.selectAll('.singleLegendItem')
		.data(legendItems)
		.join(enterLegendItems, updateLegendItems)
}

function prepLegend(legendItems){
	
	//count # of legend items
	let itemCount = legendItems.length

	//select the svg wrapper
	svgWrapper = d3.select('.svgWrapper')


	let svgObj = document.getElementsByClassName('svgWrapper')[0]
	
	//append legend rectangle
	svgWrapper.append('rect')
		.attrs({
			height: itemCount * 35,
			width: 250,
			fill: 'rgb(255,255,255)',
			stroke: 'rgba(255,255,255)',
			class: 'colorLegendRect',
			x: svgObj.clientWidth - 250,
			y: svgObj.clientHeight - (itemCount * 35) - 20
		})

	//append a group wrapper for legend items
	let colorLegendG = svgWrapper
		.append('g')
		.attrs({
			'class': 'colorLegendG',
			'transform': `translate(${svgObj.clientWidth - 230},${svgObj.clientHeight - (itemCount * 35) + 10})`
		})

	//call a legend updater
	handleLegendUpdates(legendItems)
}