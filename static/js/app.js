// Fetch the JSON data and console log it
dropdownMenu=d3.select("#selDataset");

d3.json('samples.json').then(function(data) {
    // select data and save them in variables for next work
    console.log(data);
    const names = data.names;
    const metadatas = data.metadata;
    const samples = data.samples;
    console.log(names);
    console.log(metadatas);
    console.log(samples);

    



});

