function doFirst() {
    var x = document.getElementById('canvas');
    canvas = x.getContext('2d');
    canvas.clearRect(100, 100, 100, 100);
    var g = canvas.createLinearGradients(0, 0);
    g.addColorStop(.0, "blue");
    g.addColorStop(1, "red");
    }

window.addeventListener("load", doFirst, false);