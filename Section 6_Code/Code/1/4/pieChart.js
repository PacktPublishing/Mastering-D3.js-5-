function buildPieChart(parentID, sourceData){

	const colorScale = d3.scaleOrdinal(d3.schemeBlues[5]);

	const div = d3.select(parentID);

	const margin = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 50
	};

	//get width & height
	const {width, height} = getWidthandHeight(div, margin)

	const radius = Math.min(width, height) / 2;

	const arcFn = d3.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(0);

	const labelArcFn = d3.arc()
	    .outerRadius(radius / 2)
    	.innerRadius(radius * .75);

	const pieFn = d3.pie()
	    .value(d => d.count);

	const pieData = pieFn(sourceData)

	div.attrs({
		'width': width,
		'height': height
	})

	//append svg & g elements
	let svg = appendToParent(div, 'svg', 'svgWrapper', `translate(${margin.left},${margin.top})`)
		.attrs({
			height: height,
			width: width
		})

	let g = appendToParent(svg, 'g', 'gWrapper', `translate(${width/2},${height/2})`)

	let arcs = g.selectAll(".arc")
	      .data(pieData)
	    .enter().append("g")
	      .attr("class", "arc");

	arcs.append("path")
	      .attr("d", arcFn)
	      .style("fill", (d, ind) => colorScale(ind));

	let arcText = arcs.append("text")
	      .attr("transform", d => "translate(" + labelArcFn.centroid(d) + ")")
	      .attr("dy", ".35em");

	arcText.append('tspan')
		.attr('text-anchor', 'middle')
	    .text(d => `${d.data.level}`);

	arcText.append('tspan')
		.attr('dy', 20)
		.attr('dx', -50)
		.attr('text-anchor', 'middle')
	    .text(d => `${d.data.count}`);

}