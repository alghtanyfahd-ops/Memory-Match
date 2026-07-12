
let spinning = false;

window.openWheel = function(){

    const modal =
    document.getElementById("wheelModal");


    if(!modal){

        alert("لم أجد wheelModal ❌");

        return;

    }


    modal.classList.remove("hidden");


    drawWheel();

};



// رسم عجلة الحظ الاحترافية

function drawWheel(){
alert("drawWheel وصلت");
    const canvas =
    document.getElementById("wheelCanvas");
    
    if(!canvas){

        alert("لم أجد wheelCanvas ❌");

        return;

    }


const cx =
canvas.width / 2;


const cy =
canvas.height / 2;


const radius = 150;

    const prizes = [
        "🪙20",
        "🪙50",
        "⭐100",
        "💎500",
        "🪙100",
        "🎁",
        "❤️",
        "🪙10"
    ];


    const colors = [
        "#ff5252",
        "#ff9800",
        "#ffeb3b",
        "#4caf50",
        "#03a9f4",
        "#3f51b5",
        "#9c27b0",
        "#e91e63"
    ];

    const ctx =
canvas.getContext("2d");
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const part =
    Math.PI * 2 / prizes.length;


    for(let i = 0; i < prizes.length; i++){


        const start =
        i * part;


        const end =
        start + part;


        ctx.beginPath();

        ctx.moveTo(
            cx,
            cy
        );


        ctx.arc(
            cx,
            cy,
            radius,
            start,
            end
        );


        ctx.closePath();


        ctx.fillStyle =
        colors[i];

        ctx.fill();


        ctx.strokeStyle =
        "#ffffff";

        ctx.lineWidth = 3;

        ctx.stroke();



        ctx.save();


        ctx.translate(
            cx,
            cy
        );


        ctx.rotate(
            start + part / 2
        );


        ctx.fillStyle =
        "#ffffff";

        ctx.font =
        "bold 18px Arial";

        ctx.textAlign =
        "center";


        ctx.fillText(
            prizes[i],
            100,
            5
        );


        ctx.restore();

    }



    // وسط العجلة

    ctx.beginPath();

ctx.arc(
    cx,
    cy,
    45,
    0,
    Math.PI * 2
);


    ctx.fillStyle =
    "#222";

    ctx.fill();


    ctx.fillStyle =
    "#fff";

    ctx.font =
    "bold 22px Arial";

    ctx.textAlign =
    "center";


    ctx.fillText(
        "🎁",
        cx,
        cy - 5
    );


    ctx.fillText(
        "لف",
        cx,
        cy + 25
    );
ctx.restore();
}
// إغلاق نافذة العجلة

window.closeWheel = function(){

    const modal =
    document.getElementById("wheelModal");


    if(modal){

        modal.classList.add("hidden");

    }

};

window.spinWheel = function(){

    if(spinning){
        return;
    }


    spinning = true;


    let start =
    performance.now();


    let duration = 4000;


    let turns =
    (Math.floor(Math.random() * 5) + 5) * Math.PI * 2;


    function animate(time){

        let progress =
        (time - start) / duration;


        if(progress < 1){


            let ease =
            1 - Math.pow(1 - progress, 3);


            wheelAngle =
            turns * ease;


            drawWheel();


            requestAnimationFrame(animate);


        }else{


            spinning = false;


            alert("🎁 مبروك! حصلت على جائزتك");


        }

    }


    requestAnimationFrame(animate);

};
