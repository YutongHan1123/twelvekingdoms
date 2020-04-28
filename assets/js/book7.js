//Set margins and sizes
var margin07 = {
  top: 0,
  bottom: 40,
  right: 30,
  left: 0
};
var width07 = window.innerWidth*0.4 - margin07.left - margin07.right;
var height07 = window.innerWidth*0.35 - margin07.top - margin07.bottom;
//Load Color Scale
var colordata07 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
var colors07 = d3.scaleOrdinal()
               .domain(colordata07)
               .range(["#f3c623", "#d63447", "#84a9ac", "#844685", "#cfd186"]);
var div07 = d3.select("#book7").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

//Load External Data
d3.json("assets/data/book7.json", function(dataset){
  //Extract data from dataset
  var nodes07 = dataset.nodes,
    links07 = dataset.links;
    // console.log(dataset);
  //Create Force Layout
  var force07 = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d,i) {
              return i;
          })
          .distance(function(d){
            if(d.weight > 50) {
              return 45 + d.weight;
            } else {
              return 38 + d.weight;
            }
          }))
          .force("charge", d3.forceManyBody().strength(-50 ))
          .force("center", d3.forceCenter(width07 / 2,height07 / 2));

  var svgElement07 = d3.select("#book7")
            .append("svg")
            .attr("width", width07+margin07.left+margin07.right) .attr("height", height07+margin07.top+margin07.bottom)
            .append("g")
            .attr("transform","translate("+margin07.left+","+margin07.top+")");
  //Add links to SVG
  var link07 = svgElement07.append('g')
          .attr('class','links')
          .selectAll("line")
          .data(links07)
          .enter()
          .append("line")
          .attr("stroke-width", function(d){ return d.weight/10; })
          .attr("class", "links")
          .on("mousemove", function(d) {
            div07.transition()
      						.duration(200)
      						.style("opacity", .9);
      			div07.html("<p> Proximity between " + d.source.character + " and " + d.target.character + ": " + d.weight + "</p>")
      						.style("left", (d3.event.pageX) + "px")
      						.style("top", (d3.event.pageY - 28) + "px");
      						})
          .on("mouseout", function(d){
            div07.transition()
           .duration(500)
           .style("opacity", 0);
         });;

  //Add nodes to SVG
  var node07 = svgElement07.append('g')
          .attr('class','nodes')
          .selectAll('circle')
          .data(nodes07)
          .enter()
          .append("circle")
          .attr("class", "bubbles")
          .attr("r", function(d){ return d.influence*0.1; })
          .attr('fill',function (d,i) {
              return colors07(d.zone);
          })
          .on("mousemove", function(d) {
            if(d.category == 1) {
            div07.transition()
          .duration(200)
          .style("opacity", .9);
      div07.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 2){
          div07.transition()
        .duration(200)
        .style("opacity", .9);
    div07.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      } else if (d.category == 3){
          div07.transition()
        .duration(200)
        .style("opacity", .9);
    div07.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
        }
        })
          .on("mouseout", function(d){
            div07.transition()
           .duration(500)
           .style("opacity", 0);
         })
          .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended));

  //Add labels to each node
  var label07 = svgElement07.selectAll(null)
            .data(nodes07)
            .enter()
            .append('text')
            .attr("dy", ".07em")
            .style("text-anchor", "middle")
            .text(d => d.character)
            .attr("fill", "white")
            .attr('font-size', function(d){
                          if(d.influence > 170) {
                            return d.influence*0.05;
                          } else {
                            return 0;
                          }
                        })
            .on("mousemove", function(d) {
              if(d.category == 1) {
              div07.transition()
            .duration(200)
            .style("opacity", .9);
        div07.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div07.transition()
          .duration(200)
          .style("opacity", .9);
      div07.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div07.transition()
          .duration(200)
          .style("opacity", .9);
      div07.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div07.transition()
             .duration(500)
             .style("opacity", 0);
           });

 var label07_2 = svgElement07.selectAll(null)
            .data(nodes07)
            .enter()
            .append('text')
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .text(d => d.influence)
            .attr("fill", "white")
            .attr('font-size', function(d){
                          if(d.influence > 170) {
                            return d.influence*0.05;
                          } else {
                            return 0;
                          }
                        })
            .on("mousemove", function(d) {
              if(d.category == 1) {
              div07.transition()
            .duration(200)
            .style("opacity", .9);
        div07.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div07.transition()
          .duration(200)
          .style("opacity", .9);
      div07.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div07.transition()
          .duration(200)
          .style("opacity", .9);
      div07.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div07.transition()
             .duration(500)
             .style("opacity", 0);
           });
  // var label2 = node.append("text")
  // 				// .attr("dx", function(d){ 0 - d.influence*0.1; })
  // 				.attr("dy", "1em")
  // 				.attr("font-size", function(d){
  // 					if(d.influence > 180) {
  // 						return d.influence*0.07;
  // 					} else {
  // 						return 0;
  // 					}
  // 					 })
  // 				.style("text-anchor", "middle")
  // 				.text(function(d){ return d.influence; })
  // 				.attr("fill", "white");

  //This function will be executed for every tick of force layout
  force07
          .nodes(nodes07)
          .on("tick", ticked);
  force07
          .force("link")
          .links(links07);
  function ticked() {
    //Set X and Y of node
    node07
      .attr("cx", (data) => { return data.x; })
      .attr("cy", (data) => { return data.y; });
    label07
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
    label07_2
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
      //Set X, Y of link
    link07.attr("x1", function(d){ return d.source.x; })
    link07.attr("y1", function(d){ return d.source.y; })
    link07.attr("x2", function(d){ return d.target.x; })
    link07.attr("y2", function(d){ return d.target.y; });
  }
  //Start the force layout calculation
  function dragstarted(d) {
      if (!d3.event.active) force07.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }

  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  }

  function dragended(d) {
      if (!d3.event.active) force07.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }
});
