//Set margins and sizes
var margin07_1 = {
  top: 0,
  bottom: 20,
  right: 0,
  left: 0
};
var width07_1 = 400;
var height07_1 = 150;
//Load Color Scale
var colordata07_1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
var colors07_1 = d3.scaleOrdinal()
               .domain(colordata07_1)
               .range(["#f3c623", "#d63447", "#84a9ac", "#844685", "#cfd186"]);
var div07_1 = d3.select("#book7to1").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

//Load External Data
d3.json("assets/data/book7to1.json", function(dataset){
  //Extract data from dataset
  var nodes07_1 = dataset.nodes,
    links07_1 = dataset.links;
    // console.log(dataset);
  //Create Force Layout
  var force07_1 = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d,i) {
              return i;
          })
          .distance(function(d){
            if(d.weight > 50) {
              return 50 + d.weight;
            } else {
              return 20 + d.weight;
            }
          }))
          .force("charge", d3.forceManyBody().strength(-250 ))
          .force("center", d3.forceCenter(width07_1 / 2,height07_1 / 2));

  var svgElement07_1 = d3.select("#book7to1")
            .append("svg")
            .attr("width", width07_1+margin07_1.left+margin07_1.right) .attr("height", height07_1+margin07_1.top+margin07_1.bottom)
            .append("g")
            .attr("transform","translate("+margin07_1.left+","+margin07_1.top+")");
  //Add links to SVG
  var link07_1 = svgElement07_1.append('g')
          .attr('class','links')
          .selectAll("line")
          .data(links07_1)
          .enter()
          .append("line")
          .attr("stroke-width", function(d){ return d.weight/10; })
          .attr("class", "links")
          .on("mousemove", function(d) {
            div07_1.transition()
      						.duration(200)
      						.style("opacity", .9);
      			div07_1.html("<p> Proximity between " + d.source.character + " and " + d.target.character + ": " + d.weight + "</p>")
      						.style("left", (d3.event.pageX) + "px")
      						.style("top", (d3.event.pageY - 28) + "px");
      						})
          .on("mouseout", function(d){
            div07_1.transition()
           .duration(500)
           .style("opacity", 0);
         });;

  //Add nodes to SVG
  var node07_1 = svgElement07_1.append('g')
          .attr('class','nodes')
          .selectAll('circle')
          .data(nodes07_1)
          .enter()
          .append("circle")
          .attr("class", "bubbles")
          .attr("r", function(d){ return d.influence*0.2; })
          .attr('fill',function (d,i) {
              return colors07_1(d.zone);
          })
          .on("mousemove", function(d) {
            if(d.category == 1) {
            div07_1.transition()
          .duration(200)
          .style("opacity", .9);
      div07_1.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 2){
          div07_1.transition()
        .duration(200)
        .style("opacity", .9);
    div07_1.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      } else if (d.category == 3){
          div07_1.transition()
        .duration(200)
        .style("opacity", .9);
    div07_1.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
        }
        })
          .on("mouseout", function(d){
            div07_1.transition()
           .duration(500)
           .style("opacity", 0);
         })
          .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended));

  //Add labels to each node
  var label07_1 = svgElement07_1.selectAll(null)
            .data(nodes07_1)
            .enter()
            .append('text')
            .attr("dy", ".07em")
            .style("text-anchor", "middle")
            .text(d => d.character)
            .attr("fill", "white")
            .attr('font-size', function(d){
                          if(d.influence > 120) {
                            return d.influence*0.1;
                          } else {
                            return 0;
                          }
                        })
            .on("mousemove", function(d) {
              if(d.category == 1) {
              div07_1.transition()
            .duration(200)
            .style("opacity", .9);
        div07_1.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div07_1.transition()
          .duration(200)
          .style("opacity", .9);
      div07_1.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div07_1.transition()
          .duration(200)
          .style("opacity", .9);
      div07_1.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div07_1.transition()
             .duration(500)
             .style("opacity", 0);
           });

 var label07_1_2 = svgElement07_1.selectAll(null)
            .data(nodes07_1)
            .enter()
            .append('text')
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .text(d => d.influence)
            .attr("fill", "white")
            .attr('font-size', function(d){
                          if(d.influence > 170) {
                            return d.influence*0.09;
                          } else {
                            return 0;
                          }
                        })
            .on("mousemove", function(d) {
              if(d.category == 1) {
              div07_1.transition()
            .duration(200)
            .style("opacity", .9);
        div07_1.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div07_1.transition()
          .duration(200)
          .style("opacity", .9);
      div07_1.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div07_1.transition()
          .duration(200)
          .style("opacity", .9);
      div07_1.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div07_1.transition()
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
  force07_1
          .nodes(nodes07_1)
          .on("tick", ticked);
  force07_1
          .force("link")
          .links(links07_1);
  function ticked() {
    //Set X and Y of node
    node07_1
      .attr("cx", (data) => { return data.x; })
      .attr("cy", (data) => { return data.y; });
    label07_1
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
    label07_1_2
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
      //Set X, Y of link
    link07_1.attr("x1", function(d){ return d.source.x; })
    link07_1.attr("y1", function(d){ return d.source.y; })
    link07_1.attr("x2", function(d){ return d.target.x; })
    link07_1.attr("y2", function(d){ return d.target.y; });
  }
  //Start the force layout calculation
  function dragstarted(d) {
      if (!d3.event.active) force07_1.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }

  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  }

  function dragended(d) {
      if (!d3.event.active) force07_1.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }
});
