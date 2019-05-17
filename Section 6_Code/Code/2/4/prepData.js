function getTop(int, data, sortByKey){
	//sort array
	let sortedData = data.sort(function(a, b){
		return (b[sortByKey] - a[sortByKey])
	})
	return sortedData.slice(0, int)
}

function convertToIntegers(array){
	return array.map(d => {
		d.GNI = parseInt(d.GNI);
		if(typeof d.GNI == 'number'){
			return d
		}else{ null }
	}).filter(d => d.GNI);
}

function groupByLevel(srcData){
	let resArr = []
	
	srcData.forEach(d => {
		
		//check if this level is in array
		let isInArr = resArr.filter(ind => ind.level == d.IncomeGroup)[0]
		
		//if not in array, add to array with value of 1
		if(isInArr == undefined){
			let thisObj = {
				level: d.IncomeGroup,
				count: 1
			}
			resArr.push(thisObj)
		}

		//if in array, add to array value
		if(isInArr !== undefined){
			return resArr.map(obj => {
				if(obj.level == d.IncomeGroup){
					obj.count = obj.count + 1;
				}
				return obj
			})

		}
		
	})
	
	return resArr
}

function prepData(srcString, idKey, parentKey){
	return new Promise((resolve, reject) => {

		return d3.csv(srcString).then(result => {
			
			let parsedData = result.map(r => {
				r.size = +r.size;
				return r;
			})
						
			//stratify the data
			let stratData = d3.stratify()
		        .id(d => d[idKey])
		        .parentId(d => d[parentKey])
		        (parsedData)

		    let hierarchedNodes = stratData.sum(d => d.size)
		    .sort((a, b)=> b.height - a.height || b.value - a.value);
			
			resolve(hierarchedNodes);
		})
	})
}