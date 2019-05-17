function buidTreeLayout(parentID, sourceData){

	const div = d3.select(parentID);

	const margin = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 100
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

	let treeFn = d3.tree()
		.size([height, width - 200]);

	var linkDataJoin = g.selectAll(".link")
		.data(treeFn(sourceData).links());

	linkDataJoin
		.enter().append("path")
			.attr("class", "link")
			.merge(linkDataJoin)
			.attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));
	
	var nodeDataJoin = g.selectAll(".node")
		.data(sourceData.descendants());

	let nodeEnter = nodeDataJoin.enter().append("g")
		.merge(nodeDataJoin)
			.attrs({
				"class": d => "node" + (d.children ? " node--mid" : " node--final"),
				"transform": d => `translate(${d.y},${d.x})`
			})

	let nodeCircle = nodeEnter.append("circle").attr("r", 2.5);

	let nodeTxt = nodeEnter.append("text")
		.attrs({
			"dy": 3,
			"x": d => d.children ? -8 : 8,
			"y": d => (d.children && d.parent !== null) ? -8 : 0,
			'class':'nodeText'
		})
		.style("text-anchor", d => d.children ? "end" : "start")
		.text((d) => d.id);
}