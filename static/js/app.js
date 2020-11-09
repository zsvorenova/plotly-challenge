// Fetch the JSON data and console log it
dropdownMenu=d3.select("#selDataset");
metadataHtml=d3.select("#sample-metadata");

var selectedID = 940;    

// function to select data based on the Test Subject Id:
function filterId(i) {
    return i.id == selectedID; // use only == as metadata has id as int and samples as string
};

// get samples data for selected Test Subject Id:
function getData(samples) {
    var idSample = samples.find(filterId); 
    console.log(idSample);

    var sampleData=[];
    
    for (var i=0; i < idSample.otu_ids.length; i++) {
        sampleData[i]= {
            otu_id: idSample.otu_ids[i],
            value: idSample.sample_values[i],
            label: idSample.otu_labels[i]
    }};
    console.log(sampleData);
    
    // Slecte top10 bacteria data: sort, slice the first 10 objects and reverse the order for plotting
    var top10Data = sampleData
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 10)
                    .reverse();
    console.log(top10Data);

    BarChart(top10Data);
    bubbleChart(sampleData);
};
// console.log(sampleData);

// 1. add Test Subject Ids to dropdown menu
function writeDropdownMenu (names) {
    names.forEach(function(id) {
        dropdownMenu.append("option").attr("value", id).text(`${id}`);
    });
};

// 2. METADATA for selected Test Subject
function getMetadata(metadata) {
    // we can use 'find' function to select the metadata as an object (not array of 1)
    var idMeta = metadata.find(filterId);
    console.log(idMeta);
    // append sample metadata to html
    Object.entries(idMeta).forEach(([key, value]) => metadataHtml.append("p").text(`${key}: ${value}`)
    );
};

// 3. BAR CHART for selected Test Subject
function BarChart(reversedData) {
    
    // Plot the data for the test subject samples
    // create trace
    var trace1 = {
        x: reversedData.map(object => object.value),
        y: reversedData.map(object => "OTU " + object.otu_id),
        text: reversedData.map(object => object.label),
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

function bubbleChart(sampleData) {
    var trace1 = {
        x: sampleData.map(i => i.otu_id),
        y: sampleData.map(i => i.value),
        text: sampleData.map(i => i.label),
        mode: 'markers',
        marker: {
          color: sampleData.map(i => i.otu_id),
          size: sampleData.map(i => i.value),
          colorscale: "Viridis"     // available color schemes: "Viridis" "Cividis" "Greys" "YlGnBu" "Greens" "YlOrRd" "Bluered" "RdBu" 
                                    // "Reds" "Blues" "Picnic" "Rainbow" "Portland" "Jet" "Hot" "Blackbody"
                                    // "Earth" "Electric" ""
        }
      };
      
    var data = [trace1];
      
    var layout = {
        title: `Bacteria Cultures Found in the Test Subject ${selectedID}`,
        showlegend: false,
        xaxis: {title: 'OTU ID'},
        yaxis: {title: 'Value'}
    };
      
    Plotly.newPlot('bubble', data, layout);
}



d3.json('samples.json').then(function(data) {
    // select data and save them in variables for next work
    console.log(data);
    const names = data.names;
    const metadata = data.metadata;
    const samples = data.samples;
    console.log(names);
    console.log(metadata);
    console.log(samples);
   
    writeDropdownMenu(names);
    getMetadata(metadata);
    getData(samples);
});




