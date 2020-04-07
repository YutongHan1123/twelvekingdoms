var fileName = "../assets/data/bullet.csv";
var bulletFields = ["1", "2","3", "4", "5", "6", "7", "8","9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];

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
    var margin = { top: 30, right: 50, bottom: 30, left: 50 },
        width  = window.innerWidth*0.6 - margin.left - margin.right,
        height = window.innerHeight/2 - margin.top  - margin.bottom;

    // Make x scale
    var xScale = d3.scaleBand()
        .domain(bulletFields)
        .rangeRound([0, width])
        .padding(0.1);

    // Make y scale, the domain will be defined on bar update
    var yScale = d3.scaleLinear()
        .domain([0, 400])
        .range([height, 0]);

    // Create canvas
    var canvas = d3.select("#bullet")
      .append("svg")
        .attr("width",  width  + margin.left + margin.right)
        .attr("height", height + margin.top  + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Make x-axis and add to canvas
    var xAxis = d3.axisBottom()
        .scale(xScale);

    canvas.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Make y-axis and add to canvas
    var yAxis = d3.axisLeft()
        .scale(yScale);

    var yAxisHandleForUpdate = canvas.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    yAxisHandleForUpdate.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Times");

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
            .attr("height", function(d,i) { return height - yScale(d); });

        // Update old ones, already have x / width from before
        bars
            .transition().duration(250)
            .attr("y", function(d,i) { return yScale(d); })
            .attr("height", function(d,i) { return height - yScale(d); });

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
        .attr("class", "bullet-select")
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
