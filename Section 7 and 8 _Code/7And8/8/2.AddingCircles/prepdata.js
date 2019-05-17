function prepData(){

	return new Promise((res, rej) => {

		//placeholder for data from file
		let tsvData = null;

		//load country-detail data
		d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv')
			.then(tsvRes => {
				tsvData = tsvRes;	

				//load atlas data
				d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
					.then(jsonRes => {

						//load GNI data
						d3.csv('./countryGNIClassifications.csv').then(gniData => {

							//define countries from json Data
							const countries = topojson.feature(jsonRes, jsonRes.objects.countries);

							//connect country IDs to geography data
							countries.features.forEach(d => {
								
								//get this country ID
								let thisCountryID = d.id

								//assign a 'countryName' key to the countries features ele
								d.countryName = tsvData.filter(tsv => tsv.iso_n3 == [thisCountryID])[0].name
								
								//assign a 'gni' value from gniData
								let thisClassification = gniData.filter(gni => gni.CountryName == d.countryName)[0]
								d.gni = (thisClassification) ? thisClassification.Classification : null;
								
								if(globalGNIVals.includes(d.gni) == false){
									globalGNIVals.push(d.gni)
								}

								return d;
							})

							globalGNIVals = globalGNIVals.filter(d => d).sort()

							console.log('globalGNIVals')
							console.log(globalGNIVals)
							
							res(countries)

						})
					})
			})
	})
}