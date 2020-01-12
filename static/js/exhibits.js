
// initial call of functions to populate the graphs
getOwners();
getTeams();
getPlayerTeams();
selectedOwner = 'All'

// function for building chart 
function getOwners() {
  d3.json(`/owners`).then((data) => {
    
    // lists to populate 
    wins = [];
    owner = [];
    pt_differential = [];
    projected_wins = [];
    last_ten_wins = [];


    data.forEach(d => {
      
      // populate the lists
      wins.push(d["Wins"]);
      owner.push(d["Owner"]);
      pt_differential.push(d["Point Differential"]);
      projected_wins.push(d["Projected Wins"]);
      last_ten_wins.push(d["Last 10 Gm Wins"]);
    })   

    var ownerWins = [
      {
        x: owner,
        y: wins,
        type: 'bar',
        text: wins.map(String),
        textposition: 'auto',
      }
    ];
    
    var ownerWinsLayout = {
      title: {
        text: "Wins by Owner",
        family: 'arial black',
       },
      margin:{
        pad: 10
      }, 
      xaxis: {automargin: true, fixedrange: true}, 
      yaxis: {automargin: true},
    }

    var ownerProjectedWins = [
      {
        x: projected_wins,
        y: owner,
        marker:{
          color: '#a8d2f0'},
        type: 'bar',
        text: projected_wins.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];
    
    var ownerProjectedWinsLayout = {
      title: {
        text: "Projected Wins",
        family: 'arial black',
       },
      margin:{
        pad: 10
      }, 
      xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }

    var ownerLastTenWins = [
      {
        x: last_ten_wins,
        y: owner,
        marker:{
          color: '#a8d2f0'},
        type: 'bar',
        text: last_ten_wins.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];

    var ownerLastTenLayout = {
      title: {
        text: "Teams Last Ten Games Wins",
        family: 'arial black',
       },
      margin:{
        pad: 10
      }, 
      xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }


    Plotly.newPlot('owner-wins', ownerWins, ownerWinsLayout);
    Plotly.newPlot('owner-projected-wins', ownerProjectedWins, ownerProjectedWinsLayout);
    Plotly.newPlot('owner-last-ten-wins', ownerLastTenWins, ownerLastTenLayout);

  console.log("in the getOwner function");
  console.log(data);
  })
}

function getTeams() {
  d3.json(`/teams`).then((data) => {
    
    // lists to populate 
    wins = [];
    owner = [];
    teams = [];
    colors = [];
    teamAndOwner = [];


    data.forEach(d => {
      
      // populate the lists
      wins.push(d["Wins"]);
      owner.push(d["Owner"]);
      teams.push(d["Team"]);

      // pushes highlighted color if selected county_state
      if (selectedOwner == 'All'){
        colors.push("#1f77b4")
      }
      else if (d["Owner"] == selectedOwner){
        colors.push("#1f77b4")
      }   
      else {
        colors.push("#cccccc")
      }   
    })   

    var teamWins = [
      {
        x: wins,
        y: teams,
        text: teamAndOwner,
        marker:{
          color: colors},
        type: 'bar',
        text: wins.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];

    var teamWinsLayout = {
      title: {
        text: "Teams Wins",
        family: 'arial black',
       },
      height: 700,
      margin:{
        pad: 10
      }, 
      xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }

    Plotly.newPlot('team-wins',teamWins, teamWinsLayout);

  console.log("in the getTeam function");
  console.log(data);
  })
}


function getPlayerTeams() {
  d3.json(`/teams`).then((data) => {
    
    // lists to populate 
    adam_wins = [];
    adam_team = [];
    adam_last10 = [];
    joey_wins = [];
    joey_team = [];
    joey_last10 = [];
    johnny_wins = [];
    johnny_team = [];
    johnny_last10 = [];
    robert_wins = [];
    robert_team = [];
    robert_last10 = [];
    


    data.forEach(d => {


      // populate the team lists
      if (d["Owner"] == 'Adam'){
        adam_wins.push(d["Wins"]);
        adam_last10.push(d["Last 10 Gm Wins"]);
        adam_team.push(d["Team"]);
      }
      else if (d["Owner"] == 'Joey'){
        joey_wins.push(d["Wins"]);
        joey_last10.push(d["Last 10 Gm Wins"]);
        joey_team.push(d["Team"]);
      }
      else if (d["Owner"] == 'Johnny'){
        johnny_wins.push(d["Wins"]);
        johnny_last10.push(d["Last 10 Gm Wins"]);
        johnny_team.push(d["Team"]);
      }
      else if (d["Owner"] == 'Robert'){
        robert_wins.push(d["Wins"]);
        robert_last10.push(d["Last 10 Gm Wins"]);
        robert_team.push(d["Team"]);
      }
    })   

    var adamWinsData = [
      {
        x: adam_wins,
        y: adam_team,
        type: 'bar',
        text: adam_wins.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];

    var adamWinsLayout = {
      title: {
        text: "Adam Teams Wins",
        family: 'arial black'},
        xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }

    var adamLastTenWinsData = [
      {
        x: adam_last10,
        y: adam_team,
        marker:{
          color: '#a8d2f0'},
        type: 'bar',
        text: adam_last10.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];

    var adamLastTenWinsLayout = {
      title: {
        text: "Adam Teams - Wins Last 10 Games",
        family: 'arial black'},
        xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }

    var joeyWinsData = [
      {
        x: joey_wins,
        y: joey_team,
        type: 'bar',
        text: joey_wins.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];

    var joeyWinsLayout = {
      title: {
        text: "Joey Teams Wins",
        family: 'arial black'},
        xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }

    var joeyLastTenWinsData = [
      {
        x: joey_last10,
        y: joey_team,
        marker:{
          color: '#a8d2f0'},
        type: 'bar',
        text: joey_last10.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];

    var joeyLastTenWinsLayout = {
      title: {
        text: "Joey Teams - Wins Last 10 Games",
        family: 'arial black'},
        xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }

    var johnnyWinsData = [
      {
        x: johnny_wins,
        y: johnny_team,
        type: 'bar',
        text: johnny_wins.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];

    var johnnyWinsLayout = {
      title: {
        text: "Johnny Teams Wins",
        family: 'arial black'},
        xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }

    var johnnyLastTenWinsData = [
      {
        x: johnny_last10,
        y: johnny_team,
        marker:{
          color: '#a8d2f0'},
        type: 'bar',
        text: johnny_last10.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];

    var johnnyLastTenWinsLayout = {
      title: {
        text: "Johnny Teams - Wins Last 10 Games",
        family: 'arial black'},
        xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }

    var robertWinsData = [
      {
        x: robert_wins,
        y: robert_team,
        type: 'bar',
        text: robert_wins.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];

    var robertWinsLayout = {
      title: {
        text: "Robert Teams Wins",
        family: 'arial black'},
        xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }

    var robertLastTenWinsData = [
      {
        x: robert_last10,
        y: robert_team,
        marker:{
          color: '#a8d2f0'},
        type: 'bar',
        text: robert_last10.map(String),
        textposition: 'auto',
        orientation: 'h',
        rangemode:'tozero'   
      }
    ];

    var robertLastTenWinsLayout = {
      title: {
        text: "Robert Teams - Wins Last 10 Games",
        family: 'arial black'},
        xaxis: {automargin: true, fixedrange: true, showticklabels: false}, 
      yaxis: {automargin: true},
    }

    Plotly.newPlot('adam-team-wins',adamWinsData, adamWinsLayout);
    Plotly.newPlot('adam-last-ten-wins',adamLastTenWinsData, adamLastTenWinsLayout);
    Plotly.newPlot('joey-team-wins',joeyWinsData, joeyWinsLayout);
    Plotly.newPlot('joey-last-ten-wins',joeyLastTenWinsData, joeyLastTenWinsLayout);
    Plotly.newPlot('johnny-team-wins',johnnyWinsData, johnnyWinsLayout);
    Plotly.newPlot('johnny-last-ten-wins',johnnyLastTenWinsData, johnnyLastTenWinsLayout);
    Plotly.newPlot('robert-team-wins',robertWinsData, robertWinsLayout);
    Plotly.newPlot('robert-last-ten-wins',robertLastTenWinsData, robertLastTenWinsLayout);

  console.log("in the getTeam function");
  console.log(data);
  })
}


// changes the select owner based on what the user selects and reruns the teams chart
function newSelectedOwner(){
  selectedOwner = d3.select("#owner-select").property("value");
  console.log(`The new selected owner is ${selectedOwner}`);
  getTeams();
}

