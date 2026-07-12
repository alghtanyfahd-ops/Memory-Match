
let spinning = false;
let wheelAngle = 0;


const wheelPrizes = [
    "🪙20",
    "🪙50",
    "⭐100",
    "💎500",
    "🪙100",
    "🎁",
    "❤️",
    "🪙10"
];


const wheelColors = [
    "#ff5252",
    "#ff9800",
    "#ffeb3b",
    "#4caf50",
    "#03a9f4",
    "#3f51b5",
    "#9c27b0",
    "#e91e63"
];



// فتح العجلة

window.openWheel = function(){

    const modal =
    document.getElementById("wheelModal");


    if(!modal){
        console.log("wheelModal غير موجود");
        return;
    }


    modal.classList.remove("hidden");


    drawWheel();

};




// إغلاق العجلة

window.closeWheel = function(){

    const modal =
    document.getElementById("wheelModal");


    if(modal){

        modal.classList.add("hidden");

        console.log("تم إغلاق العجلة");

    }

};





// رسم العجلة

function drawWheel(){

    const canvas =
    document.getElementById("wheelCanvas");


    if(!canvas) return;


    const ctx =
    canvas.getContext("2d");


    const cx =
    canvas.width / 2;


    const cy =
    canvas.height / 2;


    const radius = 150;


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.save();


    ctx.translate(cx,cy);


    ctx.rotate(wheelAngle);



    const slice =
    Math.PI * 2 / wheelPrizes.length;



    for(let i=0;i<wheelPrizes.length;i++){


        const start =
        i * slice;


        ctx.beginPath();


        ctx.moveTo(0,0);


        ctx.arc(
            0,
            0,
            radius,
            start,
            start + slice
        );


        ctx.closePath();


        ctx.fillStyle =
        wheelColors[i];


        ctx.fill();


        ctx.strokeStyle="#fff";

        ctx.lineWidth=3;

        ctx.stroke();



        ctx.save();


        ctx.rotate(start + slice/2);


        ctx.fillStyle="#fff";

        ctx.font="bold 18px Arial";

        ctx.textAlign="center";


        ctx.fillText(
            wheelPrizes[i],
            100,
            5
        );


        ctx.restore();

    }



    // وسط العجلة

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        45,
        0,
        Math.PI*2
    );


    ctx.fillStyle="#222";

    ctx.fill();


    ctx.fillStyle="#fff";

    ctx.font="bold 22px Arial";


    ctx.fillText(
        "🎁",
        0,
        -5
    );


    ctx.fillText(
        "لف",
        0,
        25
    );


    ctx.restore();

}






// تدوير العجلة

window.spinWheel=function(){


    if(spinning)
    return;


    spinning=true;


    let start =
    performance.now();


    let startAngle =
    wheelAngle;


    let rotations =
    (Math.floor(Math.random()*5)+5)
    * Math.PI * 2;


    let finalAngle =
    startAngle + rotations;


    let duration =
    4000;



    function animate(time){


        let progress =
        (time-start)/duration;



        if(progress < 1){


            let ease =
            1-Math.pow(
                1-progress,
                3
            );


            wheelAngle =
            startAngle +
            (finalAngle-startAngle)
            * ease;


            drawWheel();


            requestAnimationFrame(
                animate
            );


        }else{


            wheelAngle =
            finalAngle % (Math.PI*2);


            drawWheel();


            spinning=false;


            givePrize();

        }

    }


    requestAnimationFrame(
        animate
    );

};






// حساب الجائزة

function givePrize(){

    const slice = Math.PI * 2 / wheelPrizes.length;

    let pointerAngle =
    (Math.PI * 1.5 - wheelAngle)
    % (Math.PI * 2);


    if(pointerAngle < 0){
        pointerAngle += Math.PI * 2;
    }


    let index =
    Math.floor(pointerAngle / slice);


    let prize =
    wheelPrizes[index];


    console.log(
        "الفائز:",
        prize
    );


    let amount =
    parseInt(
        prize.replace(/\D/g,"")
    );


    if(amount && window.addCoins){

        addCoins(amount);

    }


let winMessage = "";

if(prize.includes("10")){

    winMessage = "🎉 ربحت 10 كوين";

}
else if(prize.includes("20")){

    winMessage = "🎉 ربحت 20 كوين";

}
else if(prize.includes("50")){

    winMessage = "🎉 ربحت 40 كوين";

}
else if(prize.includes("100")){

    winMessage = "🎁 هدية رائعة";

}
else if(prize.includes("500")){

    winMessage = "❤️ ربحت يا قلب";

}
else{

    winMessage = "🎁 هدية";

}


showWinMessage(winMessage);

}

