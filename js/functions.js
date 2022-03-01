//ready
document.addEventListener("DOMContentLoaded", function(e) {

    //botão do menu
    document.querySelector(`#toggle-menu`).addEventListener("click", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        document.querySelector(`#sidenav`).classList.toggle("active");
        this.classList.toggle("active");
    })

});