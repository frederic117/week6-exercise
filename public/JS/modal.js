function updateModal(index) {
  $("#dynamiqueUserNameBabble").html(timeline[index].user_name);
  $("#dynamiqueContent").html(timeline[index].babble);
  $("#dynamiqueTime").html(moments[index]);
  $("#dynamiqueUserPic").attr("src", timeline[index].user_id.picProfile);
  $("#parent-modal").val(timeline[index]._id);
}

// modal BUTTON
$(".modal-button").click(function() {
  let current = $(this).attr("id");
  updateModal(current);
  var target = $(this).data("target");
  $("html").addClass("is-clipped");
  $(target).addClass("is-active");
});

$(".modal-close").click(function() {
  $("html").removeClass("is-clipped");
  $(this)
    .parent()
    .removeClass("is-active");
});

$(".modal-background").click(function() {
  $("html").removeClass("is-clipped");
  $(this)
    .parent()
    .removeClass("is-active");
});
