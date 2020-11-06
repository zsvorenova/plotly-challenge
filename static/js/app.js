// Fetch the JSON data and console log it
dropdownMenu=d3.select("#selDataset");
metadataHtml=d3.select("#sample-metadata");

d3.json('samples.json').then(function(data) {
    // select data and save them in variables for next work
    console.log(data);
    const names = data.names;
    const metadata = data.metadata;
    const samples = data.samples;
    console.log(names);
    console.log(metadata);
    console.log(samples);


    // 1. DROPDOWN MENU
    // add ids to dropdown menu:
    // for (var i=0; i < names.length; i++) {
    //     dropdownMenu.append("option").attr("value", names[i]).text(`${names[i]}`);
    // };

    names.forEach(function(id) {
        dropdownMenu.append("option").attr("value", id).text(`${id}`);
    });
    
    var selectedID = names[0];
    console.log(`test id: ${selectedID}`);

    // 2. METADATA FOR SELECTED ID
    // select metadata based on the id:
    function filterId(i) {
        return i.id == selectedID; // use only == as metadata has id as int and samples as string
    }
    // we can use 'find' function to select the metadata as an object (not array of 1)
    var idMeta = metadata.find(filterId);
    console.log(idMeta);
    // append sample metadata to html
    Object.entries(idMeta).forEach(([key, value]) => metadataHtml.append("p").text(`${key}: ${value}`)
    );

    // 3. BAR CHART FOR SELECTED ID
    var idSample = samples.filter(filterId)[0]; // this is same as find above, returns first value
    console.log(idSample);
    
    // create an array of the data for plotting
    var sampleData=[];

    for (var i=0; i < idSample.otu_ids.length; i++) {
        sampleData[i]= {
            otu_id: "OTU " + idSample.otu_ids[i],
            value: idSample.sample_values[i],
            label: idSample.otu_labels[i]
    }};
    console.log(sampleData)

    // Sort the data descending by value
    var sortedByValue = sampleData.sort((a, b) => b.value - a.value);
    console.log(sortedByValue);

    // Slice the first 10 objects for plotting
    var top10Data = sortedByValue.slice(0, 10);
    console.log(top10Data);

    // Reverse the array to accommodate Plotly's defaults
    reversedData = top10Data.reverse();
    console.log(reversedData);

    // Plot the data for the test subject samples
    // create trace
        var trace1 = {
        x: reversedData.map(object => object.value),
        y: reversedData.map(object => object.otu_id),
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
    margin: {
        l: 50,
        r: 50,
        t: 50,
        b: 50
    }
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data, layout);

    
});

