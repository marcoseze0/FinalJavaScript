//Agregando Efectos Fade-Out-FadeIN y modificacion tamaño fuente
$("#titulo").fadeOut("slow", function () {
    $("#titulo").fadeIn(1000);
    $("#titulo").fadeOut(1000);
    $("#titulo").fadeIn(1000);
    $("#titulo").fadeOut(1000);
    $("#titulo").fadeIn(1000);
    $("#titulo").fadeOut(1000);
    $("#titulo").fadeIn(1000);
    $("#titulo").css("font-size", "50px");
})

//Modificando tamaño de fuente ingresos y egresos
$("#ingresos1").css("font-size", "20px")
$("#egresos1").css("font-size", "20px")

$("#ingresos1").animate({
        left: '100px',
        height: '40px',
        width: '40px'
    },
    "slow",
    function () {});
$("#egresos1").animate({
        left: '100px',
        height: '40px',
        width: '40px'
    },
    "slow",
    function () {
        console.log("final de animación");
    });


$("#lblIngresos").css("font-size", "50px")
    .slideUp(2000)
    .slideDown(2000);
$("#lblEgresos").css("font-size", "50px")
    .slideUp(2000)
    .slideDown(2000);

