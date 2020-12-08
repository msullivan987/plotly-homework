function init() {
    d3.json("../samples.json").then(function (otuData) {

        let filteredOtuData = otuData.samples.find(sample => sample.id === "940");

        let topTenValues = filteredOtuData.sample_values.slice(0, 10).reverse();

        let chartLabelIntegers = filteredOtuData.otu_ids.slice(0, 10).reverse();

        let chartLabels = chartLabelIntegers.map(number => `OTU ${number}`);

        console.log(chartLabels)

        let chartHover = filteredOtuData.otu_labels.slice(0, 10).reverse();

        let trace1 = {
            y: chartLabels,
            x: topTenValues,
            type: "bar",
            orientation: "h"
        };

        let data = [trace1];

        Plotly.newPlot("bar", data);
    });

};

function updatePlotly() {
    d3.json("../samples.json").then(function (otuData) {
        console.log(otuData)

        //Populate the dropdown menu with the available sampleId names
        let sampleIds = otuData.names
        let dropdownOptions = d3.select("#selDataset").selectAll("option")

        dropdownOptions.data(sampleIds)
            .enter()
            .append("option")
            .text(function (d) {
                return d;
            })
            .property("value", function (d) {
                return d;
            });

        //How to print all the ids from the metadata object
        //console.log(otuData.metadata.map(id => id.id));

        //Create event listener for changing dropdown choices
        let dropdown = d3.select("#selDataset")

        let datasetId = ""

        function optionChanged() {
            datasetId = d3.select("#selDataset").property("value")
            console.log(datasetId)

            //Create a filter for matching user selection to dataset

            let filteredOtuData = otuData.samples.find(sample => sample.id === datasetId);

            //Update Chart
            let topTenValues = filteredOtuData.sample_values.slice(0, 10).reverse();

            let chartLabelIntegers = filteredOtuData.otu_ids.slice(0, 10).reverse();

            let chartLabels = chartLabelIntegers.map(number => `OTU ${number}`);

            let chartHover = filteredOtuData.otu_labels.slice(0, 10).reverse();

            console.log(chartLabels)

            let trace1 = {
                y: chartLabels,
                x: topTenValues,
                type: "bar",
                orientation: "h"
            };

            let data = [trace1];

            Plotly.react("bar", data);



        };
        dropdown.on("change", optionChanged);
    });

};

init();
updatePlotly();