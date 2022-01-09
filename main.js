
/*
from:- https://crunchify.com/list-of-all-social-sharing-urls-for-handy-reference-social-media-sharing-buttons-without-javascript/

facebook:
https://www.facebook.com/sharer.php?u=[post-url]

twitter:
https://twitter.com/share?url=[post-url]&text=[post-title]

pinterest:
https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&is_video=[is_video]&description=[post-title]

instagram:

whatsapp:
https://api.whatsapp.com/send?text=[post-title] [post-url]

*/


img = "";
imgarr = ['dog_cat.jpg','cars.jpg','pizza.jpg']
objects = [];
status = "false";
x = 0;

const facebookBtn = document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");
const pinterestBtn = document.querySelector(".pinterest-btn");
const instaBtn = document.querySelector(".instagram-btn");
const whatsappBtn = document.querySelector(".whatsapp-btn");

function init() {
    let postUrl = encodeURI(document.location.href);
    let postTitle = encodeURI("Share my page"); 
    console.log("posturl = " + postUrl + " postTitle = " + postTitle);

    facebookBtn.setAttribute(
        "href",`https://www.facebook.com/sharer.php?u=${postUrl}`
    );
    twitterBtn.setAttribute(
        "href",
        `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
    );
    pinterestBtn.setAttribute(
        "href",`https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=${postUrl}&is_video=[is_video]&description=${postTitle}`
    );
    instaBtn.setAttribute(
        "href",`https://www.facebook.com/sharer.php?u=${postUrl}`
    );

    whatsappBtn.setAttribute(
        "href",
        `https://api.whatsapp.com/send?text=${postTitle} ${postUrl}`
    );
}

init();

function preload(){
 /* img = loadImage('dog_cat.jpg');*/
 img = loadImage(imgarr[x]);
}


function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded! " + x)
  status = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(img, 0, 0, 640, 420);

      if(status = "true")
      {
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
    
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}

function movenext(){

  console.log("Movenext function");
  x++ ;
  if(x > 2){
    x = 0;
  }
  img = loadImage(imgarr[x]);
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function moveprev(){

  console.log("Moveprev function");
  x = x-1 ;
  if(x < 0 ){
    x = 3;
  }
  img = loadImage(imgarr[x]);
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}