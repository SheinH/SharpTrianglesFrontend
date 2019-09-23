var API_LOC = 'http://127.0.0.1:5000/api/triangles/'
var radios = document.getElementsByName('action');
var field = document.getElementById('input')
var submitButton = document.getElementById('submit')
var canvas = document.getElementById('canvas').getContext('2d');
radios[0].click()

field.onkeydown = function (event) {
  if (event.keyCode === 13)
    draw();
}
submitButton.onclick = draw;

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function draw() {
  callAPI(field.value);
}

function callAPI(input) {

// Open a new connection, using the GET request on the URL endpoint
  var request = createCORSRequest('GET', API_LOC + input, true)

  request.onload = function () {
    var data = JSON.parse(this.response);
    console.log(data);
    drawTriangles(data);
  }

// Send request
  request.send()
}

function drawTriangles(data) {
  canvas.beginPath();
  canvas.moveTo(data[0].X, data[0].Y);
  for (var i = 1; i < data.length; i++) {
    canvas.lineTo(data[i].X, data[i].Y);
  }
  canvas.closePath();
  if (radios[0].checked)
    canvas.fillStyle = "#5b9bd5";
  else
    canvas.fillStyle = 'white';
  canvas.fill();
}
