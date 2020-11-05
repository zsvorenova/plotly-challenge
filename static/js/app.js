// Fetch the JSON data and console log it
dropdownMenu=d3.select("#selDataset");
metadataHtml=d3.select("#sample-metadata");

d3.json('samples.json').then(function(data) {
    // select data and save them in variables for next work
    console.log(data);
    const names = data.names;
    const metadatas = data.metadata;
    const samples = data.samples;
    console.log(names);
    console.log(metadatas);
    console.log(samples);

    // add ids to dropdown menu:
    // for (var i=0; i < names.length; i++) {
    //     dropdownMenu.append("option").attr("value", names[i]).text(`${names[i]}`);
    // };

    names.forEach(function(id) {
        dropdownMenu.append("option").attr("value", id).text(`${id}`);
    });
    
    




});

