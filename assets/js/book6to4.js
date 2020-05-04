//Set margins and sizes
var margin06_4 = {
  top: 0,
  bottom: 50,
  right: 30,
  left: 0
};
var width06_4 = 400;
var height06_4 = 300;
//Load Color Scale
var colordata06_4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
var colors06_4 = d3.scaleOrdinal()
               .domain(colordata06_4)
               .range(["#f3c623", "#d63447", "#84a9ac", "#844685", "#cfd186"]);
var div06_4 = d3.select("#book6to4").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

//Load External Data
d3.json("assets/data/book6to4.json", function(dataset){
  //Extract data from dataset
  var nodes06_4 = dataset.nodes,
    links06_4 = dataset.links;
    // console.log(dataset);
  //Create Force Layout
  var force06_4 = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d,i) {
              return i;
          })
          .distance(function(d){
            if(d.weight > 50) {
              return 70 + d.weight;
            } else {
              return 50 + d.weight;
            }
          }))
          .force("charge", d3.forceManyBody().strength(-320 ))
          .force("center", d3.forceCenter(width06_4 / 2,height06_4 / 2));

  var svgElement06_4 = d3.select("#book6to4")
            .append("svg")
            .attr("width", width06_4+margin06_4.left+margin06_4.right) .attr("height", height06_4+margin06_4.top+margin06_4.bottom)
            .append("g")
            .attr("transform","translate("+margin06_4.left+","+margin06_4.top+")");
  //Add links to SVG
  var link06_4 = svgElement06_4.append('g')
          .attr('class','links')
          .selectAll("line")
          .data(links06_4)
          .enter()
          .append("line")
          .attr("stroke-width", function(d){ return d.weight/10; })
          .attr("class", "links")
          .on("mousemove", function(d) {
            div06_4.transition()
      						.duration(200)
      						.style("opacity", .9);
      			div06_4.html("<p> Proximity between " + d.source.character + " and " + d.target.character + ": " + d.weight + "</p>")
      						.style("left", (d3.event.pageX) + "px")
      						.style("top", (d3.event.pageY - 28) + "px");
      						})
          .on("mouseout", function(d){
            div06_4.transition()
           .duration(500)
           .style("opacity", 0);
         });;

  //Add nodes to SVG
  var node06_4 = svgElement06_4.append('g')
          .attr('class','nodes')
          .selectAll('circle')
          .data(nodes06_4)
          .enter()
          .append("circle")
          .attr("class", "bubbles")
          .attr("r", function(d){ return d.influence*0.2; })
          .attr('fill',function (d,i) {
              return colors06_4(d.zone);
          })
          .on("mousemove", function(d) {
            if(d.category == 1) {
            div06_4.transition()
          .duration(200)
          .style("opacity", .9);
      div06_4.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 2){
          div06_4.transition()
        .duration(200)
        .style("opacity", .9);
    div06_4.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      } else if (d.category == 3){
          div06_4.transition()
        .duration(200)
        .style("opacity", .9);
    div06_4.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
        }
        })
          .on("mouseout", function(d){
            div06_4.transition()
           .duration(500)
           .style("opacity", 0);
         })
          .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended));

  //Add labels to each node
  var label06_4 = svgElement06_4.selectAll(null)
            .data(nodes06_4)
            .enter()
            .append('text')
            .attr("dy", ".06em")
            .style("text-anchor", "middle")
            .text(d => d.character)
            .attr("fill", "white")
            .attr('font-size', function(d){
                          if(d.influence > 110) {
                            return d.influence*0.095;
                          } else {
                            return 0;
                          }
                        })
            .on("mousemove", function(d) {
              if(d.category == 1) {
              div06_4.transition()
            .duration(200)
            .style("opacity", .9);
        div06_4.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div06_4.transition()
          .duration(200)
          .style("opacity", .9);
      div06_4.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div06_4.transition()
          .duration(200)
          .style("opacity", .9);
      div06_4.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div06_4.transition()
             .duration(500)
             .style("opacity", 0);
           });

 var label06_4_2 = svgElement06_4.selectAll(null)
            .data(nodes06_4)
            .enter()
            .append('text')
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .text(d => d.influence)
            .attr("fill", "white")
            .attr('font-size', function(d){
                          if(d.influence > 110) {
                            return d.influence*0.095;
                          } else {
                            return 0;
                          }
                        })
            .on("mousemove", function(d) {
              if(d.category == 1) {
              div06_4.transition()
            .duration(200)
            .style("opacity", .9);
        div06_4.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div06_4.transition()
          .duration(200)
          .style("opacity", .9);
      div06_4.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div06_4.transition()
          .duration(200)
          .style("opacity", .9);
      div06_4.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div06_4.transition()
             .duration(500)
             .style("opacity", 0);
           });
  // var label2 = node.append("text")
  // 				// .attr("dx", function(d){ 0 - d.influence*0.1; })
  // 				.attr("dy", "1em")
  // 				.attr("font-size", function(d){
  // 					if(d.influence > 180) {
  // 						return d.influence*0.06;
  // 					} else {
  // 						return 0;
  // 					}
  // 					 })
  // 				.style("text-anchor", "middle")
  // 				.text(function(d){ return d.influence; })
  // 				.attr("fill", "white");

  //This function will be executed for every tick of force layout
  force06_4
          .nodes(nodes06_4)
          .on("tick", ticked);
  force06_4
          .force("link")
          .links(links06_4);
  function ticked() {
    //Set X and Y of node
    node06_4
      .attr("cx", (data) => { return data.x; })
      .attr("cy", (data) => { return data.y; });
    label06_4
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
    label06_4_2
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
      //Set X, Y of link
    link06_4.attr("x1", function(d){ return d.source.x; })
    link06_4.attr("y1", function(d){ return d.source.y; })
    link06_4.attr("x2", function(d){ return d.target.x; })
    link06_4.attr("y2", function(d){ return d.target.y; });
  }
  //Start the force layout calculation
  function dragstarted(d) {
      if (!d3.event.active) force06_4.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }

  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  }

  function dragended(d) {
      if (!d3.event.active) force06_4.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }
});
