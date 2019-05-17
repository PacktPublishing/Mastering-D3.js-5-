function enterLegendItems(enterLegendSelection){
	
	//number of legend Items
	let legendItemG = enterLegendSelection.append('g')
		.attrs({
			'transform' : (d,ind) => `translate(5, ${(ind * 30)})`,
			'class': 'singleLegendItem'
		})
		.on('click', updateSelectedGNI)

	let legendCircles = legendItemG.append('circle')
		.attrs({
			'r': '10',
			'fill': (d,ind) => colorScale(d.incomeLevel),
			'stroke': 'gray',
			'stroke-width': '1',
			'transform' : 'translate(0,-10)'
		})

	let legendItemsText = legendItemG.append('text')
		.attrs({
			'font-size': '18px',
			'fill': 'black',
			'transform': 'translate(15, 0)'
		})
		.text(d => d.incomeLevel)
}

function updateLegendItems(updateSelection){

	updateSelection.select('.singleLegendItem text')
	.attr('opacity' , d => {
		
		let amount = (selectedLevel == null) ? 1 : 
			d.incomeLevel == selectedLevel ? 1 : .25;
		return amount
    })
}

function handleLegendUpdates(legendItems){
	let legendItemsDataJoin = d3.select('.colorLegendG')
		.selectAll('.singleLegendItem')
		.data(legendItems, d => d.incomeLevel)
		.join(enterLegendItems, updateLegendItems)
}

function prepLegend(legendItems){
	let itemCount = globalGNIs.length
	svgWrapper = d3.select('.svgWrapper')

	let svgObj = document.getElementsByClassName('svgWrapper')[0]
	
	svgWrapper.append('rect')
		.attrs({
			height: itemCount * 35,
			width: 250,
			fill: 'rgba(255,255,255,.7)',
			stroke: 'rgba(255,255,255,.9)',
			class: 'colorLegendRect',
			x: svgObj.clientWidth - 250,
			y: svgObj.clientHeight - (itemCount * 35) - 20
		})

	let colorLegendG = svgWrapper
		.append('g')
		.attrs({
			'class': 'colorLegendG',
			'transform': `translate(${svgObj.clientWidth - 230},${svgObj.clientHeight - (itemCount * 35) + 10})`
		})

	handleLegendUpdates(legendItems)
}