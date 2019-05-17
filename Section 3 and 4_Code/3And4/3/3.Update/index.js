//reOrder array elements
var reOrder = function(theArray, a, b){
    var temp = theArray[a];
    theArray[a] = theArray[b];
    theArray[b] = temp;
    return theArray;
};

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

const t = svgObj.transition().duration(650)

//color th implements
const colorScale = d3.scaleOrdinal()
.domain(['pencil','pen', 'marker']).range(['rgb(160,80,50)','darkblue', 'hotpink']);	

//draw the elements
drawElements(svgObj, writingUtensils)

//2. ADD 
setTimeout(() => {
	//remove a pencil
	writingUtensils.push({type: 'pen', id: (writingUtensils.length + 1)});
	drawElements(svgObj, writingUtensils)
}, 2000)

//3. UPDATE
setTimeout(() => {
	//remove a pencil
	writingUtensils = writingUtensils.map((t,ind) => {
		if(ind == 1) t.type = 'pencil';
		return t
	});
	drawElements(svgObj, writingUtensils)
}, 4000)

//3.2 UPDATE, SWITCH places
setTimeout(() => {
	//remove a pencil
	writingUtensils = reOrder(writingUtensils, 1, 3)
	drawElements(svgObj, writingUtensils)
}, 5500)