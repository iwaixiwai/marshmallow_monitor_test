// ウェブカメラの映像を表示

let img;
let img2 = []; //画像の配列をつくる

function preload() {
img = loadImage("m_monitor.png"); 
}

const facingModeList = [
  "user",
  "environment",
  { exact: "user" },
  { exact: "environment" },
];

const options = [];

let capture;

let t = 0;
let w = 0;
let h = 0;
let ww = 0;
let hh = 0;

let img_scale;
let mx,my;

let video_scale;
let frame_no = 0;

// マシュマロ画像サイズ 1301x1883
// マシュマロモニター部分サイズ 284x216
// マシュマロモニター部分中心位置 793x727
// マシュマロモニター部分左上位置 645x617

function setup() 
{
  angleMode(DEGREES);
  
  if(windowWidth < 1301)
  {
    createCanvas(windowWidth, windowHeight);
  }
  else
  {
    createCanvas(1301,1883);      
  }
      capture = createCapture(VIDEO);
      capture.hide();
  
  w = capture.width;
//  h = capture.height;
  h = w*3/4;
  
  image_scale = width / 1301;
  mx = image_scale * 645;
  my = image_scale * 618;
  ww = (int)(image_scale * 296);
  hh = (int)(image_scale * 220);

  video_scale = hh / 120;
    
  for (mode of facingModeList) {
    options.push({
      video: {
        facingMode: mode,
      },
      audio: false,
    });
  }

  for(i=0;i<120;i++)
    {
      img2[i] = capture.get(0, 0, w, h);
    }
}

function draw() 
{
  background(0);

  t++;
  if(t>119)
  {
    t = 0;
  }
    
  w = capture.width;
//  h = capture.height;
  h = w*3/4;
  
  img2[t] = capture.get(0, (capture.height - h)/2, w, h);
  
  push();
  translate(mx+ww,my+hh);
  rotate(180);
  for(i = 0; i<120 ; i+=1)
  {
    frame_no = (t+i)%120;
//    image(img2[(t+i)%218], 0, i, ww, 1, 0, h-i, w, 1);
    image(img2[frame_no], 0, i*video_scale, ww, 2, 0, h-(int)(i*(h/120)), w, 2);
  }
  
  // モニター部分に走査線を重ねる
  strokeWeight(0.1);
  stroke(100,170,240,60);
  for(i = 0; i<hh ; i+=2)
  {
    line(0,i,ww,i);
  }

  pop();

  // マシュマロ画像合成
  image(img, 0, 0, width, width*img.height/img.width);
  
}

