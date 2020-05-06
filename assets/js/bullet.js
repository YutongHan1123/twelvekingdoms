var fileName = "assets/data/bullet.csv";
var bulletFields = ["1", "2","3", "4", "5", "6", "7", "8","9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
var div_bullet = d3.select("#bullet").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

d3.csv(fileName, function(error, data) {
    var episodeMap = {};
    data.forEach(function(d) {
        var episode = d.episode;
        episodeMap[episode] = [];
        // console.log(episode);

        // { episodeName: [ bar1Val, bar2Val, ... ] }
        bulletFields.forEach(function(field) {
            episodeMap[episode].push( +d[field] );
        });
    });
    makeVis(episodeMap);
});

var makeVis = function(episodeMap) {
    // Define dimensions of vis
    var margin_video = { top: 50, right: 10, bottom: 30, left: 40 };
        // width  = window.innerWidth*0.6 - margin.left - margin.right,
        // height = window.innerHeight/2 - margin.top  - margin.bottom;

        if(window.innerWidth > 1120) {
          width_video = window.innerWidth*0.6 - margin_video.left - margin_video.right;
          height_video = window.innerHeight/1.9 - margin_video.top - margin_video.bottom;
        } else if(1120 >= window.innerWidth) {
          width_video = window.innerWidth*0.75 - margin_video.left - margin_video.right;
          height_video = window.innerHeight/2 - margin_video.top - margin_video.bottom;
        } else if(window.innerWidth <= 840) {
          width_video = window.innerWidth - margin_video.left - margin_video.right;
          height_video = window.innerHeight/2 - margin_video.top - margin_video.bottom;
        }

    // Make x scale
    var xScale = d3.scaleBand()
        .domain(bulletFields)
        .rangeRound([0, width_video])
        .padding(0.1);

    // Make y scale, the domain will be defined on bar update
    var yScale = d3.scaleLinear()
        .domain([0, 400])
        .range([height_video, 0]);

    // Create canvas
    var canvas = d3.select("#bullet")
      .append("svg")
        .attr("width",  width_video  + margin_video.left + margin_video.right*4)
        .attr("height", height_video + margin_video.top  + margin_video.bottom)
      .append("g")
        .attr("transform", "translate(" + margin_video.left + "," + margin_video.top + ")");

    // Make x-axis and add to canvas
    var xAxis = d3.axisBottom()
        .scale(xScale);

    canvas.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height_video + ")")
        .call(xAxis);

    // Make y-axis and add to canvas
    var yAxis = d3.axisLeft()
        .scale(yScale);

       // var yAxis = canvas.append("g")
       //        .call(d3.axisLeft(yScale));

    var yAxisHandleForUpdate = canvas.append("g")
        .attr("class", "y axis")
        .call(yAxis.ticks(5));

    var leftyAxis = canvas.append("g")
        .attr("class", "y axis");
    leftyAxis.append("text")
        .attr("x", 0-margin_video.top/1.28)
        .attr("y", 0-margin_video.top/1.5)
        .attr("dy", ".71em")
        .style("text-anchor", "start")
        .text("The Number of Comments on Bilibili per minute of episode");

    var leftAxis = canvas.append("g")
        .attr("class", "y axis");

    leftAxis.append("text")
        .attr("x", 10)
        .attr("y", height_video+9)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Start");

    var rightAxis = canvas.append("g")
        .attr("class", "y axis");

    rightAxis.append("text")
        .attr("x", width_video*1.02)
        .attr("y", height_video+9)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("End");

    var updateBars = function(data) {
        // First update the y-axis domain to match data
        yScale.domain( d3.extent(data) );
        yAxisHandleForUpdate.call(yAxis);

        var bars = canvas.selectAll(".bar").data(data);

        // Add bars for new data
        bars.enter()
          .append("rect")
            .attr("class", "bar")
            .attr("x", function(d,i) { return xScale( bulletFields[i] ); })
            .attr("width", xScale.bandwidth())
            .attr("y", function(d,i) { return yScale(d); })
            .attr("height", function(d,i) { return height_video - yScale(d); })
            .on("mousemove", function(d,i) {
              div_bullet.transition()
        						.duration(200)
        						.style("opacity", .9);
        			div_bullet.html("<p>Minute: " + bulletFields[i] + " </p> <p>Number of comments: " + d + "</p>")
        						.style("left", (d3.event.pageX) + "px")
        						.style("top", (d3.event.pageY - 28) + "px");
        						})
            .on("mouseout", function(d){
              div_bullet.transition()
             .duration(500)
             .style("opacity", 0);
          });
        // Update old ones, already have x / width from before
        bars
            .transition().duration(250)
            .attr("y", function(d,i) { return yScale(d); })
            .attr("height", function(d,i) { return height_video - yScale(d); });

        // Remove old ones
        bars.exit().remove();
    };

    // Handler for dropdown value change
    var dropdownChange = function() {
        var newepisode = d3.select(this).property('value'),
            newData   = episodeMap[newepisode];

        updateBars(newData);
    };

    // Get names of episodes, for dropdown
    var episodes = Object.keys(episodeMap).sort();

    var dropdown = d3.select("#bullet")
        .insert("select", "svg")
        .attr("class", "minimal")
        .attr("id", "bullet-select")
        .attr("onchange", "myFunction()")
        .on("change", dropdownChange);

    dropdown.selectAll("option")
        .data(episodes)
        .enter()
        .append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) {
            return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
        });

    var initialData = episodeMap[ episodes[0] ];
    updateBars(initialData);
};
