//Derivirate from http://bl.ocks.org/mbostock/3884955
function featureGraph(featureContent, width_raw, height_raw, offset, position, distance, charge) {

var margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: offset
             },
 width = width_raw - margin.left - margin.right,
 height = height_raw - margin.top - margin.bottom;		
		
var border=1;
var bordercolor='gray';
	
var color = d3.scale.category20();      //This is only for color domain
//Give a number a color in order
for (i = 0; i < 15; i++) { 
   color(i);
}

var svg = d3.select(position).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.attr("border",border)
	;

//add borther to the svg
var borderPath = svg.append("rect")
       			.attr("x", margin.left)
       			.attr("y", 0)
       			.attr("height", height)
       			.attr("width", width)
       			.style("stroke", bordercolor)
       			.style("fill", "none")
       			.style("stroke-width", border);	
	
	
var force = d3.layout.force()
    .gravity(.05)
    .distance(distance)
    .charge(charge)
    .size([width, height]);

	
	
//Set up tooltip
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-3, 0])
    .html(function (d) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "https://api.stackexchange.com/2.2/tags/"+d.name.replace("#","%23")+"/wikis?site=stackoverflow&key=IQXyZwA1rHRM4rguoGZ)xQ((", false );
    xmlHttp.send();
	if (xmlHttp.responseText.indexOf("\"excerpt\"")>-1)
		{return  JSON.parse(xmlHttp.responseText)["items"][0]["excerpt"].split(". ")[0] + ".</span>";}
	else
		{return "No wiki";}
})
svg.call(tip);	
	
var json = featureContent;
//json = JSON.parse(jsondata)
	
  force
	  //.alpha(10)
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
      .enter().append("line")
	  .style("stroke", function(d) { return color(d.color); })
      .attr("class", "link");
	

  var node = svg.selectAll(".node")
      .data(json.nodes)
	  .enter().append("g")
      .attr("class", "node")
      .call(force.drag)
	  //.on('dblclick', reDirect)
    .on('dblclick', function(d) {reDirect(this);
        if (window.location.pathname.indexOf('/tagid/')!= -1){
          recordBehaviour(window.location.pathname.replace('/tagid/','').replace('+++','#'),'dbl_click', d.name);
        }
        else {
          recordBehaviour(window.location.pathname.replace('+++','#'),'dbl_click',d.name);
        }})
    //.on('dblclick', reDirect)
	  .on('mouseover', connectedNodes)
	  .on('mouseout', allNodes)
	  .on('contextmenu', function(d){d3.event.preventDefault();tip.show(d);        
        if (window.location.pathname.indexOf('/tagid/')!= -1){
          recordBehaviour(window.location.pathname.replace('/tagid/','').replace('+++','#'),'right_click',d.name);
        }
        else {
          recordBehaviour(window.location.pathname.replace('+++','#'),'right_click',d.name);
        }})  //.on('mousedown', tip.show)
      .on('mouseleave', tip.hide)  //.on('mouseup', tip.hide)
	  ;

  node.append("circle")
    .attr("r", function(d) { return d.degree;})
    .style("fill", function (d) {return color(d.group);})
	
  node.append("text")
      .attr("dx", 3)           //It means the offset of label and circle
      .attr("dy", ".35em")
      .text(function(d) { return d.name })
      .style("font-size",function(d) { return d.degree*2+'px' })
	  .style("stroke", "gray");  
	  
	  
	  
  force.on("tick", function() {
    
	var radius = 10;
	
	node.attr("transform", function(d) { return "translate(" + Math.max(radius, Math.min(width - radius, d.x)) + "," + Math.max(radius, Math.min(height - radius, d.y)) + ")"; });
	
	link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

  });
  
 
  var linkedByIndex = {};
  for (i = 0; i < json.nodes.length; i++) 
  {
     linkedByIndex[i + "," + i] = 1;
  };
  
  json.links.forEach(
   function (d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
   });

   //This function looks up whether a pair are neighbours
  function neighboring(a, b) 
  {  
    return linkedByIndex[a.index + "," + b.index];
  }
  
  function connectedNodes() 
  {
        //Reduce the opacity of all but the neighbouring nodes
        d = d3.select(this).node().__data__;
        //console.log(d.name);
		node.style("opacity", function (o) {
            return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
        });
        link.style("opacity", function (o) {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
        });         
  }
  
  function allNodes()
  { 
  node.style("opacity", 1);
  link.style("opacity", 1);
  }
  
  function reDirect(currentElement)
  {
  d = d3.select(currentElement).node().__data__;
  window.location.assign("/tagid/"+d.name.replace("#", "+++"));  //c# -- c+++
  }

}