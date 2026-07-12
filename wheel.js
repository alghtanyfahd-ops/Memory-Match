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

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

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
