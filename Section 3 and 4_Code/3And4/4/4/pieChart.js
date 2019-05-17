function buildPieChart(parentID, sourceData){

	let chartWrapper = document.getElementById(parentID);
	const colorScale = d3.scaleOrdinal(d3.schemeBlues[5]);

	const div = d3.select(`#${parentID}`);

	//get width & height
	const dimensions = getWidthAndHeight(chartWrapper, margin)
	
	radius = Math.min(dimensions.width, dimensions.height) * .45;
	
	arcFn = d3.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(0);

	labelArcFn = d3.arc()
	    .outerRadius(radius / 2)
    	.innerRadius(radius * .75);

	const pieFn = d3.pie()
	    .value(d => d.count);

	const pieData = pieFn(sourceData)

	//append svg & g elements
	let svg = appendToParent(div, 'svg', 'svgWrapper', null)
		.attrs({
			height: dimensions.height,
			width: dimensions.width
		})

	let g = appendToParent(svg, 'g', 'gWrapper', `translate(${dimensions.width/2},${dimensions.height/2})`)

	let arcs = g.selectAll(".arc").data(pieData).join(enterFn)
	    

    function enterFn(enterSelection){
    	enterSelection.append("g")
		    .attr("class", "arc");

		enterSelection.append("path")
		      .attr("d", arcFn)
		      .style("fill", (d, ind) => colorScale(ind));

		let arcText = enterSelection.append("text")
			.attr('class', 'arcText')
		    .attr("transform", d => "translate(" + labelArcFn.centroid(d) + ")")
		    .attr("dy", ".35em");

		arcText.append('tspan')
			.attr('text-anchor', 'middle')
		    .text(d => `${d.data.level}`);

		arcText.append('tspan')
			.attr('dy', 20)
			.attr('dx', -20)
			.attr('text-anchor', 'middle')
		    .text(d => `${d.data.count}`);
    }

	d3.select(window).on('resize',resize);

}