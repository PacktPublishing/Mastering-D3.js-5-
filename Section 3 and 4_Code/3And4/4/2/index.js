//select The elements & convert to vars
let chartWrapper = document.getElementById("chartWrapper");

// Extract the width and height that was computed by CSS.
let dimensions = getWidthAndHeight(chartWrapper)

//set svg width & height
let svgWrapper = d3.select('#chartWrapper').append('svg')
  svgWrapper.attrs({
  	width: dimensions.width,
  	height: dimensions.height
  })

//set a yScale for the rectangle
let yScale = d3.scaleLinear()
	.domain([0,1])
	.range([20, dimensions.height])

//make rectange with some attrs
svgWrapper.append('rect')
	.attrs({
	    'x': dimensions.width /2,
	    'y': dimensions.height * .05,
	    'height' : dimensions.height * .9,
	    'width' : 20,
	    'fill' : 'steelblue',
	    'stroke': 'steelblue',
	   	'class': 'myRect'
	})

//make resize call on resize window
d3.select(window).on('resize', resize);