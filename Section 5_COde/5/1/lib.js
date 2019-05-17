function buildButtons(srcData, parentID){
	let parent = d3.select(`#${parentID}`)
	let dataJoin = parent
		.selectAll('g')
		.data(srcData);
		dataJoin.join(enterRadio, updateRadio)
}

function enterRadio(enterSelection){
	let groups = enterSelection.append('g')
	.attr('class', 'buttonG');

	groups.append('input')
	.attrs({
		'type': 'radio',
		'value': d => d.State,
		'class': 'stateRadio',
		'checked': d => (d.checked == true) ? true : null,
		'name': 'selectedState'
	})
	
	groups.append('text')
		.text(d => d.State)
}

function updateRadio(updateSelection){	
	updateSelection.select('.stateRadio')
		.call(u => u.transition().duration(0)
		.attr('checked', d => {
			return (d.checked == true) ? true : null
		}))
}

function updateSelectedState(e){

	// update the 'selected' state status in our data
	justStates = justStates.map(d => {
		d.checked = false;

		if(d.State == e.State){
			d.checked = true;
		}
		return d
	})
	
	//update buttons
	buildButtons(justStates, 'buttonWrapper')
	
		//update selected data
	let selectedData = rootData.filter(d => d.State == justStates.filter(s => s.checked == true)[0].State)[0]
	console.log('selectedData')
	console.log(selectedData)
}