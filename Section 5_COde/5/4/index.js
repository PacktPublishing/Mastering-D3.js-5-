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

	//prep bar-chart data
	let preppedPieData = filterDataForPie(selectedData)
	
	//build bar chart
	prepPieChart('pieDiv', preppedPieData)
		.then(handlePieUpdate)
		
})

