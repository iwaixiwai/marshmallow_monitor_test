// マシュマロモニターを再現する
// by Toshio Iwai 2025

let img;  // マシュマロ写真用
let img2 = []; //連続キャプチャー用の画像配列をつくる

// 写真を読み込む
function preload() 
{
  img = loadImage("m_monitor.png"); 
}

// カメラ設定用
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
  
  // 画面の最大サイズを制限
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

  // キャプチャーする画像は4:3のサイズ
  w = capture.width;
  h = w*3/4;

  // マシュマロモニター写真に合わせるためのパラメータ
  image_scale = width / 1301;
  mx = image_scale * 645;
  my = image_scale * 620;
  ww = (int)(image_scale * 296);
  hh = (int)(image_scale * 220);
  video_scale = hh / 120;

  // カメラ設定
  for (mode of facingModeList) 
  {
    options.push({
      video: {
        facingMode: mode,
      },
      audio: false,
    });
  }

  // キャプチャー用画像配列を用意
  for(i=0;i<120;i++)
  {
    img2[i] = capture.get(0, 0, w, h);
  }
}

function draw() 
{
  background(0);

  // キャプチャーする配列番号を更新
  t++;
  if(t>119)
  {
    t = 0;
  }
    
  // ビデオ画像の中央部分を配列にキャプチャー
  w = capture.width;
  h = w*3/4;
  img2[t] = capture.get(0, (capture.height - h)/2, w, h);
  
  push();
  
  // 左右反転
  translate(mx+ww,my+hh);
  rotate(180);

  // 過去のビデオ画像から、表示用の画像を再構成する
  for(i = 0; i<120 ; i+=1)
  {
    frame_no = (t+i)%120; // 時間をずらす
    image(img2[frame_no], 0, i*video_scale, ww, 2, 0, h-(int)(i*(h/120)), w, 2);
  }
  
  // モニター部分に走査線を重ねる
  strokeWeight(0.4);
  stroke(100,170,240,120);
  for(i = 0; i<hh ; i+=2)
  {
    line(0,i,ww,i);
  }

  pop();

  // マシュマロ写真合成
  image(img, 0, 0, width, width*img.height/img.width);
  
}

