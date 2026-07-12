console.log("wheel.js loaded");


function openWheel(){

    document
    .getElementById("wheelModal")
    .classList
    .remove("hidden");

    drawTest();

}


function closeWheel(){

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


    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 150;


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
        "white";

        ctx.lineWidth = 3;

        ctx.stroke();


        // كتابة الجائزة

        ctx.save();


        ctx.translate(
            cx,
            cy
        );


        ctx.rotate(
            start + part / 2
        );


        ctx.fillStyle =
        "white";


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


    // الوسط

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
    "white";


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


}


    const ctx =
    canvas.getContext("2d");


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle = "red";


    ctx.beginPath();

    ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        120,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "white";

    ctx.font =
    "bold 30px Arial";

    ctx.textAlign =
    "center";


    ctx.fillText(
        "🎁",
        canvas.width / 2,
        canvas.height / 2
    );

}
function openWheel(){

    document
    .getElementById("wheelModal")
    .classList
    .remove("hidden");

    drawTest();

}


function closeWheel(){

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

}
console.log("آخر wheel.js تم تحميله");

window.openWheel = function(){

    alert("openWheel يعمل ✅");

};
