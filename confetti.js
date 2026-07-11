// ==========================
// Win Celebration 🎉
// ==========================

function celebrateWin(){

    const colors = [
        "🎉",
        "✨",
        "⭐",
        "🎊",
        "💎"
    ];

    for(let i = 0; i < 40; i++){

        const item =
        document.createElement("div");

        item.textContent =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];

        item.style.position = "fixed";
        item.style.left =
        Math.random() * 100 + "vw";

        item.style.top = "-20px";

        item.style.fontSize =
        (20 + Math.random()*30) + "px";

        item.style.zIndex = "9999";

        item.style.transition =
        "transform 2s, top 2s";

        document.body.appendChild(item);


        setTimeout(()=>{

            item.style.top =
            "100vh";

            item.style.transform =
            "rotate(720deg)";

        },50);


        setTimeout(()=>{

            item.remove();

        },2500);

    }

}

window.celebrateWin = celebrateWin;
