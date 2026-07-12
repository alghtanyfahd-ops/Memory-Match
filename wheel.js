console.log("wheel.js loaded");

function openWheel(){

    document
    .getElementById("wheelModal")
    .classList
    .remove("hidden");

    drawTest();

}

function closeWheel(){
function drawTest(){

    const canvas =
    document.getElementById("wheelCanvas");

    const ctx =
    canvas.getContext("2d");


    ctx.fillStyle = "red";

    ctx.beginPath();

    ctx.arc(
        160,
        160,
        120,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "white";

    ctx.font = "30px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "🎡",
        160,
        170
    );

}
    document
    .getElementById("wheelModal")
    .classList
    .add("hidden");

}

function drawTest(){

    const canvas =
    document.getElementById("wheelCanvas");

    const ctx =
    canvas.getContext("2d");

    const cx = 160;
    const cy = 160;
    const r = 150;

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

        "#ff5252",
        "#ff9800",
        "#ffeb3b",
        "#4caf50",
        "#03a9f4",
        "#3f51b5",
        "#9c27b0",
        "#e91e63"

    ];

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for(let i=0;i<8;i++){

        const start =
        i * Math.PI/4;

        const end =
        start + Math.PI/4;

        ctx.beginPath();

        ctx.moveTo(
            cx,
            cy
        );

        ctx.arc(
            cx,
            cy,
            r,
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
            start + Math.PI/8
        );

        ctx.fillStyle =
        "#ffffff";

        ctx.font =
        "bold 20px Arial";

        ctx.textAlign =
        "center";

        ctx.fillText(

            prizes[i],

            105,

            8

        );

        ctx.restore();

    }

    // دائرة المنتصف

    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        42,
        0,
        Math.PI*2
    );

    ctx.fillStyle =
    "#222";

    ctx.fill();

    ctx.fillStyle =
    "#fff";

    ctx.font =
    "bold 18px Arial";

    ctx.textAlign =
    "center";

    ctx.fillText(
        "🎁",
        cx,
        cy-4
    );

    ctx.fillText(
        "لف",
        cx,
        cy+20
    );

}

    ctx.fillStyle = "red";

    ctx.beginPath();

    ctx.arc(
        160,
        160,
        120,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = "white";

    ctx.font = "30px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "🎡",
        160,
        170
    );

}
