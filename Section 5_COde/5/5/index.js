//assign global reference to data
prepData('./statePoverty.json').then(res => {
	// get just the states for the buttons
	justStates = res.map(d =>{
		return {State: d.State, checked: d.selected}
	})

	//return states data for buttons, res for bar Chart
	return {justStates, res}
}).then(({justStates, res}) => {
	
	//build the buttons
	buildButtons(justStates, 'buttonWrapper');

	//add button events
	let radios = d3.selectAll('.buttonG')
	radios.on('click', updateSelectedState)
	
	//get selected data
	let selectedData = res.filter(d => d.State == justStates.filter(s => s.checked == true)[0].State)[0];

	//prep chart data
	let preppedData = filterDataForCharts(selectedData)
	
	//build pie chart
	prepPieChart('pieDiv', preppedData.pie)
		.then(handlePieUpdate)

	//build bar chart
	prepBarChart('barDiv', preppedData.bar)
		.then(handleBarUpdate)
		
	d3.select(window).on('resize',serializer(resizeBar, resizePie));
})

