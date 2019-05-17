function drawElements(parent, data){
	
	let groupDataJoin = parent.selectAll('g').data(data, d => d.id);

	//describe how to handle the data && elements
	groupDataJoin.join(enterFn, updateFn, exitFn)
}

const setX = (d,i) => (i * 70) + 60

//handle when elements 'enter' the screen, new elements
function enterFn(e){
	let groups = e.append('g')
	groups.append('rect')
		.attrs({
			'x' : setX,
			'y' : '50',
			'height' : '100',
			'width': '10',
			'fill' : d => colorScale(d.type)
		})

	groups.append('text')
		.attrs({
			'x' : setX,
			'y' : '175',
			'fill' :'black',
			'text-anchor': 'middle'
		}).text(d => d.type)
}

function updateFn(u){ 
	u.select('rect')
	 .call(u => u.transition().duration(500)
      .attr("x", setX))
	  .attr('fill', d => colorScale(d.type))
	  .selectAll('text')

	u.select('text')
	 .call(u => u.transition().duration(500)
      .attr("x", setX)
      .text(d => d.type))

}

let exitFn = exit => {

	exit.select('rect')
	 .call(exit => exit.transition().duration(300)
		.attr("width", 0)
		.remove())

	exit.select('text')
	 .call(exit => exit.transition().duration(300).remove())

	exit.call(exit => exit.transition().duration(300).remove())
}

	