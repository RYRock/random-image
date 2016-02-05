/* TO DO Drag And Drop */

var timer = document.getElementById('timer'),
    counter = 120,
    interval;

var imgArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'];
var index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/* add prototype shuffle to Array */
Array.prototype.shuffle = function() {
    var i = this.length,
        j,
        temp;

    if (i === 0) {
        return this;
    }
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
};

/* return a num between max and min ex: 0 - 10 */
// function getRandomInt(max, min) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function AllowDrop(event) {
    event.preventDefault();
}

function Drag(event) {
    event.dataTransfer.setData("text", event.currentTarget.id);
}

function Drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.currentTarget.appendChild(document.getElementById(data));
}

imgArray = imgArray.shuffle();
index = index.shuffle();

interval = setInterval(function() {
    counter--;

    if (counter < 0) {
        clearInterval(interval);
    } else {
        if ((counter % 10) === 0) {
            var num = index[0];

            document.getElementById('img' + num).src = 'resources/images/' + imgArray[num - 1];
            index.splice(0, 1);
        }
        timer.innerHTML = 'Countdown Timer ' + counter.toString() + ' seconds.';
    }
}, 1000);
