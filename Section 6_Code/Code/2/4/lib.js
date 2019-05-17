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

function computeTextRotation(d){
    
    //get angle of segment
    var angle = (d.x0 + d.x1) / Math.PI * 90;
    
    //amke text always right-side-up
    return (angle < 120 || angle > 260) ? angle : angle + 180;
}

function transformText(d, arcFn){
    let thisTranslate = arcFn.centroid(d)
    let rotation =  (d.height == 2) ? 0 : computeTextRotation(d);
  return `translate(${thisTranslate}) rotate(${rotation})`
}