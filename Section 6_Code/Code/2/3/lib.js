function getWidthandHeight(obj, m){
	let width = +obj.attr("width");
	let height = +obj.attr("height");
	return { width, height }
}

function appendToParent(parent, type, className, transformation){
	return parent.append(type)
        .attrs({
            "class": className,
            "transform": transformation
        });
}