function prepData(){

	return new Promise((res, rej) => {

		//load country-detail data
		return d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv').then(tsvRes => {
			
			//helper, data-matcher, adding country-name to the topojson data
			const getDataElement = tsvRes.reduce((resultObj, d) => {
				resultObj[d.iso_n3] = d;
				return resultObj;
			}, {})

			return d3.csv('./countryGNIClassifications.csv').then(gniData => {
				
				//load topojson data
				return d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json').then(jsonRes => {
					let jsonData = jsonRes;
					
					//define countries from json Data
					const countries = topojson.feature(jsonData, jsonData.objects.countries);

					//add fields to each of the countries.features objects
					countries.features.forEach((d,ind) => {
						let thisCountry = getDataElement[d.id].name
						let thisIndex = getDataElement[d.id]
						if(ind !== 12 && 
						ind !== 99 &&
						ind !== 111 &&
						ind !== 119 &&
						ind !== 54){
								d.countryName = thisCountry																

								//get matching GNI data						
								let thisGNI = gniData.filter(gniItem => {
									if(gniItem.CountryName == d.countryName){
										return gniItem
									}else{ return }
								})

								//assign GNI data to countries.features
								d.gni = (thisGNI[0]) ? thisGNI[0].Classification : null

								return d;
						}else{ 
							return 'blank'
						}
					})

					res(countries);
				})
			})
		});
	})
}