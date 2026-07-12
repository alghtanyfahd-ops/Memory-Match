window.openWheel = function(){

    const modal =
    document.getElementById("wheelModal");


    if(!modal){

        alert("لم أجد wheelModal ❌");

        return;

    }


    modal.classList.remove("hidden");


    drawTest();

};
