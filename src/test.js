var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log("oifjweio")
    console.log(this.getAllResponseHeaders())

        var headers = this.getAllResponseHeaders();

    // Convert the header string into an array
    // of individual headers
    var arr = headers.trim().split(/[\r\n]+/);

    // Create a map of header names to values
    var headerMap = {};
    arr.forEach(function (line) {
      var parts = line.split(': ');
      var header = parts.shift();
      var value = parts.join(': ');
      headerMap[header] = value;
    });
  }
};
console.log("fweoij")
xhr.open('GET', 'https://storage.googleapis.com/gtclass/rubikSounds/white.mp3', true)
xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
xhr.send()

// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const url = "https://storage.googleapis.com/gtclass/rubikSounds/white.mp3"; // site that doesn’t send Access-Control-*
// fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
// .then(response => console.log(response.headers))
// .then(contents => console.log(contents))
// .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))