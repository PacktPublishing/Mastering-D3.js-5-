function buildSunburst(parentID, sourceData){

	let colorScale = d3.scaleOrdinal(d3.schemeDark2);
	
	const div = d3.select(parentID);

	const margin = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 20
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

	let g = appendToParent(svg, 'g', 'gWrapper', `translate(${width/2},${height/2})`)

	let sunburstLayout = d3.partition().size([2 * Math.PI, Math.min(width, height) / 2]);

	let dataDescendants = sourceData.descendants();
	let allButRoot = dataDescendants.filter(d => d.data.id !== 'flavor')

	sunburstLayout(sourceData);
	
	let arcFn = d3.arc()
		.startAngle(d => d.x0)
		.endAngle(d => d.x1)
		.innerRadius(d => ['tastes', 'aromas'].includes(d.data.id) ? 0 : d.y0)
		.outerRadius(d => d.y1);

	let sliceDataJoin = g.selectAll('g')
		.data(allButRoot);

	let sliceGs = sliceDataJoin.enter()
		.append('g')
		.attr("class", "sliceGWrapper")

	let singlePath = sliceGs.append('path')
		.attrs({
			"d": arcFn,
			'class': 'singleArc',
			'fill': d => colorScale(d.depth)
		});

	let segmentLabels = sliceGs
		.append("text")
		.attrs({
			"transform": d => transformText(d, arcFn),
			"dy": ".5em",
			'text-ancor': 'middle',
			'class': 'sliceText'
		})
		.text(d => d.data.id);
}