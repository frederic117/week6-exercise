(function() {
    var burger = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();

function updateModal(index) {
    //$("#dynamiqueUserPic").html(timeline[index].)
    $("#dynamiqueUserNameBabble").html(timeline[index].user_name)
    $("#dynamiqueContent").html(timeline[index].babble)
    $("#dynamiqueTime").html(moments[index])
}









// modal BUTTON
$(".modal-button").click(function() {
    let current = $(this).attr("id")
    updateModal(current)
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
});

$(".modal-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
});

$(".modal-background").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
});