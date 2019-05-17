//run the project
prepData('./data.csv', 'id', 'parent').then(data => {
	console.log('prepData result');
	console.log(data)
})