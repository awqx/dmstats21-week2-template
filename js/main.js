// PART I: Manipulating the DOM

// Step 1: Select the body of the HTML document and append an h2 element
// with the text "We're learning D3!"

d3.select("body").append("h2").text("We're Learning D3!");

// Step 2: Select the body again and append a div with the id dynamic-content

d3.select("body").append("div").attr("id", "dynamic-content");

// Step 3: Select the div you just created (using its id!) and append a
// paragraph with some text of your choice (you can also style this if you want!)

d3.select("#dynamic-content").append("p").text("This is a paragraph.");

// PART II: Binding data

var schools = [
    { name: "Harvard", signups: 4695, region: "Northeast", color: "red"},
    { name: "UW Madison", signups: 4232, region: "Midwest", color: "orange" },
    { name: "WashU", signups: 3880, region: "Midwest", color: "yellow" },
    { name: "Brown", signups: 2603, region: "Northeast", color: "green" },
    { name: "UChicago", signups: 2088, region: "Midwest", color: "blue" },
    { name: "UW", signups: 2042, region: "West", color: "purple" }
];

// Step 1: Append a new SVG element to HTML document with D3
// (width = 500px, height = 500px)

var w = 500, h = 500;

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);

// Step 2: Append a new SVG circle for every object in the schools array

var circles = svg.selectAll("circle")
    .data(schools)
    .enter()
    .append("circle");

// Step 3: Define the following dynamic properties for each circle:
//   - Position: set the x/y coordinates and make sure that the circles don’t overlap each other
//   - Radius: schools with over 3500 signups should be twice as big as schools with less than 2500 signups
//   - Colors: use a different color for each region
//   - Border: add a border to every circle (SVG property: stroke)

// y = 250 to center
circles.attr("cy", h/2)
    .attr("cx", function (d, i) {return (i + 1) * 50})
    .attr("r", function (d) {
        if (d.signups > 3500) {
            return 20;
        } else {
            return 10;
        }
    })
    .attr("fill", function (d) {return d.color; })
    .attr("stroke", "black");

// PART III: Loading data

// Step 1: Use D3 to load the CSV file "cities.csv". then, print the data
// to the console and inspect it in your browser

d3.csv("data/cities.csv", function(data) {
    var filterEU = data.filter(function(row) {
        return row.eu === "true";
    });
    console.log(filterEU);
});

// Step 2: Filter the dataset: Filter the dataset to only include cities that are
// part of the EU.

var europeanUnion = ["Austria", "Belgium", "Bulgaria", "Croatia",
    "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania",
    "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania",
    "Slovakia", "Slovenia", "Spain", "Sweden", "United Kingdom"];

// Step 3: Append a new paragraph to your HTML document that shows the
// number of EU countries

d3.select("body").append("p").text("There are " + europeanUnion.length + " EU countries.");

// Step 4: Prepare the data - each value of the CSV file is stored as a string,
// but we want numerical values to be numbers.

var toInt = function(d) {
    return {
        country: d.country,
        city: d.city,
        population: parseInt(d.population),
        x: parseInt(d.x),
        y: parseInt(d.y),
        eu: (d.eu === "true")
    };
};

d3.csv("data/cities.csv", toInt, function(data) {
    console.log(data);
});

// Step 5: Draw an SVG circle for each city in the filtered dataset
//   - All the elements (drawing area + circles) should be added dynamically with D3
//   - SVG container: width = 700px, height = 550px
//   - Use the x/y coordinates from the dataset to position the circles

// Step 6: Change the radius of the circle to be data-dependent
//   - The radius should be 4px for cities with population less than one million
//   - The radius for all other cities should be 8px

// Step 7: Add labels with the names of the European cities
//   - Use the SVG text element
//   - All the elements should be the class of city-label
//   - The labels should only be visible for cities with population greater
//   than one million (use opacity)

var eu = d3.select("body")
    .append("svg")
    .attr("width", 700)
    .attr("height", 550);


d3.csv("data/cities.csv", toInt, function(data) {

    var euCountries = data.filter(function(row) {
        return row.eu;
    });
    console.log(euCountries);

    var cities = eu.selectAll("circle")
        .data(euCountries)
        .enter()
        .append("circle");

    cities.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) {
            if (d.population < 1000000) {
                return 4;
            } else {
                return 8;
            }
        })
        .attr("class", "city");

    var labels = eu.selectAll("text")
        .data(euCountries)
        .enter()
        .append("text");

    labels.attr("x", function(d) { return d.x; })
        .attr("class", "city-label")
        .attr("y", function(d) { return d.y; })
        .text(function(d) { return d.city; })
        .attr("opacity", function(d) {
            if (d.population < 1000000) {
                return 0;
            } else {
                return 1;
            }
        })
});

// Step 8: Styling - in the external stylesheet, do some styling
//   - Make sure to at least style city-label with font size = 11 px and
//   text anchor = middle


// Optional bonus step: add tooltips displaying the country for each city
// https://bl.ocks.org/d3noob/257c360b3650b9f0a52dd8257d7a2d73
