// load initial page
function init() {
    // fetch data
    d3.json('samples.json').then(function(data) {
        // save Test Subject Ids in var
        const names = data.names;
        // add Test Subject Ids to dropdown menu
        names.forEach(function(id) {
            d3.select("#selDataset").append("option").attr("value", id).text(`${id}`);
        });
        // select data for initial sample adn draw initial plots
        getData(names[0]);
    });  
};

// on change select data for new Test Subject Id and redraw the plots
function optionChanged(id) {
    getData(id);
};

// get data for selected Test Subject Id:
function getData(id) {
    // fetch data
    d3.json('samples.json').then(function(data) {
        // and save them in variables
        const metadata = data.metadata;
        const samples = data.samples;
                
        // select Sample dataset based on the Test Subject Id:
        var sampleData=[];
        for (var i=0; i < samples.find(sample => sample.id == id).otu_ids.length; i++) {
            sampleData[i]= {
                otu_id: samples.find(sample => sample.id == id).otu_ids[i],
                value: samples.find(sample => sample.id == id).sample_values[i],
                label: samples.find(sample => sample.id == id).otu_labels[i]
        }};
        
        // save vars for bubble chart 
        var otus = sampleData.map(i => i.otu_id);
        var values = sampleData.map(i => i.value);
        var labels = sampleData.map(i => i.label);
        
        // Save data for top 10 bacteria found: sort, slice, and reverse the order for plotting
        var top10Data = sampleData
                        .sort((a, b) => b.value - a.value)
                        .slice(0, 10)
                        .reverse();
        
        var top10Ids = top10Data.map(object => "OTU " + object.otu_id);
        var top10Values = top10Data.map(object => object.value);
        var top10Labels = top10Data.map(object => object.label);

        // we can use 'find' function to select the metadata as an object (not array of 1)
        var metaForId = metadata.find(metadata => metadata.id == id);
                
        // draw plots and write metadata for slected Test Subject ID
        BarChart(top10Ids, top10Values, top10Labels, id);
        bubbleChart(otus, values, labels, id);
        getMetadata(metaForId);
    });
};


// METADATA for selected Test Subject
function getMetadata(metadata) {

    var metadataHtml=d3.select("#sample-metadata");
    // clean metadata tabel if data exists
    metadataHtml.html("");
    // and append current sample metadata to html
    Object.entries(metadata).forEach(([key, value]) => metadataHtml.append("p").text(`${key}: ${value}`)
    );
};

// BAR CHART for selected Test Subject
function BarChart(ids, values, labels, id) {
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

    // layout
    var layout = {
    title: `Top 10 OTUs Found in Test Subject ${id}`,
    };

    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);
};

// BUBBLE CHART
function bubbleChart(ids, values, labels, id) {
    // create trace
    var trace1 = {
        x: ids,
        y: values,
        text: labels,
        mode: 'markers',
        marker: {
          color: ids,
          size: values,
          colorscale: "Viridis" 
        }
    };
    // data  
    var data = [trace1];
    // layout
    var layout = {
        title: `Bacteria Cultures Found in the Test Subject ${id}`,
        showlegend: false,
        xaxis: {title: 'OTU ID'},
        yaxis: {title: 'Value'}
    };
    // plot bubble chart to id 'bubble'
    Plotly.newPlot('bubble', data, layout);
};

// call init function
init();



