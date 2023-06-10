// Grab data for histogram
const shapesApi = "/api/v1.0/shapes";

d3.json(shapesApi).then(function (data) {
    d3.selectAll("#selDataset").on("change", createHistogram);

    createHistogram();

    function createHistogram() {
        let dropdownMenu = d3.select("#selDataset");
        let selectedState = dropdownMenu.property("value");
        let stateData = data[selectedState];
        // let shapesList = Object.keys(stateData);
        // let countsList = Object.values(stateData);
        let sortedEntries = Object.entries(stateData).sort((a, b) => a[1] - b[1]);
        let sortedShapes = sortedEntries.map(entry => entry[0]);
        let sortedCounts = sortedEntries.map(entry => entry[1]);

        let barChartValues = {
            x: sortedCounts,
            y: sortedShapes,
            text: sortedShapes,
            type: "bar",
            orientation: "h",
        };

        let barChartLayout = {
            title: "UFO Shapes per State",
            yaxis: {
                dtick: 1
            }
        };
        Plotly.newPlot("shapePlot", [barChartValues], barChartLayout);
    }
})

// Grab data for line plot
const url = "/api/v1.0/plot";

d3.json(url).then(function (data) {
    d3.selectAll("#selDataset").on("change", createLineGraph);

    createLineGraph();

    function createLineGraph() {
        let dropdownMenu = d3.select("#selDataset");
        let State = dropdownMenu.property("value");
        let stateNames = data[State];
        let allInfo = Object.entries(stateNames);
        let years = allInfo.map(entry => entry[0]);
        let sightings = allInfo.map(entry => entry[1]);

        let lineValues = {
            x: years,
            y: sightings,
            mode: 'lines+markers',
            marker: {
                size: 12,
                opacity:0.5
            }
        };

        let lineLayout = {
            title: "UFO Sightings per State"
        };
        Plotly.newPlot("linePlot", [lineValues], lineLayout);
    }
})


