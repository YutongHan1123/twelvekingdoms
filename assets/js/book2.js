//Set margins and sizes
var margin02 = {
  top: 0,
  bottom: 50,
  right: 30,
  left: 0
};

var width02;
var height02;

if(window.innerWidth > 840) {
  width02 = window.innerWidth*0.5 - margin02.left - margin02.right;
  height02 = window.innerWidth*0.45 - margin02.top - margin02.bottom;
} else if(window.innerWidth <= 840) {
  width02 = window.innerWidth - margin02.left - margin02.right;
  height02 = window.innerWidth*0.8 - margin02.top - margin02.bottom;
}

//Load Color Scale
var colordata02 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
var colors02 = d3.scaleOrdinal()
               .domain(colordata02)
               .range(["#f3c623", "#d63447", "#84a9ac", "#844685", "#cfd186"]);
var div02 = d3.select("#book2").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

//Load External Data
d3.json("assets/data/book2.json", function(dataset){
  //Extract data from dataset
  var nodes02 = dataset.nodes,
    links02 = dataset.links;
    console.log(dataset);
  //Create Force Layout
  var force02 = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d,i) {
              return i;
          })
          .distance(function(d){
            if(window.innerWidth > 1200) {
              if(d.weight > 34) {
                return 120;
              } else {
                return 40 + d.weight*2;
              }
            } else if(window.innerWidth <= 1200) {
              if(d.weight > 34) {
                return 20;
              } else {
                return d.weight*0.5;
              }
            }
          }))
          .force("charge", d3.forceManyBody().strength(-400 ))
          .force("center", d3.forceCenter(width02 / 2,height02 / 2));

  var svgElement02 = d3.select("#book2")
            .append("svg")
            .attr("width", width02+margin02.left+margin02.right) .attr("height", height02+margin02.top+margin02.bottom)
            .append("g")
            .attr("transform","translate("+margin02.left+","+margin02.top+")");
  //Add links to SVG
  var link02 = svgElement02.append('g')
          .attr('class','links')
          .selectAll("line")
          .data(links02)
          .enter()
          .append("line")
          .attr("stroke-width", function(d){ return d.weight/10; })
          .attr("class", "links")
          .on("mousemove", function(d) {
            div02.transition()
      						.duration(200)
      						.style("opacity", .9);
      			div02.html("<p> Proximity between " + d.source.character + " and " + d.target.character + ": " + d.weight + "</p>")
      						.style("left", (d3.event.pageX) + "px")
      						.style("top", (d3.event.pageY - 28) + "px");
      						})
          .on("mouseout", function(d){
            div02.transition()
           .duration(500)
           .style("opacity", 0);
         });;

  //Add nodes to SVG
  var node02 = svgElement02.append('g')
          .attr('class','nodes')
          .selectAll('circle')
          .data(nodes02)
          .enter()
          .append("circle")
          .attr("class", "bubbles")
          .attr("r", function(d){
            if(window.innerWidth > 1200) {
            return d.influence*0.1;
          } else if(window.innerWidth <= 1200) {
            return d.influence*0.05;
          }
           })
          .attr('fill',function (d,i) {
              return colors02(d.zone);
          })
          .on("mousemove", function(d) {
            if(d.category == 1) {
            div02.transition()
          .duration(200)
          .style("opacity", .9);
      div02.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 2){
          div02.transition()
        .duration(200)
        .style("opacity", .9);
    div02.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      } else if (d.category == 3){
          div02.transition()
        .duration(200)
        .style("opacity", .9);
    div02.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
        }
        })
          .on("mouseout", function(d){
            div02.transition()
           .duration(500)
           .style("opacity", 0);
         })
          .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended));

  //Add labels to each node
  var label02 = svgElement02.selectAll(null)
            .data(nodes02)
            .enter()
            .append('text')
            .attr("dy", ".05em")
            .style("text-anchor", "middle")
            .text(d => d.character)
            .attr("fill", "white")
            .attr('font-size', function(d){
              if(window.innerWidth > 1200) {
                if(d.influence > 170) {
                  return d.influence*0.055;
                } else {
                  return 0;
                }
              } else if(window.innerWidth <= 1200) {
                if(d.influence > 170) {
                  return d.influence*0.027;
                } else {
                  return 0;
                }
              }
            })
            .on("mousemove", function(d) {
              if(d.category == 1) {
              div02.transition()
            .duration(200)
            .style("opacity", .9);
        div02.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div02.transition()
          .duration(200)
          .style("opacity", .9);
      div02.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div02.transition()
          .duration(200)
          .style("opacity", .9);
      div02.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div02.transition()
             .duration(500)
             .style("opacity", 0);
           });

 var label02_2 = svgElement02.selectAll(null)
            .data(nodes02)
            .enter()
            .append('text')
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .text(d => d.influence)
            .attr("fill", "white")
            .attr('font-size', function(d){
              if(window.innerWidth > 1200) {
                if(d.influence > 170) {
                  return d.influence*0.055;
                } else {
                  return 0;
                }
              } else if(window.innerWidth <= 1200) {
                if(d.influence > 170) {
                  return d.influence*0.027;
                } else {
                  return 0;
                }
              }
            })
            .on("mousemove", function(d) {
              if(d.category == 1) {
              div02.transition()
            .duration(200)
            .style("opacity", .9);
        div02.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div02.transition()
          .duration(200)
          .style("opacity", .9);
      div02.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div02.transition()
          .duration(200)
          .style("opacity", .9);
      div02.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div02.transition()
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
  force02
          .nodes(nodes02)
          .on("tick", ticked);
  force02
          .force("link")
          .links(links02);
  function ticked() {
    //Set X and Y of node
    node02
      .attr("cx", (data) => { return data.x; })
      .attr("cy", (data) => { return data.y; });
    label02
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
    label02_2
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
      //Set X, Y of link
    link02.attr("x1", function(d){ return d.source.x; })
    link02.attr("y1", function(d){ return d.source.y; })
    link02.attr("x2", function(d){ return d.target.x; })
    link02.attr("y2", function(d){ return d.target.y; });
  }
  //Start the force layout calculation
  function dragstarted(d) {
      if (!d3.event.active) force02.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }

  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  }

  function dragended(d) {
      if (!d3.event.active) force02.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }
});
