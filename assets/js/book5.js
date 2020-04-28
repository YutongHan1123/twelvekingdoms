//Set margins and sizes
var margin05 = {
  top: 0,
  bottom: 40,
  right: 30,
  left: 0
};
var width05 = window.innerWidth*0.4 - margin05.left - margin05.right;
var height05 = window.innerWidth*0.35 - margin05.top - margin05.bottom;
//Load Color Scale
var colordata05 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
var colors05 = d3.scaleOrdinal()
               .domain(colordata05)
               .range(["#f3c623", "#d63447", "#84a9ac", "#844685", "#cfd186"]);
var div05 = d3.select("#book5").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

//Load External Data
d3.json("assets/data/book5.json", function(dataset){
  //Extract data from dataset
  var nodes05 = dataset.nodes,
    links05 = dataset.links;
    // console.log(dataset);
  //Create Force Layout
  var force05 = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d,i) {
              return i;
          })
          .distance(function(d){
            if(d.weight > 37) {
              return 130 + d.weight;
            } else if (37 > d.weight > 29) {
              return 60 + d.weight*2;
            } else {
              return 60;
            }
          }))
          .force("charge", d3.forceManyBody().strength(-400 ))
          .force("center", d3.forceCenter(width05 / 2,height05 / 2));

  var svgElement05 = d3.select("#book5")
            .append("svg")
            .attr("width", width05+margin05.left+margin05.right) .attr("height", height05+margin05.top+margin05.bottom)
            .append("g")
            .attr("transform","translate("+margin05.left+","+margin05.top+")");
  //Add links to SVG
  var link05 = svgElement05.append('g')
          .attr('class','links')
          .selectAll("line")
          .data(links05)
          .enter()
          .append("line")
          .attr("stroke-width", function(d){ return d.weight/10; })
          .attr("class", "links")
          .on("mousemove", function(d) {
            div05.transition()
      						.duration(200)
      						.style("opacity", .9);
      			div05.html("<p> Proximity between " + d.source.character + " and " + d.target.character + ": " + d.weight + "</p>")
      						.style("left", (d3.event.pageX) + "px")
      						.style("top", (d3.event.pageY - 28) + "px");
      						})
          .on("mouseout", function(d){
            div05.transition()
           .duration(500)
           .style("opacity", 0);
         });;

  //Add nodes to SVG
  var node05 = svgElement05.append('g')
          .attr('class','nodes')
          .selectAll('circle')
          .data(nodes05)
          .enter()
          .append("circle")
          .attr("class", "bubbles")
          .attr("r", function(d){ return d.influence*0.1; })
          .attr('fill',function (d,i) {
              return colors05(d.zone);
          })
          .on("mousemove", function(d) {
            if(d.category == 1) {
            div05.transition()
          .duration(200)
          .style("opacity", .9);
      div05.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 2){
          div05.transition()
        .duration(200)
        .style("opacity", .9);
    div05.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      } else if (d.category == 3){
          div05.transition()
        .duration(200)
        .style("opacity", .9);
    div05.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
        }
        })
          .on("mouseout", function(d){
            div05.transition()
           .duration(500)
           .style("opacity", 0);
         })
          .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended));

  //Add labels to each node
  var label05 = svgElement05.selectAll(null)
            .data(nodes05)
            .enter()
            .append('text')
            .attr("dy", ".05em")
            .style("text-anchor", "middle")
            .text(d => d.character)
            .attr("fill", "white")
            .attr('font-size', function(d){
                          if(d.influence > 170) {
                            return d.influence*0.055;
                          } else {
                            return 0;
                          }
                        })
            .on("mousemove", function(d) {
              if(d.category == 1) {
              div05.transition()
            .duration(200)
            .style("opacity", .9);
        div05.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div05.transition()
          .duration(200)
          .style("opacity", .9);
      div05.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div05.transition()
          .duration(200)
          .style("opacity", .9);
      div05.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div05.transition()
             .duration(500)
             .style("opacity", 0);
           });

 var label05_2 = svgElement05.selectAll(null)
            .data(nodes05)
            .enter()
            .append('text')
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .text(d => d.influence)
            .attr("fill", "white")
            .attr('font-size', function(d){
                          if(d.influence > 170) {
                            return d.influence*0.055;
                          } else {
                            return 0;
                          }
                        })
            .on("mousemove", function(d) {
              if(d.category == 1) {
              div05.transition()
            .duration(200)
            .style("opacity", .9);
        div05.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div05.transition()
          .duration(200)
          .style("opacity", .9);
      div05.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div05.transition()
          .duration(200)
          .style("opacity", .9);
      div05.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div05.transition()
             .duration(500)
             .style("opacity", 0);
           });
  // var label2 = node.append("text")
  // 				// .attr("dx", function(d){ 0 - d.influence*0.1; })
  // 				.attr("dy", "1em")
  // 				.attr("font-size", function(d){
  // 					if(d.influence > 180) {
  // 						return d.influence*0.05;
  // 					} else {
  // 						return 0;
  // 					}
  // 					 })
  // 				.style("text-anchor", "middle")
  // 				.text(function(d){ return d.influence; })
  // 				.attr("fill", "white");

  //This function will be executed for every tick of force layout
  force05
          .nodes(nodes05)
          .on("tick", ticked);
  force05
          .force("link")
          .links(links05);
  function ticked() {
    //Set X and Y of node
    node05
      .attr("cx", (data) => { return data.x; })
      .attr("cy", (data) => { return data.y; });
    label05
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
    label05_2
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
      //Set X, Y of link
    link05.attr("x1", function(d){ return d.source.x; })
    link05.attr("y1", function(d){ return d.source.y; })
    link05.attr("x2", function(d){ return d.target.x; })
    link05.attr("y2", function(d){ return d.target.y; });
  }
  //Start the force layout calculation
  function dragstarted(d) {
      if (!d3.event.active) force05.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }

  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  }

  function dragended(d) {
      if (!d3.event.active) force05.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }
});
