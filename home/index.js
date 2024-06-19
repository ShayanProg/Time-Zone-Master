// const searchBar = document.getElementById("search-bar");

//Fetching API 
//Getting queries:
// const query = "something";
    //Responding to queries:
    // const res = fetch('https://worldtimeapi.org/api/timezone/America/New_York');
// console.log(res)
//Adding clocks
//adding an event listener to listen get the query

// Fetching global timezone data from worldtimeapi
fetch('https://worldtimeapi.org/api/timezone')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching timezones:', error));

  document.getElementById("search-icon").addEventListener("click", function() {
    const searchBar = document.getElementById("search-bar");
    const query = searchBar.value;
    fetch(`https://worldtimeapi.org/api/timezone/${query}`)
      .then(response => response.json())
      .then(data => {
        if (data.datetime) {
          console.log("Current time in " + query + ": " + data.datetime);
        } else {
          console.log("No time data available for " + query);
        }
      })
      .catch(error => console.error('Error fetching time for:', query, error));
  });
