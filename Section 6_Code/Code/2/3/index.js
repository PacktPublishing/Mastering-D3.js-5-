prepData('./treeMapData.csv', 'id', 'parent').then(data => {
	buildTreeMap('#chartWrapper', data)	
})