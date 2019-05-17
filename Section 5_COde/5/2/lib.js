const margin = {
	top: 20,
	right: 60,
	bottom: 60,
	left: 70
};

let curBarHeight = null;

function getWidthAndHeight(divID, margin){
	let height = divID.clientHeight
	let width = divID.clientWidth;
	let widthLessMargins = width - margin.left - margin.right;
	let heightLessMargins = height - margin.top - margin.bottom;
	return { width, height, widthLessMargins, heightLessMargins }
}

function appendToParent(parent, type, className, transformation){
	return parent.append(type)
        .attrs({
            "class": className,
            "transform": transformation
        });
}

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
}

function filterDataForBar(srcObj){
	let preppedBarData = []
	for(key in srcObj){
		if(!['State','Male','Female','TotalBelowPoverty', 'selected'].includes(key)){
			let obj = {};
			
			obj['stat'] = key;
			obj['value'] = srcObj[key]

			preppedBarData.push(obj)
 		}
	}
	return preppedBarData;
}

function resize(){
  
  let chartWrapper = document.getElementById("barDiv");

  // get new dimensions
  let newDimensions = getWidthAndHeight(chartWrapper, margin)
  
  //pass new dimensions to svg element
  d3.select('.barSVGWrapper')
    .attrs({
      'width': newDimensions.width,
      'height': newDimensions.height
    })

	//adjust xScale range
	barXScale.range([0, newDimensions.widthLessMargins]);

	//adjust placement of axis
	barXAxis.call(d3.axisBottom(barXScale))
	d3.select('.xAxis').attr('transform', `translate(0,${newDimensions.heightLessMargins})`);
	barYAxis.call(d3.axisLeft(barYScale))

	//adjust bars
}