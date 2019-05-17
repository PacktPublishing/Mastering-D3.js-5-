function getTop(int, data, sortByKey){
	//sort array
	let sortedData = data.sort(function(a, b){
		return (b[sortByKey] - a[sortByKey])
	})
	return sortedData.slice(0, int)
}

function convertToIntegers(srcData){
	return srcData.map(d => {
		d.GNI = parseInt(d.GNI);
		if(typeof d.GNI == 'number'){
			return d
		}else{ null}
	}).filter(d => d.GNI);
}

function prepData(srcString){

	return new Promise((resolve, reject) => {
		let resData = null;

		//load csv data, assign to var
		return d3.csv(srcString).then(data => {

			let convertedIntegers = convertToIntegers(data);

			let filteredRes = getTop(5, convertedIntegers, 'GNI')

			resolve(filteredRes)
		})
	})
}