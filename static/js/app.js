
function init() {
    d3.json("../samples.json").then(function (otuData) {

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

        //Specify data for inital view charts using sample id 940
        let filteredOtuData = otuData.samples.find(sample => sample.id === "940");

        //Find values for bar chart
        let topTenValues = filteredOtuData.sample_values.slice(0, 10).reverse();
        let chartLabelIntegers = filteredOtuData.otu_ids.slice(0, 10).reverse();
        let chartLabels = chartLabelIntegers.map(number => `OTU ${number}`);
        let chartHover = filteredOtuData.otu_labels.slice(0, 10).reverse();

        let trace1 = {
            y: chartLabels,
            x: topTenValues,
            type: "bar",
            orientation: "h",
            text: chartHover
        };

        let data = [trace1];

        //Build Bar Chart
        Plotly.newPlot("bar", data);

        //Find values for bubble chart
        let bubbleX = filteredOtuData.otu_ids;
        let bubbleY = filteredOtuData.sample_values;
        let bubbleMarkerSize = filteredOtuData.sample_values;
        let bubbleMarkerColor = filteredOtuData.otu_ids;
        let bubbleText = filteredOtuData.otu_labels;

        let bubbleTrace = [{
            x: bubbleX,
            y: bubbleY,
            mode: "markers",
            text: bubbleText,
            marker: {
                size: bubbleMarkerSize,
                color: bubbleMarkerColor
            }
        }];

        let layout = {
            showlegend: false,
            xaxis: {
                title: "OTU IDs"
            }
        }
        //Build Bubble Chart
        Plotly.newPlot("bubble", bubbleTrace, layout);

        //Find Values for metadata for #sample-metadata
        let filteredMetadata = otuData.metadata.find(sample => sample.id === 940);

        //Create new ul element and add all metadata to li's there
        d3.select("#sample-metadata").append("ul");

        let metadataBody = d3.select("#sample-metadata").select("ul");

        metadataBody.selectAll("li")
            .data(Object.entries(filteredMetadata))
            .enter()
            .append("li")
            .text(function ([key, value]) {
                return `${key}:${value}`
            });
    });
};

function updatePlotly() {
    d3.json("../samples.json").then(function (otuData) {

        //Create event listener for changing dropdown choices
        let dropdown = d3.select("#selDataset")
        let datasetId = ""

        function optionChanged() {
            datasetId = d3.select("#selDataset").property("value")

            //Create a filter for matching user selection to dataset

            let filteredOtuData = otuData.samples.find(sample => sample.id === datasetId);

            //Update Chart
            let topTenValues = filteredOtuData.sample_values.slice(0, 10).reverse();
            let chartLabelIntegers = filteredOtuData.otu_ids.slice(0, 10).reverse();
            let chartLabels = chartLabelIntegers.map(number => `OTU ${number}`);
            let chartHover = filteredOtuData.otu_labels.slice(0, 10).reverse();

            let trace1 = {
                y: chartLabels,
                x: topTenValues,
                type: "bar",
                orientation: "h",
                text: chartHover
            };

            let data = [trace1];

            Plotly.react("bar", data);

            //Find values for bubble chart
            let bubbleX = filteredOtuData.otu_ids;
            let bubbleY = filteredOtuData.sample_values;
            let bubbleMarkerSize = filteredOtuData.sample_values;
            let bubbleMarkerColor = filteredOtuData.otu_ids;
            let bubbleText = filteredOtuData.otu_labels;

            let bubbleTrace = [{
                x: bubbleX,
                y: bubbleY,
                mode: "markers",
                text: bubbleText,
                marker: {
                    size: bubbleMarkerSize,
                    color: bubbleMarkerColor
                }
            }];

            let layout = {
                showlegend: false,
                xaxis: {
                    title: "OTU IDs"
                },
                yaxis: { autorange: true }
            }
            //Build Bubble Chart
            Plotly.react("bubble", bubbleTrace, layout);

            //Find Values for metadata for #sample-metadata
            let filteredMetadata = otuData.metadata.find(sample => sample.id.toString() === datasetId);

            let metadataBody = d3.select("#sample-metadata").select("ul");

            metadataBody.selectAll("li")
                .data(Object.entries(filteredMetadata))
                .text(function ([key, value]) {
                    return `${key}:${value}`
                });

        };
        dropdown.on("change", optionChanged);

    });
};

init();
updatePlotly();