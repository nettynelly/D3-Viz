
// create container for values
var payload = {
  'Healthcare': [],
  'Poverty': [],
  'State': [],
  'Abbreviation': []
}

function processDataAndGraph(data) {
  console.log(data);

  // loop through data, extracting th healthcare and poverty values
  data.forEach(function (row) {
    payload['Poverty'].push(+row['poverty']);
    payload['Healthcare'].push(+row['healthcare']);
    payload['State'].push(row['state']);
    payload['Abbreviation'].push(row['abbr']);
  })

  console.log(`This is payload: ${payload}`);

  // Step 2 - Organize Data so that we can place into graphs

  console.log('Payload Poverty Values:');
  console.log(payload['Poverty']);

  // payload['Poverty'].forEach(function(value) {
  //   console.log(value);
  // })

  health_care = ['Healthcare'].concat(payload['Healthcare'])
  poverty_data = ['Poverty'].concat(payload['Poverty']);
  abbreviations = ['Abbreviations'].concat(payload['Abbreviation']);

  console.log('healthcare', health_care);
  console.log('poverty', poverty_data);
  console.log('abbreviations', abbreviations);

  // Step 3 - Make Scatter Chart
  var chart = c3.generate({
    bindto: '#scatter',
    data: {
      xs: {
        'Healthcare': 'Poverty'
      },
      // iris data from R
      columns: [
        poverty_data,
        health_care
      ],
      type: 'scatter'
    },
    axis: {
      x: {
        label: 'Poverty',
        tick: {
          fit: false
        }
      },
      y: {
        label: 'State'
      }
    },
    point: {
      r: 5
    },
    tooltip: {
      format: {
        title: function (x, index) {
          return `[${abbreviations[index + 1]}] Poverty Rate: ` + x;
        }
      }
    }
  });

}

// Process CSV then once it's finally read, run the function that we created
d3.csv("assets/data/data.csv")
  .then(function (data) {
    // data = csv data as json

    // pass the newly processed data to the function
    processDataAndGraph(data);
  });

 