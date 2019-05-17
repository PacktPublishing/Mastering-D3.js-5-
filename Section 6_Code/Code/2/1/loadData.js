// Return the size of the node
const sumBySize = d => d.size;

function prepData(dataSrcString, idKey, parentKey){

	return new Promise((res, rej) => {
		let resData = null;
		//load csv data, assign to var
		return d3.csv(dataSrcString).then(data => {
			
			let resData = null;
			
			//stratify data
	    var stratRootData = d3.stratify()
	        .id(d => d[idKey])
	        .parentId(d => d[parentKey])
	        (data);

	    let organized = stratRootData.sum(sumBySize)
		    .sort((a, b)=> b.height - a.height || b.value - a.value);
	    

			res(organized)
		})
	})
}