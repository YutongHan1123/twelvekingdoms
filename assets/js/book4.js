//Set margins and sizes
var margin04 = {
  top: 0,
  bottom: 40,
  right: 30,
  left: 50
};
var width04 = window.innerWidth*0.4 - margin04.left - margin04.right;
var height04 = window.innerWidth*0.35 - margin04.top - margin04.bottom;
//Load Color Scale
var colordata04 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
var colors04 = d3.scaleOrdinal()
               .domain(colordata04)
               .range(["#f3c623", "#d63447", "#84a9ac", "#844685", "#cfd186"]);
var div04 = d3.select("#book4").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

//Load External Data
d3.json("assets/data/book4.json", function(dataset){
  //Extract data from dataset
  var nodes04 = dataset.nodes,
    links04 = dataset.links;
    // console.log(dataset);
  //Create Force Layout
  var force04 = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d,i) {
              return i;
          })
          .distance(function(d){
            if(d.weight > 37) {
              return d.weight*2 - 25;
            } else if (37 > d.weight > 29) {
              return 50 + d.weight*2;
            } else {
              return d.weight*4.5;
            }
          }))
          .force("charge", d3.forceManyBody().strength(-400 ))
          .force("center", d3.forceCenter(width04 / 2,height04 / 2));

  var svgElement04 = d3.select("#book4")
            .append("svg")
            .attr("width", width04+margin04.left+margin04.right) .attr("height", height04+margin04.top+margin04.bottom)
            .append("g")
            .attr("transform","translate("+margin04.left+","+margin04.top+")");
  //Add links to SVG
  var link04 = svgElement04.append('g')
          .attr('class','links')
          .selectAll("line")
          .data(links04)
          .enter()
          .append("line")
          .attr("stroke-width", function(d){ return d.weight/10; })
          .attr("class", "links")
          .on("mousemove", function(d) {
            div04.transition()
      						.duration(200)
      						.style("opacity", .9);
      			div04.html("<p> Proximity between " + d.source.character + " and " + d.target.character + ": " + d.weight + "</p>")
      						.style("left", (d3.event.pageX) + "px")
      						.style("top", (d3.event.pageY - 28) + "px");
      						})
          .on("mouseout", function(d){
            div04.transition()
           .duration(500)
           .style("opacity", 0);
         });;

  //Add nodes to SVG
  var node04 = svgElement04.append('g')
          .attr('class','nodes')
          .selectAll('circle')
          .data(nodes04)
          .enter()
          .append("circle")
          .attr("class", "bubbles")
          .attr("r", function(d){ return d.influence*0.1; })
          .attr('fill',function (d,i) {
              return colors04(d.zone);
          })
          .on("mousemove", function(d) {
            if(d.category == 1) {
            div04.transition()
          .duration(200)
          .style("opacity", .9);
      div04.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 2){
          div04.transition()
        .duration(200)
        .style("opacity", .9);
    div04.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      } else if (d.category == 3){
          div04.transition()
        .duration(200)
        .style("opacity", .9);
    div04.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
        }
        })
          .on("mouseout", function(d){
            div04.transition()
           .duration(500)
           .style("opacity", 0);
         })
          .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended));

  //Add labels to each node
  var label04 = svgElement04.selectAll(null)
            .data(nodes04)
            .enter()
            .append('text')
            .attr("dy", ".05em")
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
              div04.transition()
            .duration(200)
            .style("opacity", .9);
        div04.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div04.transition()
          .duration(200)
          .style("opacity", .9);
      div04.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div04.transition()
          .duration(200)
          .style("opacity", .9);
      div04.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div04.transition()
             .duration(500)
             .style("opacity", 0);
           });

 var label04_2 = svgElement04.selectAll(null)
            .data(nodes04)
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
              div04.transition()
            .duration(200)
            .style("opacity", .9);
        div04.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div04.transition()
          .duration(200)
          .style("opacity", .9);
      div04.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div04.transition()
          .duration(200)
          .style("opacity", .9);
      div04.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div04.transition()
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
  force04
          .nodes(nodes04)
          .on("tick", ticked);
  force04
          .force("link")
          .links(links04);
  function ticked() {
    //Set X and Y of node
    node04
      .attr("cx", (data) => { return data.x; })
      .attr("cy", (data) => { return data.y; });
    label04
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
    label04_2
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
      //Set X, Y of link
    link04.attr("x1", function(d){ return d.source.x; })
    link04.attr("y1", function(d){ return d.source.y; })
    link04.attr("x2", function(d){ return d.target.x; })
    link04.attr("y2", function(d){ return d.target.y; });
  }
  //Start the force layout calculation
  function dragstarted(d) {
      if (!d3.event.active) force04.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }

  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  }

  function dragended(d) {
      if (!d3.event.active) force04.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }
});
