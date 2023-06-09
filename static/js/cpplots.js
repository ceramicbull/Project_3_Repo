
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







