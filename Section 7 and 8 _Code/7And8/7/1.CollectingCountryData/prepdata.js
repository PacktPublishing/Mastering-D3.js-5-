function prepData(){

	return new Promise((res, rej) => {

		//load country-detail data
		return d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv').then(tsvRes => {
			
			console.log('tsvRes')
			console.log(tsvRes)
			
			//load topojson data
			return d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json').then(jsonRes => {
				let jsonData = jsonRes;
						
				//define countries from json Data
				const countries = topojson.feature(jsonData, jsonData.objects.countries);

				//helper, data-matcher, adding country-name to the topojson data
				const getRowById = tsvRes.reduce((resultObj, d) => {
					resultObj[d.iso_n3] = d;
					return resultObj;
				}, {})

				countries.features.forEach(d => {	
					d.countryName = getRowById[d.id].name
					// d.gni = getRowById[d.id].gni
					return d;
				})

				res(countries);
			})
		});
	})
}