//reOrder array elements
var reOrder = function(theArray, a, b){
    var temp = theArray[a];
    theArray[a] = theArray[b];
    theArray[b] = temp;
    return theArray;
};

//1. writing implements
let writingUtensils = [
	{type: 'pencil', id: 0},
	{type: 'pen', id: 1},
	{type: 'marker', id: 2}
]

const h = 500, w = 700;

const chartDiv = d3.select('#chartWrapper');
const svgObj = chartDiv.append('svg')
	.attrs({
		'class': 'svgWrapper',
		'height':h,
		'width':w
	});

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
	writingUtensils = reOrder(writingUtensils, 0, 3)
	drawElements(svgObj, writingUtensils)
}, 5500)

//5
setTimeout(() => {
	writingUtensils = writingUtensils.filter((t,ind) => ind !== 1)
	console.log('#5 writingUtensils')
	console.log(writingUtensils)
	
	drawElements(svgObj, writingUtensils)
		
}, 7000)