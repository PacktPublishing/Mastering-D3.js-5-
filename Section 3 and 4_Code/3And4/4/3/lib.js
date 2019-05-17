const margin = {
	top: 20,
	right: 60,
	bottom: 60,
	left: 70
};

let xScale = null,
	yScale = null,
	xAxis = null,
	yAxis = null;

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

function resize(){
  
  let chartWrapper = document.getElementById("chartWrapper");

  // get new dimensions
  let newDimensions = getWidthAndHeight(chartWrapper, margin)
  
  //pass new dimensions to svg element
  d3.select('svg')
    .attrs({
      'width': newDimensions.width,
      'height': newDimensions.height
    })

	//adjust scale ranges
	xScale.range([0, newDimensions.widthLessMargins]);
	yScale.range([newDimensions.heightLessMargins, margin.top]);

	//adjust placement of axis
	xAxis.call(d3.axisBottom(xScale))
	d3.select('.xAxis').attr('transform', `translate(0,${newDimensions.heightLessMargins})`);
	yAxis.call(d3.axisLeft(yScale)
		//responsive number of yAxis Ticks
		.ticks(Math.max(newDimensions.heightLessMargins/80, 2))
	)

	//adjust bars
	d3.selectAll('.bar').attrs({
		"x": d => xScale(d.CountryName),
		"y": d => yScale(d.GNI),
		"width": xScale.bandwidth(),
		"height": d => newDimensions.height - margin.bottom - margin.top - yScale(d.GNI)
	});

}