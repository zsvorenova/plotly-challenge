// Fetch the JSON data and console log it
var dropdownMenu=d3.select("#selDataset");
var metadataHtml=d3.select("#sample-metadata");

// console.log(selectedID);
function init() {
    d3.json('samples.json').then(function(data) {
        // select data and save them in variables for next work
        console.log(data);
        const names = data.names;
        // id=names[0]

        names.forEach(function(id) {
            d3.select("#selDataset").append("option").attr("value", id).text(`${id}`);
        });
        getData(names[0]);
    });
    
};

function optionChanged(id) {
    
    getData(id);
}

// get samples data for selected Test Subject Id:
function getData(id) {
    d3.json('samples.json').then(function(data) {
        // select data and save them in variables for next work
        console.log(data);
        const names = data.names;
        const metadata = data.metadata;
        const samples = data.samples;
        console.log(names);
        console.log(metadata);
        console.log(samples);
        
        // function to select data based on the Test Subject Id:
        var idSample = samples.find(sample => sample.id == id); 
        console.log(idSample);

        var sampleData=[];
        
        for (var i=0; i < idSample.otu_ids.length; i++) {
            sampleData[i]= {
                otu_id: idSample.otu_ids[i],
                value: idSample.sample_values[i],
                label: idSample.otu_labels[i]
        }};
        console.log(sampleData);
        var otus = sampleData.map(i => i.otu_id);
        var values = sampleData.map(i => i.value);
        var labels = sampleData.map(i => i.label);
        
        // Slecte top10 bacteria data: sort, slice the first 10 objects and reverse the order for plotting
        var top10Data = sampleData
                        .sort((a, b) => b.value - a.value)
                        .slice(0, 10)
                        .reverse();
        console.log(top10Data);
        var top10Ids = top10Data.map(object => "OTU " + object.otu_id);
        var top10Values = top10Data.map(object => object.value);
        var top10Labels = top10Data.map(object => object.label);

        // we can use 'find' function to select the metadata as an object (not array of 1)
        var idMeta = metadata.find(metadata => metadata.id == id);
        console.log(idMeta);
        
        // draw plots and write metadata for slected Test Subject ID
        BarChart(top10Ids, top10Values, top10Labels);
        bubbleChart(otus, values, labels, id);
        getMetadata(idMeta);
    });
};

// 1. add Test Subject Ids to dropdown menu
function writeDropdownMenu (names) {
    names.forEach(function(id) {
        d3.select("#selDataset").append("option").attr("value", id).text(`${id}`);
    });
};

// 2. METADATA for selected Test Subject
function getMetadata(idMeta) {
    metadataHtml.html("");
    // append sample metadata to html
    Object.entries(idMeta).forEach(([key, value]) => metadataHtml.append("p").text(`${key}: ${value}`)
    );
};

// 3. BAR CHART for selected Test Subject
function BarChart(ids, values, labels) {
    
    // Plot the data for the test subject samples
    // create trace
    var trace1 = {
        x: values,
        y: ids,
        text: labels,
        name: "top10",
        type: "bar",
        orientation: "h"
    };

    // data
    var data = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
    title: "To 10 Bacteria Cultures",
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data, layout);
};

function bubbleChart(ids, values, labels, id) {
    var trace1 = {
        x: ids,
        y: values,
        text: labels,
        mode: 'markers',
        marker: {
          color: ids,
          size: values,
          colorscale: "Viridis"     // available color schemes: "Viridis" "Cividis" "Greys" "YlGnBu" "Greens" "YlOrRd" "Bluered" "RdBu" 
                                    // "Reds" "Blues" "Picnic" "Rainbow" "Portland" "Jet" "Hot" "Blackbody"
                                    // "Earth" "Electric" ""
        }
      };
      
    var data = [trace1];
      
    var layout = {
        title: `Bacteria Cultures Found in the Test Subject ${id}`,
        showlegend: false,
        xaxis: {title: 'OTU ID'},
        yaxis: {title: 'Value'}
    };
      
    Plotly.newPlot('bubble', data, layout);
}


// read and download the data
// d3.json('samples.json').then(function(data) {
//     // select data and save them in variables for next work
//     console.log(data);
//     const names = data.names;
//     const metadata = data.metadata;
//     const samples = data.samples;
//     console.log(names);
//     console.log(metadata);
//     console.log(samples);
   
//     writeDropdownMenu(names);
//     getData(samples, metadata);
// });

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//     Plotly.restyle("pie", "values", [newdata]);
// }

// // Use D3 to create an event handler
// d3.selectAll("#selDataset").on("change", updatePage);

// function updatePage() {
// //   // Use D3 to select the dropdown menu
// //   var dropdownMenu = d3.select("#selDataset");
//   // Assign the dropdown menu item ID to a variable
//   var dropdownMenuID = dropdownMenu.property("id");
//   // Assign the dropdown menu option to a variable
//   var selectedOption = dropdownMenu.property("value");

//   console.log(dropdownMenuID);
//   console.log(selectedOption);
// }
init();



