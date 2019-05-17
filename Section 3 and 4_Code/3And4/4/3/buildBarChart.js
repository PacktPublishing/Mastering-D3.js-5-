function buildBarChart(parentID, sourceData){

	let chartWrapper = document.getElementById("chartWrapper");
	
	let div = d3.select(`#${parentID}`);

	//get width & height
	const {
		width, 
		height,
		widthLessMargins,
		heightLessMargins
	} = getWidthAndHeight(chartWrapper, margin)


	//append svg & g elements
	let svg = appendToParent(div, 'svg', 'svgWrapper')
		.attrs({
			height: height,
			width: width
		})

	let g = appendToParent(svg, 'g', 'gWrapper', `translate(${margin.left},${margin.top})`)

	//D3 Scales
	xScale = d3.scaleBand()
		.domain(sourceData.map(d => d.CountryName))
		.range([0, widthLessMargins])
		.paddingInner(.05)
		.paddingOuter(.01)

	yScale = d3.scaleLinear()
		.domain([0, d3.max(sourceData, d => d.GNI)])
		.range([heightLessMargins, margin.top]);

	//Axis elements
	xAxis = appendToParent(g, 'g','xAxis', `translate(0,${heightLessMargins})`)
		.call(d3.axisBottom(xScale));

	yAxis = appendToParent(g, 'g', 'yAxis', null)
		.call(d3.axisLeft(yScale));

	let rects = g.selectAll(".bar")
	
	let rectsEnter = rects.data(sourceData).join(enterFn)
	
	function enterFn(enterSelection){
		enterSelection.append("rect")
		.attrs({
			"class": "bar",
			"fill": 'steelblue',
			"x": d => xScale(d.CountryName),
			"y": d => yScale(d.GNI),
			"width": xScale.bandwidth(),
			"height": d => height - margin.bottom - margin.top - yScale(d.GNI)
		});
	}

	d3.select(window).on('resize', resize);
}