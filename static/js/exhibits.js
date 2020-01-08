//*******************************************************************************************
//  CONTROL FOR WHAT IS SELECTED
//  starts at these values, as user changes selections they will update
//*******************************************************************************************

// var selectedYear = 2017;
// var selected_xAxis = "median_income";
// var selected_yAxis = "median_home_value";
// var stateView = "all";
// var selectedState = "Illinois";
// var selectedCounty = "Cook County_Illinois";
// var selectedGeo = "0500000US17031";

getDict();

// Builds the bubble chart
function getDict() {
  d3.json(`/owners`).then((data) => {
  console.log("in the getDict function");
  console.log(data);
  })
}
//     // arrays for plotting non selected states
//     x_axis_list = [];
//     y_axis_list = [];
//     county_labels_list = [];
//     pop_size_list = [];
//     county_st_list = [];
//     geo_id_list = [];
//     bubble_colors = [];

//     // arrays for plotting selected states
//     x_axis_list_state = [];
//     y_axis_list_state = [];
//     county_labels_list_state = [];
//     pop_size_list_state = [];
//     county_st_list_state = [];
//     geo_id_list_state = [];
//     bubble_colors_state = [];

//     // populate arrays differently, controlling for if the user is looking at all states, highlighting a state, or isolating a state
//     data.forEach(d => {
//       if (stateView == "all"){
//         x_axis_list.push(d[x]);
//         y_axis_list.push(d[y]);
//         county_labels_list.push(d["county"] + ", " + d["state"]);
//         pop_size_list.push(d["population"] * .0003);
//         county_st_list.push(d["county_state"]);
//         geo_id_list.push(d['geo_id']);
        
//         // pushes highlighted color if selected county_state
//           if (d["geo_id"] == selectedGeo){
//             bubble_colors.push("#cb8763")
//           }
//           else {
//             bubble_colors.push("#1f77b4")
//           }   
//       }

//       else if ((d["state"] != selectedState) && (stateView == "highlight")){
//           x_axis_list.push(d[x]);
//           y_axis_list.push(d[y]);
//           county_labels_list.push(d["county"] + ", " + d["state"]);
//           pop_size_list.push(d["population"] * .0003);
//           county_st_list.push(d["county_state"]);
//           geo_id_list.push(d['geo_id']);

//           // pushes highlighted color if selected county_state
//           if (d["geo_id"] == selectedGeo){
//             bubble_colors.push("#cb8763")
//           }
//           else {
//             bubble_colors.push("#7f7f7f")
//           }   
//       }

//       else if (d["state"] == selectedState){
//         x_axis_list_state.push(d[x]);
//         y_axis_list_state.push(d[y]);
//         county_labels_list_state.push(d["county"] + ", " + d["state"]);
//         pop_size_list_state.push(d["population"] * .0003);
//         county_st_list_state.push(d["county_state"]);
//         geo_id_list_state.push(d['geo_id']);

//           // pushes highlighted color if selected county_state
//           if (d["geo_id"] == selectedGeo){
//             bubble_colors_state.push("#cb8763")
//           }
//           else {
//             bubble_colors_state.push("#63a3cb")
//           }   
//       }

//     });

//     // convert axis titles to friendly name
//     var x_axis_title = friendlyName(selected_xAxis);
//     var y_axis_title = friendlyName(selected_yAxis);
//     var bubble_title = selectedYear + " " + x_axis_title + " vs. " + y_axis_title;

//     // creates varations of display for state all, highlight, and isolate views
//     if (stateView == "all"){
//       var name = "All States";
//     }
//     else {
//       var name = "Other States";
//     }

//     // set axis ranges to constant value if running the loop through year view
//     if (loopThroughYear === false){
//       max_x_axis = (Math.max(... x_axis_list)) * 1.10;
//       max_y_axis = (Math.max(... y_axis_list)) * 1.10;
//       min_x_axis = (Math.min(... x_axis_list)) * .9;
//       min_y_axis = (Math.min(... y_axis_list)) * .9;
//     };

//     // Build a Bubble Chart
//     var myBubblePlot = document.getElementById('bubble'),
//     bubbleLayout = {
//       plot_bgcolor:"white",
//       hovermode: "closest",
//       //automargin: true,
//       height: 450,
//       // width: 825,
//       showlegend: true,
//       legend: {
//         //bgcolor: "#f2f2f2",
//         bordercolor: '#999999',
//         borderwidth: 0.5,
//         "orientation": "h",
//         x: 0.05,
//         y: 0.9, // -0.3//.
//         // x: 0.0,
//         // y: 1.3, // -0.3//.
//         bgcolor: 'rgba(0,0,0,0)'
//       },
//       margin: {
//         l: 60,
//         r: 10,
//         b: 50,
//         t: 50,
//         pad: 10
//       },
//       title: {
//         y:0.95,
//         text: bubble_title,
//         font: {
//           //family: 'arial black',
//           size: 16
//           }
//         },
//       xaxis: { 
//         title: x_axis_title,
//         zeroline: false,
//         range: [min_x_axis, max_x_axis],
//         color:'#2685b5',
//       },
//       yaxis: { 
//         title: y_axis_title,
//         zeroline: false,
//         range: [min_y_axis, max_y_axis],
//         color:'#62ac42',
//       },
//     };
    
//     bubbleData = [
//       {
//         x: x_axis_list,
//         y: y_axis_list,
//         text: county_labels_list,
//         hovertemplate: '<b>%{text}</b> <br>' + friendlyName(x) + ': %{x} <br>' + friendlyName(y) + ': %{y}',
//         mode: "markers",
//         marker: {
//           size: pop_size_list,
//           sizemode: 'area',
//           color: bubble_colors,
//           },
//         name: name
//       },
//       {
//         x: x_axis_list_state,
//         y: y_axis_list_state,
//         text: county_labels_list_state,
//         hovertemplate: '<b>%{text}</b> <br>' + friendlyName(x) + ': %{x} <br>' + friendlyName(y) + ': %{y}',
//         mode: "markers",
//         marker: {
//           size: pop_size_list_state,
//           sizemode: 'area',
//           color: bubble_colors_state,
//           },
//         name: selectedState
//       }
//     ];

//     Plotly.newPlot("bubble", bubbleData, bubbleLayout, {responsive: true}).then  // then handles the year over year view
//     if (loopThroughYear === true && selectedYear < 2017){
//       selectedYear = selectedYear + 1;
//       sleep(300);
//       buildBubbleChart(selectedYear, selected_xAxis, selected_yAxis);
//     }
//     else if (loopThroughYear === true && selectedYear === 2017){
//       sleep(300);
//       buildBubbleChart(selectedYear, selected_xAxis, selected_yAxis);
//       loopThroughYear = false
//     }

//     myBubblePlot.on('plotly_click', function(data){
//       clickedCounty = data.points[0].text;
//       selectedCounty = stateCountyConvert(clickedCounty);
//       console.log(`${selectedCounty} is the select county`); 

//       // grabs the value of the specific state clicked
//       clickedState = selectedCounty.split("_")
//       clickedState = clickedState[1]
//       console.log(clickedState)

//       if ((clickedState == selectedState) && (stateView != "all")){
//         selectedGeo = (geo_id_list_state[data.points[0].pointIndex])
//         }
//       else if ((clickedState != selectedState) && (stateView != "all")){
//         selectedGeo = (geo_id_list[data.points[0].pointIndex])
//         }
//       else if (stateView == "all"){
//         selectedGeo = (geo_id_list[data.points[0].pointIndex])
//         }

//       console.log(`${selectedGeo} is the select geoID`); 
      
//       // update the county card and time series by calling functions with the new geo
//       newCountyTimeSeries(selectedGeo);  //updates time series
//       county_select(selectedGeo);  // updates card
//       mapHighlight(mapLayersDict[selectedGeo]);  // updates map
//       buildBubbleChart(selectedYear, selected_xAxis, selected_yAxis);  // reruns bubble chart
//   });
// });

//   selectedYear = year
//   selected_xAxis = x
//   selected_yAxis = y
//   console.log(`current selected year is ${selectedYear}`)
//   console.log(`current selected x is ${x}`)
//   console.log(`current selected y is ${y}`)
// }
