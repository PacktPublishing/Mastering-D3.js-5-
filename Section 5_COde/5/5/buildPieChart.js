function prepPieChart(parentID, sourceData){

	return new Promise((res, rej) => {

		let chartWrapper = document.getElementById(parentID);
		colorScale = d3.scaleOrdinal(d3.schemeBlues[5]);

		const div = d3.select(`#${parentID}`);

		//get width & height
		const dimensions = getWidthAndHeight(chartWrapper, margin)
		
		let radius = Math.min(dimensions.width, dimensions.height) * .45;
		
		arcFn = d3.arc()
		    .outerRadius(radius - 10)
		    .innerRadius(0);

		labelArcFn = d3.arc()
		    .outerRadius(radius / 2)
	    	.innerRadius(radius * .75);

		pieFn = d3.pie()
		    .value(d => d.Value);

		//append svg & g elements
		let svg = appendToParent(div, 'svg', 'pieSVGWrapper', null)
			.attrs({
				height: dimensions.height,
				width: dimensions.width
			})

		pieGWrapper = appendToParent(svg, 'g', 'pieGWrapper', `translate(${dimensions.width/2},${dimensions.height/2})`)
		
		res({sourceData, pieFn})
	})
}