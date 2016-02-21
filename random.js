/* TO DO Drag And Drop */

var timer = document.querySelector('#timer'),
    counter = 120,
    interval;

var imgArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'];
var index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/* add prototype shuffle to Array */
if (typeof Array.prototype.shuffle !== 'function') {
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
}

/* return a num between max and min ex: 0 - 10 */
// function getRandomInt(max, min) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function allowDrop(event) {
    event.preventDefault();
}

function onDrag(event) {
    event.dataTransfer.setData("image/jpg", event.currentTarget.id);
}

function onDrop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("image/jpg", event.currentTarget.id);
    event.currentTarget.appendChild(document.querySelector('#' + data));
}

/* if img load failed reload after 1 sec */
function loadError(image) {
    setTimeout(function() {
        // image.src += '?' + +new Date;
        image.src = image.src + '?' + +new Date;
    }, 1000);
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

            document.querySelector('#img' + num).src = 'resources/images/' + imgArray[num - 1];
            index.splice(0, 1);
        }
        timer.innerHTML = 'Countdown Timer ' + counter.toString() + ' seconds.';
    }
}, 1000);
