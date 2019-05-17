function drawElements(parent, data){
	
	//create data-join
	let dataJoin = parent.selectAll('rect').data(data, d => d.id);

	//describe how to handle the data && elements
	dataJoin.join(enterFn, updateFn, exitFn)
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
	 .call(u => u.transition().duration(500)
      .attr("x", (d, i) => (i * 40) + 60))
}

let exitFn = exit => exit
	.call(exit => exit.transition().duration(200)
	.attr("width", 0)
	.remove())