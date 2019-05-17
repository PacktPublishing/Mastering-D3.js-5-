function drawElements(parent, data){
	
	//create data-join
	let dataJoin = parent.selectAll('rect').data(data);

	//describe how to handle the data && elements
	dataJoin.join(enterFn)	
}

//handle when elements 'enter' the screen, new elements
let enterFn = (e) => e.append('rect')
	.attrs({
		'x' : (d, i) => (i * 40) + 60,
		'y' : '50',
		'height' : '100',
		'width': '10',
		'fill' : d => colorScale(d.type)
	})