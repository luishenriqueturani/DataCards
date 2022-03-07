//ready
document.addEventListener("DOMContentLoaded", function(e) {

    //botão do menu
    document.querySelector(`#toggle-menu`).addEventListener("click", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        document.querySelector(`#sidenav`).classList.toggle("active");
        this.classList.toggle("active");
        
        let overlay = document.querySelector(`#overlay`)

        overlay.classList.toggle("active");

    })

});

function fadeIn(el, time, display, opacity){
    let transition = time / 10;

    el.style.transition = `${transition}s ease-in-out ${transition}s`;

    el.style.display = display;

    el.style.opacity = opacity;

}

function fadeOut(el, time){
    let transition = time / 10;

    el.style.transition = `${transition}s ease-in-out ${transition}s`;
    
    el.style.opacity = 0;
    
    el.style.display = "none";

}