const margin = {
	top: 20,
	right: 60,
	bottom: 60,
	left: 70
};

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
	
	// D3 select The elements & convert to vars
	let chartWrapper = document.getElementById("chartWrapper");

	// get new dimensions
  	let newDimensions = getWidthAndHeight(chartWrapper, margin)
  	
  //pass new dimensions to svg element
  	d3.select('svg')
	    .attrs({
	      'width': newDimensions.width,
	      'height': newDimensions.height
	    })

	//reset g translation
	d3.select('.gWrapper').attr('transform', `translate(${newDimensions.width/2}, ${newDimensions.height/2 })`);

	//update pie radius
	radius = Math.min(newDimensions.widthLessMargins, newDimensions.heightLessMargins) * .45;

	//update outerRadius of arcFn
	arcFn.outerRadius(radius - 10)

	labelArcFn
	    .outerRadius(radius / 2)
    	.innerRadius(radius * .75);

   	//updte pie slices
	d3.select('.gWrapper').selectAll('path')
		.attr('d', arcFn)

	//update slice text
	d3.selectAll('.arcText')
		.attr("transform", d => "translate(" + labelArcFn.centroid(d) + ")")
}