

function clock(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    document.getElementById("date").innerText = day + " " + months[month] + " " + year;
    document.getElementById("time").innerText = hours + ":" + minutes;
}

setInterval(clock, 1000);
