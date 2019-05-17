function updateSelectedGNI(d){
	selectedLevel = (selectedLevel == d.incomeLevel) ? null : d.incomeLevel;

	handleLegendUpdates(globalGNIs)
	handleCountryUpdates(rootData)
}