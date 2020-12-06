


//helper unpack function
function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
};

function updatePlotly() {
    d3.json("../samples.json").then(function (otdData) {
        console.log(otdData)

        let sampleIds = otdData.names
        let dropdownOptions = d3.select("#selDataset").selectAll("option")

        dropdownOptions.data(sampleIds)
            .enter()
            .append("option")
            .text(function(d) {
                return d;
            });


        let dataset = d3.select("#selDataset").property("value");

        // let trace1 = {
        //     type:"bar",
        //     x:unpack(otdData.),
        //     y:unpack()
        // }

    });

};


updatePlotly();