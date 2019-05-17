function buildBarChart(parentID, sourceData){

	const div = d3.select(parentID);

	const margin = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 50
	};

	//get width & height
	const {width, height} = getWidthandHeight(div, margin)
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

	let g = appendToParent(svg, 'g', 'gWrapper', `translate(${margin.left},${margin.top})`)

	//D3 Scales
	var xScale = d3.scaleBand()
		.domain(sourceData.map(d => d.CountryName))
		.range([0, width - margin.right])
		.paddingInner(.1)
		.paddingOuter(.1)


	var yScale = d3.scaleLinear()
		.domain([0, d3.max(sourceData, d => d.GNI)])
		.range([height - margin.bottom - margin.top, margin.top]);

	//Axis elements
	let xAxis = appendToParent(g, 'g','xAxis', `translate(0,${height - margin.bottom - margin.top})`)
		.call(d3.axisBottom(xScale));

	let yAxis = appendToParent(g, 'g', 'yAxis', null)
		.call(d3.axisLeft(yScale));

	let rects = g.selectAll(".bar")
	
	let rectsEnter = rects.data(sourceData).enter();
	
	rectsEnter.append("rect")
		.attrs({
			"class": "bar",
			"fill": 'steelblue',
			"x": d => xScale(d.CountryName),
			"y": d => yScale(d.GNI),
			"width": xScale.bandwidth(),
			"height": d => height - margin.bottom - margin.top - yScale(d.GNI)
		});

}