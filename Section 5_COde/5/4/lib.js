const margin = {
	top: 20,
	right: 60,
	bottom: 60,
	left: 70
};

let curBarHeight = null,
	barXScale = null,
	barYScale = null,
	barYAxis = null,
	barGWrapper = null,
	barXFromData = d => d.stat,
	scaledXVal = d => barXScale(d.stat),
	barYFromData = d => d.value,
	scaledYVal = d => barYScale(d.value);

function getWidthAndHeight(divID, margin){
	let height = divID.clientHeight
	let width = divID.clientWidth;
	let widthLessMargins = width - margin.left - margin.right;
	let heightLessMargins = height - margin.top - margin.bottom;
	return { width, height, widthLessMargins, heightLessMargins }
}

function appendToParent(parent, type, className, transformation){
	return parent.append(type)
        .attrs({
            "class": className,
            "transform": transformation
        });
}

function buildButtons(srcData, parentID){
	let parent = d3.select(`#${parentID}`)
	let dataJoin = parent
		.selectAll('g')
		.data(srcData);
		dataJoin.join(enterRadio, updateRadio)
}

function enterRadio(enterSelection){
	let groups = enterSelection.append('g')
	.attr('class', 'buttonG');

	groups.append('input')
	.attrs({
		'type': 'radio',
		'value': d => d.State,
		'class': 'stateRadio',
		'checked': d => (d.checked == true) ? true : null,
		'name': 'selectedState'
	})
	
	groups.append('text')
		.text(d => d.State)
}

function updateRadio(updateSelection){	
	updateSelection.select('.stateRadio')
		.call(u => u.transition().duration(0)
		.attr('checked', d => {
			return (d.checked == true) ? true : null
		}))
}

function updateSelectedState(e){

	// update the 'selected' state status in our data
	justStates = justStates.map(d => {
		d.checked = false;

		if(d.State == e.State){
			d.checked = true;
		}
		return d
	})
	
	//update buttons
	buildButtons(justStates, 'buttonWrapper')
	
		//update selected data
	let selectedData = rootData.filter(d => d.State == justStates.filter(s => s.checked == true)[0].State)[0]
	let preppedPieData = filterDataForPie(selectedData)

	let resObj = {sourceData: preppedPieData, pieFn: pieFn}
	//update bars
	handlePieUpdate(resObj)

}

function filterDataForPie(srcObj){
	
	let preppedBarData = []
	for(key in srcObj){
		if(['Female','Male'].includes(key)){
			let obj = {};
			
			obj['Gender'] = key;
			obj['Value'] = srcObj[key]
			obj['Percent'] = ((srcObj[key] / srcObj.TotalBelowPoverty) * 100).toFixed(1);

			preppedBarData.push(obj)
 		}
	}
	return preppedBarData;
}

function filterDataForBar(srcObj){
	let preppedBarData = []
	for(key in srcObj){
		if(!['State','Male','Female','TotalBelowPoverty', 'selected'].includes(key)){
			let obj = {};
			
			obj['stat'] = key;
			obj['value'] = srcObj[key]

			preppedBarData.push(obj)
 		}
	}
	return preppedBarData;
}

function resize(){
  
  let chartWrapper = document.getElementById("barDiv");

  // get new dimensions
  let newDimensions = getWidthAndHeight(chartWrapper, margin)
  
  //pass new dimensions to svg element
  d3.select('.barSVGWrapper')
    .attrs({
      'width': newDimensions.width,
      'height': newDimensions.height
    })

	//adjust xScale range
	barXScale.range([0, newDimensions.widthLessMargins]);

	//adjust placement of axis
	barXAxis.call(d3.axisBottom(barXScale))
	d3.select('.xAxis').attr('transform', `translate(0,${newDimensions.heightLessMargins})`);
	barYAxis.call(d3.axisLeft(barYScale))

	//adjust bars
	d3.selectAll('.bar').attrs({
		"x": scaledXVal,
		"width": barXScale.bandwidth(),
	});
}

function resizePie(){
  
  let chartWrapper = document.getElementById("pieDiv");

  // get new dimensions
  let newDimensions = getWidthAndHeight(chartWrapper, margin)
  
  //pass new dimensions to svg element
  d3.select('.pieSVGWrapper')
    .attrs({
      'width': newDimensions.width,
      'height': newDimensions.height
    })

	//reset g translation
	d3.select('.pieGWrapper').attr('transform', `translate(${newDimensions.width/2}, ${newDimensions.height/2 })`);

	//update pie radius
	radius = Math.min(newDimensions.width, newDimensions.height) * .45;
	
	//update outerRadius of arcFn
	arcFn.outerRadius(radius - 10)

	labelArcFn
	    .outerRadius(radius / 2)
    	.innerRadius(radius * .75);

   	//updte pie slices
	d3.select('.pieGWrapper').selectAll('path')
		.attr('d', arcFn)

	//update slice text
	d3.selectAll('.arcText')
		.attr("transform", d => `translate( ${labelArcFn.centroid(d) + 20 })`)

}

function handleBarUpdate(srcData){

	console.log('srcData')
	console.log(srcData)
	
	
	//update yScale && yAxis
	barYScale.domain([0, d3.max(srcData, d => d.value)]).nice()
	barYAxis.transition().duration(350).call(d3.axisLeft(barYScale))
	

	rects = barGWrapper.selectAll(".bar")
		.data(srcData)
		.join(enterBars,updateBars)
}

function enterBars(e){
	e.append("rect")
	.attrs({
		"class": "bar",
		"fill": 'steelblue',
		"x": scaledXVal,
		"y": scaledYVal,
		"width": barXScale.bandwidth(),
		"height": d => curBarHeight - margin.bottom - margin.top - barYScale(d.value)
	});
}

function updateBars(u){
	u.call(u => u.transition().duration(500)
      .attr("height", d => curBarHeight - margin.bottom - margin.top - barYScale(d.value))
      .attr("y", scaledYVal)
    )
}

function handlePieUpdate(res){

	let thisData = res.pieFn(res.sourceData)

	let arcs = pieGWrapper.selectAll(".arc").data(thisData).join(enterPie, updatePie)

	function enterPie(enterSelection){
    	
    	let enterG = enterSelection.append("g")
		    .attr("class", "arc");

		enterG.append("path")
		      .attr("d", arcFn)
		      .style("fill", (d, ind) => colorScale(ind));

		let arcText = enterG.append("text")
			.attrs({
				'class': 'arcText',
				"transform": d => "translate(" + labelArcFn.centroid(d) + ")",
		    	"dy": ".35em"
		    });

		arcText.append('tspan')
			.attr('text-anchor', 'middle')
			.attr('class', 'genderText')
		    .text(d => `${d.data.Gender}`);

		arcText.append('tspan')
			.attrs({
				'dy': 20,	
				'dx': -20,	
				'text-anchor': 'middle',
				'class': 'percentText'
			})
		    .text(d => `${d.data.Percent}%`);
    }

    function updatePie(u){
    	
    	u.select('.genderText').call(u => u.transition().duration(500)
	      .text(d => `${d.data.Gender}%`)
	    )

		u.select('.percentText').call(u => u.transition().duration(500)
	      .text(d => `${d.data.Percent}%`)
	    )
	    
	    u.select('path').call(u => u.transition().duration(500)
	      .attr("d", arcFn)
	    )
    }
}