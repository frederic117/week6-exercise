(function() {
    var burger = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".nav-menu");
    burger.addEventListener("click", function() {
        burger.classList.toggle("is-active");
        menu.classList.toggle("is-active");
    });
})();



//Count words in babble////

function countChar(val) {
    var len = val.value.length;
    if (len >= 201) {
        val.value = val.value.substring(0, 201);
    } else {
        $('#counter').text(200 - len);
        $('#counter2').text(200 - len);
    }
};