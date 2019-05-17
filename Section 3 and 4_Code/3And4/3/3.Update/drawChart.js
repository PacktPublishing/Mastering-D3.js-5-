function drawElements(parent, data){
	
	console.log(' data =>');
	console.log(data)
	
	//create data-join
	let dataJoin = parent.selectAll('rect').data(data, d => d.id);

	//describe how to handle the data && elements
	dataJoin.join(enterFn, updateFn)
}

//handle when elements 'enter' the screen, new elements
function enterFn(e){
	e.append('rect')
	.attrs({
		'x' : (d, i) => (i * 40) + 60,
		'y' : '50',
		'height' : '100',
		'width': '10',
		'fill' : d => colorScale(d.type)
	})
}

function updateFn(u){ 
	u.attr('fill', d => colorScale(d.type))
	 .call(u => u.transition(t)
      .attr("x", (d, i) => (i * 40) + 60))
}