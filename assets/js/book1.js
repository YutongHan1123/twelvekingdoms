var margin = {
		top: 0,
		bottom: 20,
		right: 30,
		left: 50
	};
	var width = window.innerWidth*0.4 - margin.left - margin.right;
	var height = window.innerHeight*0.6 - margin.top - margin.bottom;
	//Load Color Scale
	var colordata = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	var colors = d3.scaleOrdinal()
               .domain(colordata)
               .range(["#f3c623", "#d63447", "#84a9ac", "#844685", "#cfd186", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"]);
	var div = d3.select("#book1")
						.append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

	//Load External Data
	d3.json("../assets/data/book1.json", function(d){
		//Extract data from dataset
		var nodes = d.nodes,
			links = d.links;
		//Create Force Layout
		var force = d3.forceSimulation()
					  .force("link", d3.forceLink().id(function(d,i) {
                return i;
            })
						.distance(function(d){
							if(d.weight > 50) {
								return 135;
							} else {
								return 110 + d.weight*2;
							}
						}))
            .force("charge", d3.forceManyBody().strength(-400 ))
            .force("center", d3.forceCenter(width / 2,height / 2));

		var svgElement = d3.select("#book1")
							.append("svg")
							.attr("width", width+margin.left+margin.right) .attr("height", height+margin.top+margin.bottom)
							.append("g")
							.attr("transform","translate("+margin.left+","+margin.top+")");
		//Add links to SVG
		var link = svgElement.append('g')
						.attr('class','links')
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
						.attr("stroke-width", function(d){ return d.weight/5; })
						.attr("class", "links")
						.on("mousemove", function(d) {
							div.transition()
						.duration(200)
						.style("opacity", .9);
				div.html("<p> Proximity: " + d.weight + "</p>")
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY - 28) + "px");
						})
						.on("mouseout", function(d){
							div.transition()
						 .duration(500)
						 .style("opacity", 0);
					 });;

		//Add nodes to SVG
		var node = svgElement.append('g')
            .attr('class','nodes')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", function(d){ return d.influence*0.1; })
            .attr('fill',function (d,i) {
                return colors(i)
            })
			      .on("mousemove", function(d) {
							div.transition()
            .duration(200)
            .style("opacity", .9);
        div.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
			      })
			      .on("mouseout", function(d){
							div.transition()
	           .duration(500)
	           .style("opacity", 0);
					 })
            .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

		//Add labels to each node
		var label = svgElement.selectAll(null)
						  .data(nodes)
						  .enter()
						  .append('text')
							.attr("dy", ".05em")
							.style("text-anchor", "middle")
						  .text(d => d.character)
							.attr("fill", "white")
						  .attr('font-size', function(d){
														if(d.influence > 180) {
															return d.influence*0.05;
														} else {
															return 0;
														}
													})
				      .on("mousemove", function(d) {
								div.transition()
	            .duration(200)
	            .style("opacity", .9);
	        div.html("<p> Name: " + d.character + "</p>  <p> Frequency: " + d.influence + "</p>")
	            .style("left", (d3.event.pageX) + "px")
	            .style("top", (d3.event.pageY - 28) + "px");
				      })
				      .on("mouseout", function(d){
								div.transition()
		           .duration(500)
		           .style("opacity", 0);
						 });

	 var label2 = svgElement.selectAll(null)
						  .data(nodes)
						  .enter()
						  .append('text')
							.attr("dy", "1.2em")
							.style("text-anchor", "middle")
						  .text(d => d.influence)
							.attr("fill", "white")
						  .attr('font-size', function(d){
														if(d.influence > 180) {
															return d.influence*0.05;
														} else {
															return 0;
														}
													})
				      .on("mousemove", function(d) {
								div.transition()
	            .duration(200)
	            .style("opacity", .9);
	        div.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p>")
	            .style("left", (d3.event.pageX) + "px")
	            .style("top", (d3.event.pageY - 28) + "px");
				      })
				      .on("mouseout", function(d){
								div.transition()
		           .duration(500)
		           .style("opacity", 0);
						 });

		//This function will be executed for every tick of force layout
		force
            .nodes(nodes)
            .on("tick", ticked);
    force
            .force("link")
            .links(links);
		function ticked() {
			//Set X and Y of node
			node
				.attr("cx", (data) => { return data.x; })
				.attr("cy", (data) => { return data.y; });
			label
				.attr('x', (data) => { return data.x })
        .attr('y', (data) => { return data.y });
			label2
				.attr('x', (data) => { return data.x })
        .attr('y', (data) => { return data.y });
				//Set X, Y of link
			link.attr("x1", function(d){ return d.source.x; })
			link.attr("y1", function(d){ return d.source.y; })
			link.attr("x2", function(d){ return d.target.x; })
			link.attr("y2", function(d){ return d.target.y; });
		}
		//Start the force layout calculation
		function dragstarted(d) {
        if (!d3.event.active) force.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) force.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
	});
