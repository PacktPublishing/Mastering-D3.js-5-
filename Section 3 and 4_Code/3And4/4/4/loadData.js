function getTop(int, data){
	//sort array
	let sortedData = data.sort(function(a, b){
		return (b["GNI"] - a["GNI"])
	})
	return sortedData.slice(1, (int + 1))
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

function prepData(fileName){

	return new Promise((res, rej) => {
		let resData = null;
		//load csv data, assign to var
		return d3.csv(fileName).then(data => {

			let groupedData = groupByLevel(data)

			res(groupedData)
		})
	})
}