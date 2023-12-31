/*CODIGO DE LAS FLORES */
function AnimacionMariposa(wrapper, vartimer) {
    var x = 0;
    var y = 0;
    var size = 0;
    var rotation = 0;
    var transitiontimer;
    var wingtimer;
    var nexttimer;

    function generateRandomNo(varmin, varmax) {
        return Math.floor((Math.random() * (varmax - varmin + 1)) + varmin);
    }

    function setButterflyProperties(wrapper) {
        nexttimer = generateRandomNo(1500, 3000);
        x += generateRandomNo(-80, 80);
        y += generateRandomNo(-80, 80);
        x = Math.max(20, Math.min(250, x));
        y = Math.max(20, Math.min(250, y));
        size += generateRandomNo(-10, 10);
        size = Math.max(10, Math.min(50, size));
        rotation += generateRandomNo(-10, 10);
        rotation = Math.max(-20, Math.min(20, rotation));
        transitiontimer = generateRandomNo(20, 50) / 10;

        wrapper.style.marginLeft = x + "px";
        wrapper.style.marginTop = y + "px";
        wrapper.style.width = size + "px";
        wrapper.style.height = size + "px";
        wrapper.style.transform = "rotate(" + rotation + "deg)";
        wrapper.style.webkitTransform = "rotate(" + rotation + "deg)";
        wrapper.style.transition = "all " + transitiontimer + "s";
        wrapper.style.webkitTransition = "all " + transitiontimer + "s";

        wingtimer = generateRandomNo(1, 5);
        var upperwings = wrapper.getElementsByClassName("upperwing");
        var lowerwings = wrapper.getElementsByClassName("lowerwing");

        for (var k = 0; k <= 1; k++) {
            upperwings[k].style.animationDuration = "0." + wingtimer + "s";
            upperwings[k].style.webkitAnimationDuration = "0." + wingtimer + "s";
            lowerwings[k].style.animationDuration = "0." + wingtimer + "s";
            lowerwings[k].style.webkitAnimationDuration = "0." + wingtimer + "s";
        }

        setTimeout(function () {
            setButterflyProperties(wrapper);
        }, nexttimer);
    }

    setButterflyProperties(wrapper);
}


window.onload = function () {
    var wrappers = document.querySelectorAll('.ContenedorMariposa #butterfly_wrapper');
    wrappers.forEach(function (wrapper) {
        AnimacionMariposa(wrapper, 1500); // Pass the wrapper and the initial timer as arguments
    });
};