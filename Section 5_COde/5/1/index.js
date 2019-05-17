let justStates = null,
rootData = null;

prepData('./statePoverty.json').then(res => {

	// get just the states for the buttons
	justStates = res.map(d =>{
		return {State: d.State, checked: d.selected}
	})

	//return states data for buttons, res for chart Data
	return {justStates, res}
}).then(({justStates, res}) => {

	//build the buttons
	buildButtons(justStates, 'buttonWrapper');

	rootData = res;

	//add button events
	let radios = d3.selectAll('.buttonG')
	radios.on('click', updateSelectedState)
})