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



