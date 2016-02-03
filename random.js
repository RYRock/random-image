var timer = document.getElementById("timer"),
    counter = 120,
    interval;

interval = setInterval(function() {
    counter--;
    if ((counter % 10) === 0) {
        var num = (counter / 10);
        timer.innerHTML = "Countdown Timer " + counter.toString() + " seconds.";
        document.getElementById("img" + (num + 1)).src = "http://lorempixel.com/400/400/cats/";
    } else if (counter < 0) {
        clearInterval(interval);
    } else {
        timer.innerHTML = "Countdown Timer " + counter.toString() + " seconds.";
    }
}, 1000);
