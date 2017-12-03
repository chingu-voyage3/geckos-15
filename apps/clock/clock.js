
// This app runs on page load and needs no user input to trigger it
function clock(){
    // Requesting Date data and defining them
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Update #date li with value
    document.getElementById("date").innerText = day + " " + months[month] + " " + year;
    // Update #time li with value
    document.getElementById("time").innerText = hours + ":" + minutes;
}
// Run the clock function every second to update html with real-time data
setInterval(clock, 1000);

/*
FUTURE FEATURE:
# Allow users to pick a timezone from a drop-down manu..
*/
