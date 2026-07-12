// ==========================
// Memory Match Wheel
// Version 2.0
// ==========================

const wheelCanvas =
document.getElementById("wheelCanvas");

const ctx =
wheelCanvas.getContext("2d");


const prizes = [

"🪙20",
"🪙50",
"⭐100",
"💎500",
"🪙100",
"🎁",
"❤️",
"😅"

];


const colors = [

"#FF6384",
"#36A2EB",
"#FFCE56",
"#4BC0C0",
"#9966FF",
"#FF9F40",
"#00C853",
"#E91E63"

];


function drawWheel(){

const size =
wheelCanvas.width;

const radius =
size / 2;

const arc =
Math.PI * 2 / prizes.length;


ctx.clearRect(
0,
0,
size,
size
);


for(

let i=0;

i<prizes.length;

i++

){

ctx.beginPath();

ctx.moveTo(
radius,
radius
);

ctx.arc(

radius,

radius,

radius-5,

arc*i,

arc*(i+1)

);

ctx.fillStyle =
colors[i];

ctx.fill();

ctx.save();

ctx.translate(
radius,
radius
);

ctx.rotate(
arc*i + arc/2
);

ctx.fillStyle =
"white";

ctx.font =
"bold 18px Arial";

ctx.textAlign =
"right";

ctx.fillText(

prizes[i],

radius-25,

8

);

ctx.restore();

}

ctx.beginPath();

ctx.arc(

radius,

radius,

40,

0,

Math.PI*2

);

ctx.fillStyle =
"#222";

ctx.fill();

ctx.fillStyle =
"white";

ctx.font =
"bold 18px Arial";

ctx.textAlign =
"center";

ctx.fillText(

"SPIN",

radius,

radius+6

);

}


drawWheel();
// ==========================
// فتح وإغلاق عجلة الحظ
// ==========================

function openWheel(){

    document
    .getElementById("wheelModal")
    .classList
    .remove("hidden");

}

function closeWheel(){

    document
    .getElementById("wheelModal")
    .classList
    .add("hidden");

}
