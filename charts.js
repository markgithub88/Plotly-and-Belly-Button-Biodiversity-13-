function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 
    var samplesArry = data.samples
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSample =  samplesArry.filter(sampleObj => sampleObj.id == sample);
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
    metaarry = data.metadata
    var filteredmetasample =  metaarry.filter(sampleObj => sampleObj.id == sample);

    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    firstSample = filteredSample[0];
    console.log(firstSample);

    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
    firstmetaSample = filteredmetasample[0]
    console.log(firstmetaSample);

    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    otu_ids = firstSample.otu_ids
    otu_labels = firstSample.otu_labels
    sample_values = firstSample.sample_values
    frequency = firstmetaSample.wfreq
    console.log(otu_ids);



    // Chain the slice() method with the map() and reverse() functions to retrieve the top 10 otu_ids sorted in descending order.

    peanutbutter = otu_ids.slice(0,10).map(otu_id => `OTU${otu_id}`).reverse()
    


    // // Deliverable 3: 3. Create a variable that holds the washing frequency.
    // washing = 
     
    console.log(firstmetaSample.wfreq);


    // // Deliverable 1: 7. Create the yticks for the bar chart.
    var trace1 = {
      x: sample_values.slice(0,10).reverse(),
      y: peanutbutter,
      name: 'Top 10 Bacteria Cultures Found',
      type: 'bar',
      orientation: 'h'
    };
    
    var data = [trace1];
    
    var layout = {barmode: 'group'};
    
    Plotly.newPlot('bar', data, layout);
    
     var barData = [

      ];

   

    // // Deliverable 2: 1. Create the trace for the bubble chart.
    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids, 
        size: sample_values,
        colorscale: 'Earth'
      }
    };
    
    var data = [trace2];
    
    var layout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: "OTU ID" },
      margin: {l:20, r:20, t:20, b:20},
      hovermode: 'closest'
      
    };
    
    Plotly.newPlot('bubble', data, layout);

    
    // // create a variable that filters the metadata array for an object in the array whose id property matches the ID number from the dropdown menu that is passed into buildCharts() function as the argument
    // Deliverable 3: 4. Create the trace for the gauge chart. 
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: frequency,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "black"},
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "yellowgreen" },
            { range: [8, 10], color: "green" }
          ],
        }
      }
    ];
         

    
    // // Deliverable 3: 5. Create the layout for the gauge chart.

    var gaugeLayout = { 
      width: 500, 
      height: 425, 
      margin: { t: 0, b: 0 } };

    // // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
