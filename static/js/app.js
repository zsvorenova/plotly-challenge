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

    // add ids to dropdown menu:
    // for (var i=0; i < names.length; i++) {
    //     dropdownMenu.append("option").attr("value", names[i]).text(`${names[i]}`);
    // };

    names.forEach(function(id) {
        dropdownMenu.append("option").attr("value", id).text(`${id}`);
    });
    
    var selectedID = names[0];
    console.log(`test id: ${selectedID}`);

    // select metadata based on the id:
    function filterMetadata(i) {
        return i.id === +selectedID;
    }
    // we can use 'find' function to select the metadata as an object (not array of 1)
    var sampleMeta = metadata.find(filterMetadata);
    console.log(sampleMeta);
    // append sample metadata to html
    Object.entries(sampleMeta).forEach(([key, value]) => metadataHtml.append("p").text(`${key}: ${value}`)
    );

    
});

