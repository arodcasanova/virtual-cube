var cubeFace = 0;
var cubeCell = 4;
var dictionary = { W:0, O:1, B:2, G:3, R:4, Y:5}
var cellColor = state.state.charAt(cubeCell);
var cellTone = dictionary[cellColor];
var cubeState = null;
var cubeStateA = null;
var cubeStateB = null;
var yellowFace = null;

// Create an AudioContext
let audioContext = null
let source1 = null
let audioElement = null
let didAddListener = false

let soundLinks = [
  'https://storage.googleapis.com/gtclass/rubikSounds/white.mp3',
  'https://storage.googleapis.com/gtclass/rubikSounds/orange.mp3',
  'https://storage.googleapis.com/gtclass/rubikSounds/blue.mp3',
  'https://storage.googleapis.com/gtclass/rubikSounds/green.mp3',
  'https://storage.googleapis.com/gtclass/rubikSounds/red.mp3',
  'https://storage.googleapis.com/gtclass/rubikSounds/yellow.mp3',
  'https://storage.googleapis.com/gtclass/rubikSounds/swish.wav',
  'https://storage.googleapis.com/gtclass/rubikSounds/outofbounds.mp3',
  'https://storage.googleapis.com/gtclass/rubikSounds/bell-C2.mp3'
]

  var colorClips = [];

  soundLinks.forEach((link, index) => {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
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
        console.log(headerMap['x-final-url'])
        colorClips[index] = headerMap['x-final-url']

        if (colorClips.length == soundLinks.length) {
          document.getElementById("demo").disabled = false;
          let audioElement = document.createElement('audio');
          audioElement.crossOrigin = "anonymous";
          audioElement.src = colorClips[8]
          console.log(audioElement)
          audioElement.play();
        }
      }
    };
    xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + link, true)
    xhr.setRequestHeader("X-Requested-With", "Accept")
    xhr.send()
  })


function myFunction() {
  if (audioContext == null) {
    let audioContext = new AudioContext();

    // Create a (first-order Ambisonic) Resonance Audio scene and pass it
    // the AudioContext.
    let resonanceAudioScene = new ResonanceAudio(audioContext);

    // Connect the scene’s binaural output to stereo out.
    resonanceAudioScene.output.connect(audioContext.destination);

    // Define room dimensions.
    // By default, room dimensions are undefined (0m x 0m x 0m).
    let roomDimensions = {
      width: 0,
      height: 0,
      depth: 0,
    };

    // Define materials for each of the room’s six surfaces.
    // Room materials have different acoustic reflectivity.
    let roomMaterials = {
      // Room wall materials
      left: 'marble',
      right: 'marble',
      front: 'marble',
      back: 'marble',
      // Room floor
      down: 'grass',
      // Room ceiling
      up: 'transparent',
    };

    // Add the room definition to the scene.
    resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);

    // Create an AudioElement.
    audioElement = document.createElement('audio');
    audioElement2 = document.createElement('audio');



    // Load an audio file into the AudioElement.
    audioElement.crossOrigin = "anonymous";
    audioElement2.crossOrigin = "anonymous";

    audioElement.src = soundLinks[0];
    audioElement2.src = soundLinks[6];

    // Generate a MediaElementSource from the AudioElement.
    let audioElementSource = audioContext.createMediaElementSource(audioElement);
    let audioElementSource2 = audioContext.createMediaElementSource(audioElement2);


    // Add the MediaElementSource to the scene as an audio input source.
    source1 = resonanceAudioScene.createSource();
    source2 = resonanceAudioScene.createSource();
    audioElementSource.connect(source1.input);
    audioElementSource2.connect(source2.input);


    // Set sound source parameters.
    source1.setRolloff('logarithmic');
    source2.setRolloff('logarithmic');
    source1.setGain(1.25);
    source2.setGain(1.25);

    if (!didAddListener) audioElement.play();

  


  // Make array to contain source coordinates.
  var cellXpos = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
  var cellYpos = [0, 0, 0, 1, 1, 1, 0, 0, 0];
  var cellZpos = [1, 1, 1, 0, 0, 0, -1, -1, -1];


  // Set coordinates for sound sources.
  var currentCell = 4
  source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
  source2.setPosition(0, 1, 0);

  let upFace = state.state.slice(0, 9);
  let rightFace = state.state.slice(9, 18);
  let frontFace = state.state.slice(18, 27);
  let backFace = state.state.slice(27, 36);
  let leftFace = state.state.slice(36, 45);
  let downFace = state.state.slice(45, 54);

  let whiteFace = upFace;
  let orangeFace = rightFace.charAt(2) + rightFace.charAt(5) + rightFace.charAt(8) + rightFace.charAt(1) + rightFace.charAt(4) + rightFace.charAt(7) + rightFace.charAt(0) + rightFace.charAt(3) + rightFace.charAt(6);
  let blueFace = frontFace;
  let greenFace = backFace.charAt(8) + backFace.charAt(7) + backFace.charAt(6) + backFace.charAt(5) + backFace.charAt(4) + backFace.charAt(3) + backFace.charAt(2) + backFace.charAt(1) + backFace.charAt(0);
  let redFace = leftFace.charAt(6) + leftFace.charAt(3) + leftFace.charAt(0) + leftFace.charAt(7) + leftFace.charAt(4) + leftFace.charAt(1) + leftFace.charAt(8) + leftFace.charAt(5) + leftFace.charAt(2);
  let yellowFace1 = downFace;
  let yellowFace2 = downFace.charAt(8) + downFace.charAt(7) + downFace.charAt(6) + downFace.charAt(5) + downFace.charAt(4) + downFace.charAt(3) + downFace.charAt(2) + downFace.charAt(1) + downFace.charAt(0);
  


  cubeStateA = whiteFace + orangeFace + blueFace + greenFace + redFace + yellowFace1;
  cubeStateB = whiteFace + orangeFace + blueFace + greenFace + redFace + yellowFace2;

  cubeState = cubeStateA;

  console.log(cubeState);

  }

  // Make array to contain sound clips of color names.

  // Create object toggle function.
  if (!didAddListener) {
      window.addEventListener('keypress', function (e) {
      // spacebar 

      if (cubeFace == 2 || cubeFace == 3) cubeState = cubeStateA;
      if (cubeFace == 1 || cubeFace == 4) cubeState = cubeStateB;
    if (e.which == 32) {
          if (cubeFace !== 0) audioElement2.play();
          cubeFace = 0;
          currentCell = 4;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[0];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
    }

    // up arrow / 'w' key
    if (e.which == 119) {

      if (currentCell > 2) {
          currentCell -= 3;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
      } else if (cubeFace == 0) {
          currentCell += 6;
          cubeFace += 3;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 3) {
          currentCell += 6;
          cubeFace += 2;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 2) {
          currentCell += 6;
          cubeFace -= 2;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 5) {
          if (cubeState == cubeStateA) {
            currentCell += 6;
            cubeFace -= 3;
            cubeCell = (cubeFace * 9) + currentCell;
            cellColor = cubeState.charAt(cubeCell);
            cellTone = dictionary[cellColor];
            audioElement.src = colorClips[cellTone];
            source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
            audioElement.play();
            audioElement2.play();
          } else {
              audioElement.src = soundLinks[7];
              audioElement.play();
          }
      } else {
          audioElement.src = soundLinks[7];
          audioElement.play();
      }
    }
    // down arrow / 's' key
    if (e.which == 115) {

      if (currentCell < 6) {
          currentCell += 3;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
      } else if (cubeFace == 0) {
          currentCell -= 6;
          cubeFace += 2;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 2) {
          currentCell -= 6;
          cubeFace += 3;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 3) {
          currentCell -= 6;
          cubeFace -= 3;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 5) {
          if (cubeState == cubeStateA) {
            currentCell += 6;
            cubeFace -= 2;
            cubeCell = (cubeFace * 9) + currentCell;
            cellColor = cubeState.charAt(cubeCell);
            cellTone = dictionary[cellColor];
            audioElement.src = colorClips[cellTone];
            source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
            audioElement.play();
            audioElement2.play();
          } else {
              audioElement.src = soundLinks[7];
              audioElement.play();
          }
      } else {
          audioElement.src = soundLinks[7];
          audioElement.play();
      }
    }

      // left arrow / 'a' key
    if (e.which == 97) {
         
      if (currentCell !== 0 && currentCell !== 3 && currentCell !== 6) {
          currentCell -= 1;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
      } else if (cubeFace == 0) {
          currentCell += 2;
          cubeFace += 4;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 4) {
          currentCell += 2;
          cubeFace += 1;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 1) {
          currentCell += 2;
          cubeFace -= 1;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 5) {
          if (cubeState == cubeStateB) {
            currentCell += 2;
            cubeFace -= 4;
            cubeCell = (cubeFace * 9) + currentCell;
            cellColor = cubeState.charAt(cubeCell);
            cellTone = dictionary[cellColor];
            audioElement.src = colorClips[cellTone];
            source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
            audioElement.play();
            audioElement2.play();
          } else {
              audioElement.src = soundLinks[7];
              audioElement.play();
          }
      } else {
          audioElement.src = soundLinks[7];
          audioElement.play();
      }
    }
    // right arrow / 'd' key
    if (e.which == 100) {
        
      if (currentCell !== 2 && currentCell !== 5 && currentCell !== 8) {
          currentCell += 1;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();  
      } else if (cubeFace == 0) {
          currentCell -= 2;
          cubeFace += 1;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 1) {
          currentCell -= 2;
          cubeFace += 4;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 4) {
          currentCell -= 2;
          cubeFace -= 4;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = cubeState.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 5) {
          if (cubeState == cubeStateB) {
            currentCell -= 2;
            cubeFace -= 1;
            cubeCell = (cubeFace * 9) + currentCell;
            cellColor = cubeState.charAt(cubeCell);
            cellTone = dictionary[cellColor];
            audioElement.src = colorClips[cellTone];
            source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
            audioElement.play();
            audioElement2.play();
          } else {
              audioElement.src = soundLinks[7];
              audioElement.play();
          }
      } else {
          audioElement.src = soundLinks[7];
          audioElement.play();
      }
    }

    if (e.which == 99) {
        audioElement.play();
    }

    console.log(cubeCell);
    console.log(cellColor);
    

  }, false);
  didAddListener = true
  }



}