function prepData(fileName){

	return new Promise((res, rej) => {
		let resData = null;
		//load json data, assign to var
		return d3.json(fileName).then(data => {

			// SELECT first item
			let withSelection = data.map((d, ind) => {
				d['selected'] = (ind == 0) ? true : false
				return d
			})
			
			res(withSelection)
		})
	})
}