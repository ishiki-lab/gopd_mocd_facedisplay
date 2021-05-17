var headImage, eyeImage, noseImage, mouthImage;
var myCamera;
var showPoints = false;
var showElements = true;
var showImage = false;
let startSound;

function preload() {
  soundFormats('mp3', 'ogg');
  startSound = loadSound('assets/audio/bw_mocd_avatar_tribal_drum_start');
  startSound.playMode('untilDone');
}

function setup() {
    // myCamera = loadCamera(windowWidth, windowHeight, false);
    // myCamera = loadCameraWH(VIDEO, windowWidth, windowHeight, true);
    myCamera = loadCameraWH("http://127.0.0.1:5002/cam.mjpg", windowWidth, windowHeight, true);
    // myCamera = createImg("http://127.0.0.1:5002/cam.mjpg");
    // myCamera.hide();
    loadTracker();
    //createCanvas(windowWidth, windowHeight);
    loadCanvas(windowWidth, windowHeight);
    
    headImage = loadImage("assets/img/head2.png");
    eyeImage = loadImage("assets/img/eye2.png");
    noseImage = loadImage("assets/img/nose2.png");
    mouthImage = loadImage("assets/img/mouth2.png");
}
      
function draw() {
    getPositions();
    clear();
    if (showImage == true) image(myCamera,windowWidth/2,windowHeight/2,windowWidth,windowHeight); //myCamera.show();
    // if (showImage == false) myCamera.hide();
    if (showElements == true) drawElements();
    if (showPoints == true) drawPoints();
    
}

function drawElements() {
    if(positions.length > 0) {
        // startSound.play();

        var p1 = createVector(positions[7][0], positions[7][1] );
        var p2 = createVector(positions[33][0], positions[33][1] );
        
        var headpos = createVector(positions[33][0],positions[33][1]);
        var eye1pos = createVector(positions[27][0],positions[27][1]);
        var eye2pos = createVector(positions[32][0],positions[32][1]);
        var nosepos = createVector(positions[41][0],positions[41][1]);
        var mouthpos = createVector(positions[57][0],positions[57][1]);    
        
        stroke(255,0,0);
        // line(p1.x,p1.y,p2.x, p2.y);
        
        noFill();
        
        stroke(0,255,0);
        ellipse(eye1pos.x,eye1pos.y,10,10);
        ellipse(eye2pos.x, eye2pos.y,10,10);
        ellipse(mouthpos.x, mouthpos.y,10,10);
        
        stroke(0,0,255);
        ellipse(nosepos.x, nosepos.y,10,10);
        ellipse(headpos.x, headpos.y,10,10);
        
        
        // angle in radians
        var angleRad = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        var mSize = p1.dist(p2);
        
        imageMode(CENTER);
        
        push();
        translate(headpos.x,headpos.y); 
        rotate(angleRad + PI/2);
        image(headImage,0,0,mSize*2,mSize*2);
        pop();

        push();
        translate(eye1pos.x,eye1pos.y); 
        rotate(angleRad + PI/2);
        image(eyeImage,0,0,mSize/2,mSize/2);
        pop();
        
        push();        
        translate(eye2pos.x,eye2pos.y); 
        scale(-1, 1);
        rotate(-angleRad -PI/2);
        image(eyeImage,0,0,mSize/2,mSize/2);
        pop();
        
        push();
        translate(mouthpos.x,mouthpos.y); 
        rotate(angleRad + PI/2);
        image(mouthImage,0,0,mSize*2,mSize*2);
        pop();
        
        push();
        translate(nosepos.x,nosepos.y+10); 
        rotate(angleRad + PI/2);
        image(noseImage,0,0,mSize,mSize);
        pop();    
    }
}

function drawPoints() {
    for (var i=0; i<positions.length -1; i++) {
        // set the color of the ellipse based on position on screen
        fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 100), 0);
        
        // draw ellipse
        noStroke();
        ellipse(positions[i][0], positions[i][1], 10, 10);
        
        // draw line
        stroke(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 100), 0,50);
        // stroke(255);
        line(positions[i][0], positions[i][1], positions[i+1][0], positions[i+1][1]);
    }
}


function keyPressed() {
    if (keyCode === 80) { // P
        showPoints = !showPoints;
        console.log(showPoints+"-"+showElements);
    } else if (keyCode === 69) { // E
        showElements = !showElements;
        console.log(showPoints+"-"+showElements);
    } else if (keyCode === 73) { // I
        showImage = !showImage;
        console.log(showPoints+"-"+showElements);
    }    
    return false; // prevent any default behavior
  }