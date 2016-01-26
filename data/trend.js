function tagTrend(data, width_raw, height_raw)
{
	  var margin = {
		top: 20,
		right: 80,
		bottom: 30,
		left: 70
	               },

	width = width_raw - margin.left - margin.right,
	height = height_raw - margin.top - margin.bottom;

	var parseDate = d3.time.format("%Y%m%d").parse;

	var x = d3.time.scale()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var color = d3.scale.category10();

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var line = d3.svg.line()
		.interpolate("basis")
		.x(function (d) {
		return x(d.date);
	})
		.y(function (d) {
		return y(d.popularity);
	});

	var svg = d3.select("#trendGraph").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	color.domain(d3.keys(data[0]).filter(function (key) {
		return key !== "date";
	}));

	data.forEach(function (d) {
		d.date = parseDate(d.date);
	});

	var cities = color.domain().map(function (name) {
		return {
			name: name,
			values: data.map(function (d) {
				return {
					date: d.date,
					popularity: +d[name]
				};
			})
		};
	});

	x.domain(d3.extent(data, function (d) {
		return d.date;
	}));

	y.domain([
	d3.min(cities, function (c) {
		return d3.min(c.values, function (v) {
			return v.popularity;
		});
	}),
	d3.max(cities, function (c) {
		return d3.max(c.values, function (v) {
			return v.popularity;
		});
	})]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// add the y axis and y-label
	svg.append("g")
		  .attr("class", "y axis")
		  .attr("transform", "translate(0,0)")
		  .call(yAxis);
	svg.append("text")
		  .attr("class", "ylabel")
		  .attr("y", 0 - margin.left + 70) // x and y switched due to rotation!!
		  .attr("x", 0 - (height / 2))
		  .attr("dy", "1em")
		  .attr("transform", "rotate(-90)")
		  .style("text-anchor", "middle")
		  .style("font-size", "13px")
		  .text("question number /month");

	//Add title in the graph
	svg.append("text")
	   .attr("x", (width / 2))             
	   .attr("y", 0 - (margin.top / 3))
	   .attr("text-anchor", "middle")  
	   .style("font-size", "17px")
	   .text("Asking trend in Stack Overflow");
		
		
	var city = svg.selectAll(".city")
		.data(cities)
		.enter().append("g")
		.attr("class", "city");

	city.append("path")
		.attr("class", "line")
		.attr("d", function (d) {
		return line(d.values);
	})
		.style("stroke", function (d) {
		return color(d.name);
	});

	city.append("text")
		.datum(function (d) {
		return {
			name: d.name,
			value: d.values[d.values.length - 1]
		};
	})
		.attr("transform", function (d) {
		return "translate(" + x(d.value.date) + "," + y(d.value.popularity) + ")";
	})
		.attr("x", 3)
		.attr("dy", ".35em")
		.style("font-size", "12px")
		.text(function (d) {
		return d.name;
	});
	
}
	