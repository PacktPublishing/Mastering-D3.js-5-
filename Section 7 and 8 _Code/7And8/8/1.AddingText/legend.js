function enterLegendItems(enterLegendSelection){

	let legendItemsText = enterLegendSelection.append('text')
		.attrs({
			'font-size': '18px',
			'fill': 'black',
			'transform' : (d,ind) => `translate(0, ${(ind * 30)})`
		})
		.text(d => d.incomeLevel)
}

function handleLegendUpdates(legendItems){
	let legendItemsDataJoin = d3.select('.colorLegendG')
		.selectAll('.singleLegendItem')
		.data(legendItems, d => d.incomeLevel)
		.join(enterLegendItems)
}

function prepLegend(legendItems){
	let itemCount = globalGNIs.length
	svgWrapper = d3.select('.svgWrapper')

	let svgObj = document.getElementsByClassName('svgWrapper')[0]
	
	svgWrapper.append('rect')
		.attrs({
			height: itemCount * 35,
			width: 250,
			fill: 'rgb(255,255,255)',
			stroke: 'rgba(255,255,255)',
			class: 'colorLegendRect'
		})

	let colorLegendG = svgWrapper
		.append('g')
		.attrs({
			'class': 'colorLegendG',
			'transform': `translate(${25},${25})`
		})

	handleLegendUpdates(legendItems)
}