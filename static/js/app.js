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
    // const sample = samples.find(function(i) {
    //     i.id === +selectedID;
    //     // console.log(i.id);
    // })
    console.log(idSample);
    var otu = idSample.otu_ids;
    var values = idSample.sample_values;
    var labels = idSample.otu_labels;

    console.log(otu);
    console.log(values);
    console.log(labels);

    
});

