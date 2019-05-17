prepData('./treeData.csv', 'id', 'parent').then(data => {
	buidTreeLayout('#chartWrapper', data)	
})