function buildTreeMap(parentID, sourceData){

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

	let g = appendToParent(svg, 'g', 'gWrapper', `translate(${margin.left},${margin.top})`)

	const treemapFn = d3.treemap()
	    .size([width - margin.left - margin.right, height - margin.top -margin.bottom])
	    .paddingInner(1);

	treemapFn(sourceData);

	let stratLeaves = sourceData.leaves()
	
	const cellDataJoin = g.selectAll("g")
		.data(stratLeaves);

	cellDataJoinEnter = cellDataJoin.enter().append("g")
            .attrs({
                'transform': d => `translate(${d.x0},${d.y0})`,
                'class': 'dataJoinGWrapper'
            });

    // Add rectanges for each of the groups that were generated
    cellDataJoinEnter.append("rect")
        .attrs({
            "id": d => d.data.id,
            "width": d => d.x1 - d.x0,
            "height": d => d.y1 - d.y0,
            "fill": d => colorScale(d.parent.id),
            "class": 'enterRect'
        });

    //Text-Label
    cellDataJoinEnter.append("text")
        .text(d => d.id)
        .attr('y', 15)
        .attr('x', 5)
}