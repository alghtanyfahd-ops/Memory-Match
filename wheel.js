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


    if(!canvas){

        alert("لم يتم العثور على wheelCanvas");

        return;

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
