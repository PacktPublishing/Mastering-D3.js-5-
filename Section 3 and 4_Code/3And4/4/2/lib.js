function getWidthAndHeight(divID){
	let height = divID.clientHeight
	let width = divID.clientWidth;
	return { width, height }
}

function resize(){
  
  let chartWrapper = document.getElementById("chartWrapper");

  // get new dimensions
  let newDimensions = getWidthAndHeight(chartWrapper)
  
  //pass new dimensions to svg element
  d3.select('svg')
    .attrs({
      'width': newDimensions.width,
      'height': newDimensions.height
    })

  //re-set element placement
  d3.select('.myRect').attrs({
    'x': newDimensions.width / 2,
    'y': newDimensions.height * .05,
    'height' : newDimensions.height * .9
  })
}