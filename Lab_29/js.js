$(document).ready(function () {
	
    let controller = new ScrollMagic.Controller();

    let first_scene = new ScrollMagic.Scene({
        triggerElement: ".project1"
    }).setClassToggle(".project1", "fade-in")
    .addTo(controler);

    let second_scene = new ScrollMagic.Scene({
        triggerElement: ".project2"
    }).setClassToggle(".project1", "fade-in")
    .addTo(controler);

    let third_scene = new ScrollMagic.Scene({
        triggerElement: ".project3"
    }).setClassToggle(".project1", "fade-in")
    .addTo(controler);


    let four_scene = new ScrollMagic.Scene({
        triggerElement: ".project4"
    }).setClassToggle(".project1", "fade-in")
    .addTo(controler);

})

    