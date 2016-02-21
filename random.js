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

/* define html5 drag and drop */
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
        image.src = image.src + '?' + +new Date;
    }, 1000);
}

/*
convert touch events to mouse events from
http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices 
*/
function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup"
        }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

(function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
})();

/* TODO mouse events handling */

/* main shuffle images with a countdown timer */
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
