//1. writing implements
let writingUtensils = [
	{type: 'pencil', id:1},
	{type: 'pen', id:2},
	{type: 'pencil', id:3}
]

//d3 handles html elements
const chartDiv = d3.select('#chartWrapper');
const svgObj = chartDiv.append('svg')
	.attrs({
		'class': 'svgWrapper',
		'height':500,
		'width':700
	});

//color th implements
const colorScale = d3.scaleOrdinal()
.domain(['pencil','pen', 'marker'])
.range(['rgb(160,80,50)','darkblue', 'hotpink']);	

//draw the elements
drawElements(svgObj, writingUtensils)

// //2. ADD 
setTimeout(() => {
	//remove a pencil
	writingUtensils.push({type: 'pen', id: (writingUtensils.length + 1)});
	drawElements(svgObj, writingUtensils)
}, 2000)