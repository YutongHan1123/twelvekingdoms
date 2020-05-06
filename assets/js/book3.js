//Set margins and sizes
var margin03 = {
  top: 0,
  bottom: 40,
  right: 30,
  left: 0
};
if(window.innerWidth > 840) {
  width03 = window.innerWidth*0.5 - margin03.left - margin03.right;
  height03 = window.innerWidth*0.55 - margin03.top - margin03.bottom;
} else if(window.innerWidth <= 840) {
  width03 = window.innerWidth - margin03.left - margin03.right;
  height03 = window.innerWidth*0.8 - margin03.top - margin03.bottom;
}
//Load Color Scale
var colordata03 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
var colors03 = d3.scaleOrdinal()
               .domain(colordata03)
               .range(["#f3c623", "#d63447", "#84a9ac", "#844685", "#cfd186"]);
var div03 = d3.select("#book3").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

//Load External Data
d3.json("assets/data/book3.json", function(dataset){
  //Extract data from dataset
  var nodes03 = dataset.nodes,
    links03 = dataset.links;
    // console.log(dataset);
  //Create Force Layout
  var force03 = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d,i) {
              return i;
          })
          .distance(function(d){
            // if(d.weight > 34) {
            //   return 110;
            // } else {
            //   return 40 + d.weight;
            // }
            if(window.innerWidth > 1200) {
              if(d.weight > 34) {
                return 110;
              } else {
                return 40 + d.weight*2;
              }
            } else if(window.innerWidth <= 1200) {
              if(d.weight > 34) {
                return 20;
              } else {
                return d.weight*0.2;
              }
            }
          }))
          .force("charge", d3.forceManyBody().strength(-750 ))
          .force("center", d3.forceCenter(width03 / 2,height03 / 2));

  var svgElement03 = d3.select("#book3")
            .append("svg")
            .attr("width", width03+margin03.left+margin03.right) .attr("height", height03+margin03.top+margin03.bottom)
            .append("g")
            .attr("transform","translate("+margin03.left+","+margin03.top+")");
  //Add links to SVG
  var link03 = svgElement03.append('g')
          .attr('class','links')
          .selectAll("line")
          .data(links03)
          .enter()
          .append("line")
          .attr("stroke-width", function(d){ return d.weight/10; })
          .attr("class", "links")
          .on("mousemove", function(d) {
            div03.transition()
      						.duration(200)
      						.style("opacity", .9);
      			div03.html("<p> Proximity between " + d.source.character + " and " + d.target.character + ": " + d.weight + "</p>")
      						.style("left", (d3.event.pageX) + "px")
      						.style("top", (d3.event.pageY - 28) + "px");
      						})
          .on("mouseout", function(d){
            div03.transition()
           .duration(500)
           .style("opacity", 0);
         });;

  //Add nodes to SVG
  var node03 = svgElement03.append('g')
          .attr('class','nodes')
          .selectAll('circle')
          .data(nodes03)
          .enter()
          .append("circle")
          .attr("class", "bubbles")
          .attr("r", function(d){ return d.influence*0.1; })
          .attr('fill',function (d,i) {
              return colors03(d.zone);
          })
          .on("mousemove", function(d) {
            if(d.category == 1) {
            div03.transition()
          .duration(200)
          .style("opacity", .9);
      div03.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 2){
          div03.transition()
        .duration(200)
        .style("opacity", .9);
    div03.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      } else if (d.category == 3){
          div03.transition()
        .duration(200)
        .style("opacity", .9);
    div03.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
        }
        })
          .on("mouseout", function(d){
            div03.transition()
           .duration(500)
           .style("opacity", 0);
         })
          .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended));

  //Add labels to each node
  var label03 = svgElement03.selectAll(null)
            .data(nodes03)
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
              div03.transition()
            .duration(200)
            .style("opacity", .9);
        div03.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div03.transition()
          .duration(200)
          .style("opacity", .9);
      div03.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div03.transition()
          .duration(200)
          .style("opacity", .9);
      div03.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div03.transition()
             .duration(500)
             .style("opacity", 0);
           });

 var label03_2 = svgElement03.selectAll(null)
            .data(nodes03)
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
              div03.transition()
            .duration(200)
            .style("opacity", .9);
        div03.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p> Race: " + d.race + "</p> <p>Intro: " + d.intro +"</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          } else if (d.category == 2){
            div03.transition()
          .duration(200)
          .style("opacity", .9);
      div03.html("<img src='" + d.img +"'>" + "<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        } else if (d.category == 3){
            div03.transition()
          .duration(200)
          .style("opacity", .9);
      div03.html("<p> Name: " + d.character + "</p> <p> Frequency: " + d.influence + "</p> <p>Intro: " + d.intro +"</p>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          }
          })
            .on("mouseout", function(d){
              div03.transition()
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
  force03
          .nodes(nodes03)
          .on("tick", ticked);
  force03
          .force("link")
          .links(links03);
  function ticked() {
    //Set X and Y of node
    node03
      .attr("cx", (data) => { return data.x; })
      .attr("cy", (data) => { return data.y; });
    label03
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
    label03_2
      .attr('x', (data) => { return data.x })
      .attr('y', (data) => { return data.y });
      //Set X, Y of link
    link03.attr("x1", function(d){ return d.source.x; })
    link03.attr("y1", function(d){ return d.source.y; })
    link03.attr("x2", function(d){ return d.target.x; })
    link03.attr("y2", function(d){ return d.target.y; });
  }
  //Start the force layout calculation
  function dragstarted(d) {
      if (!d3.event.active) force03.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }

  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  }

  function dragended(d) {
      if (!d3.event.active) force03.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }
});
