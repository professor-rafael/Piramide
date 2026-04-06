
var w,D
var mX=0
var mY=0
var rX=0
var rY=0
var t=0
function setup() {
	H=min(windowWidth,windowHeight)
	W=H 
	img = createCanvas(W, H);
	w = W/2
	h = H/2
	pixelDensity(displayDensity())
	D = pow(H*H/TAU,0.5)
	colorMode(HSB,100,100,100,100)
}

function draw() {
	fill(0,9)
	strokeWeight(H*0.015*(1+0.9*sin(t))+abs(mX)+abs(mY))
	stroke((t-10)%100,100,100,50)
	rect(0,0,W*0.99,H*0.99)
	stroke(t%100,100,100,50)
	translate(mX,mY)
	rotate((mX+mY)/h)
	if(touches.length == 2){
		if(rotationX) rX = H * map(rotationX, -PI,PI, -0.01, 0.01)
		if(rotationY) rY = H * map(rotationY, -PI,PI, -0.01, 0.01)
		mX = rX
		mY = rY
	}
	else if(mouseIsPressed){
		mX = H * map(mouseX, 0, H, -0.02, 0.02) + rX
		mY = H * map(mouseY, 0, H, -0.02, 0.02) + rY
	}
	circle(w/2,h/2, D)
  image(img, 0, 0);
  image(img, w, 0, w, h);
  image(img, 0, h, w, h);
  image(img, w, h, w, h);
	t += 0.01
}
function keyPressed() {
  if (key === 's') saveCanvas("Replication_Window_" + int(W) + '_' + round(mX, 2) + '_' + round(mY, 2) + '_' + round(t, 2), "png");
}

function mousePressed(){
	const docEl = document.documentElement
	if (!docEl) return;
	if (docEl.requestFullscreen) docEl.requestFullscreen();
	else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
	else if (docEl.mozRequestFullScreen) docEl.mozRequestFullScreen(); // Careful of the capital S on 'Screen'
	else if (docEl.msRequestFullscreen) docEl.msRequestFullscreen();
	else if (docEl.webkitEnterFullscreen) docEl.webkitEnterFullscreen();
}

function preventBehavior(e) {
    e.preventDefault()
}

document.addEventListener("touchmove", preventBehavior, {passive: false})
