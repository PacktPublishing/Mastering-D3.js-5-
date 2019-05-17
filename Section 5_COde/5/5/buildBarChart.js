function prepBarChart(parentID, sourceData){

	return new Promise((res, rej) => {
		let xFromData = d => d.stat;
		let yFromData = d => d.value;
		let heightFn = d => height - margin.bottom - margin.top - barYScale(d.value)
		let chartWrapper = document.getElementById(parentID);
		
		let div = d3.select(`#${parentID}`);



		//get width & height
		const {
			width, 
			height,
			widthLessMargins,
			heightLessMargins
		} = getWidthAndHeight(chartWrapper, margin)

		//store height @ global scope
		curBarHeight = height;
		
		//append svg & g elements
		let svg = appendToParent(div, 'svg', 'barSVGWrapper')
			.attrs({
				height: height,
				width: width
			})

		barGWrapper = appendToParent(svg, 'g', 'barGWrapper', `translate(${margin.left},${margin.top})`)

		//D3 Scales
		barXScale = d3.scaleBand()
			.domain(sourceData.map(xFromData))
			.range([0, widthLessMargins])
			.paddingInner(.05)
			.paddingOuter(.01)

		barYScale = d3.scaleLinear()
			.domain([0, d3.max(sourceData, yFromData)])
			.range([heightLessMargins, margin.top]);

		//Axis elements
		barXAxis = appendToParent(barGWrapper, 'g','xAxis', `translate(0,${heightLessMargins})`)
			.call(d3.axisBottom(barXScale));

		barYAxis = appendToParent(barGWrapper, 'g', 'yAxis', null)
			.call(d3.axisLeft(barYScale));

		res(sourceData);
	})
}